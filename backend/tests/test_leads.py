import os
import time
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://kashmir-luxury-tour.preview.emergentagent.com"

# Unique marker so we can identify and clean up leads we created
UNIQUE_PHONE = f"+9199BACKEND{int(time.time())}"

created_ids = []


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    yield s
    # Teardown: delete only leads we created (via Mongo directly since no DELETE endpoint exists)
    if created_ids:
        try:
            from pymongo import MongoClient
            mc = MongoClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
            mc[os.environ.get("DB_NAME", "test_database")].leads.delete_many({"id": {"$in": created_ids}})
            mc.close()
        except Exception as e:
            print(f"Cleanup warning: {e}")


# ---------- Health ----------
class TestHealth:
    def test_root_api(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# ---------- POST /api/leads success + persistence ----------
class TestLeadsCreate:
    def test_create_lead_success_returns_200(self, api_client):
        payload = {
            "full_name": "TEST_John Doe",
            "phone": UNIQUE_PHONE,
            "email": "test_john@example.com",
            "guests": "3-5",
            "travel_date": "2026-05-15",
            "travel_month": "June",
            "package": "Kashmir Super Deluxe",
            "message": "Please share more details"
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        print(f"\nPOST /api/leads status={r.status_code}\nbody={r.text}")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert data["full_name"] == payload["full_name"]
        assert data["phone"] == payload["phone"]
        assert data["email"] == "test_john@example.com"
        assert data["travel_date"] == "2026-05-15"
        assert data["guests"] == "3-5"
        assert data["package"] == "Kashmir Super Deluxe"
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "_id" not in data
        created_ids.append(data["id"])

    def test_persistence_via_get(self, api_client):
        assert created_ids, "prior create test must have run"
        g = api_client.get(f"{BASE_URL}/api/leads")
        assert g.status_code == 200
        leads = g.json()
        assert isinstance(leads, list)
        assert any(l["id"] == created_ids[0] for l in leads), "Newly created lead not found in GET /api/leads"


# ---------- Method handling ----------
class TestLeadsMethodHandling:
    def test_get_leads_200(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_put_leads_405(self, api_client):
        r = api_client.put(f"{BASE_URL}/api/leads", json={})
        print(f"PUT /api/leads -> {r.status_code}")
        assert r.status_code == 405

    def test_delete_leads_405(self, api_client):
        r = api_client.delete(f"{BASE_URL}/api/leads")
        print(f"DELETE /api/leads -> {r.status_code}")
        assert r.status_code == 405


# ---------- Validation ----------
class TestLeadsValidation:
    def test_missing_full_name_400(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/leads", json={"full_name": "", "phone": "+919999999999"})
        assert r.status_code == 400
        assert "detail" in r.json()

    def test_missing_phone_400(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/leads", json={"full_name": "TEST_NoPhone", "phone": ""})
        assert r.status_code == 400
        assert "detail" in r.json()


# ---------- CORS ----------
class TestCORS:
    @pytest.mark.parametrize("origin", [
        "https://offers.discoverdazeholidays.com",
        "https://discoverdazeholidays.com",
    ])
    def test_options_preflight(self, api_client, origin):
        r = requests.options(
            f"{BASE_URL}/api/leads",
            headers={
                "Origin": origin,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
        )
        print(f"OPTIONS from {origin} -> {r.status_code} headers={dict(r.headers)}")
        assert r.status_code in (200, 204), f"Preflight failed: {r.status_code} {r.text}"
        acao = r.headers.get("access-control-allow-origin")
        assert acao is not None, "Missing access-control-allow-origin header"
        assert acao == origin or acao == "*", f"ACAO={acao} does not permit {origin}"
        allow_methods = r.headers.get("access-control-allow-methods", "")
        assert "POST" in allow_methods.upper() or allow_methods == "*"

    @pytest.mark.parametrize("origin", [
        "https://offers.discoverdazeholidays.com",
        "https://discoverdazeholidays.com",
    ])
    def test_post_with_origin_returns_cors_header(self, api_client, origin):
        payload = {
            "full_name": "TEST_CORS User",
            "phone": UNIQUE_PHONE + "C",
            "email": "cors@example.com",
            "package": "Kashmir Super Deluxe",
        }
        r = requests.post(
            f"{BASE_URL}/api/leads",
            json=payload,
            headers={"Content-Type": "application/json", "Origin": origin},
        )
        print(f"POST from {origin} -> {r.status_code} ACAO={r.headers.get('access-control-allow-origin')}")
        assert r.status_code == 200, r.text
        acao = r.headers.get("access-control-allow-origin")
        assert acao is not None
        assert acao == origin or acao == "*"
        try:
            created_ids.append(r.json()["id"])
        except Exception:
            pass
