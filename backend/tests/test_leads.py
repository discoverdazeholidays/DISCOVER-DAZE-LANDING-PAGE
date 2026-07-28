import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://kashmir-luxury-tour.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestHealth:
    def test_root_api(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


class TestLeads:
    def test_create_lead_success(self, api_client):
        payload = {
            "full_name": "TEST_John Doe",
            "phone": "+919999999999",
            "guests": "3-5",
            "travel_month": "June",
            "package": "Kashmir Super Deluxe",
            "message": "Please share more details"
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["full_name"] == payload["full_name"]
        assert data["phone"] == payload["phone"]
        assert data["guests"] == "3-5"
        assert data["travel_month"] == "June"
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0

        # GET verification
        g = api_client.get(f"{BASE_URL}/api/leads")
        assert g.status_code == 200
        leads = g.json()
        assert isinstance(leads, list)
        assert any(l["id"] == data["id"] for l in leads)

    def test_create_lead_missing_name(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/leads", json={"full_name": "", "phone": "+919999999999"})
        assert r.status_code == 400

    def test_create_lead_missing_phone(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/leads", json={"full_name": "TEST_NoPhone", "phone": ""})
        assert r.status_code == 400

    def test_get_leads_no_mongo_id(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        for l in r.json():
            assert "_id" not in l
