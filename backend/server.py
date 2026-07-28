from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
LEAD_NOTIFICATION_EMAIL = os.environ.get('LEAD_NOTIFICATION_EMAIL', 'discoverdazeholidays@gmail.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------------- Models ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    guests: Optional[str] = None
    travel_date: Optional[str] = None
    travel_month: Optional[str] = None
    package: Optional[str] = None
    message: Optional[str] = None


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    email: Optional[str] = None
    guests: Optional[str] = None
    travel_date: Optional[str] = None
    travel_month: Optional[str] = None
    package: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------------- Email helper ----------------
def _build_lead_email_html(lead: Lead, when_str: str) -> str:
    def row(label, value):
        value = value or "—"
        return f"""
        <tr>
          <td style="padding:12px 20px;border-bottom:1px solid #eee;color:#0A192F;font-weight:600;width:190px;font-size:14px;">{label}</td>
          <td style="padding:12px 20px;border-bottom:1px solid #eee;color:#1A1A1A;font-size:14px;">{value}</td>
        </tr>"""

    return f"""
    <div style="background:#f4f4f5;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr>
          <td style="background:#0A192F;padding:28px 24px;">
            <div style="color:#D4AF37;font-size:13px;letter-spacing:3px;text-transform:uppercase;">Discover Daze Holidays</div>
            <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:6px;">New Lead — Kashmir Super Deluxe</div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 4px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              {row("Name", lead.full_name)}
              {row("Phone", lead.phone)}
              {row("Email", lead.email)}
              {row("Travel Date", lead.travel_date or lead.travel_month)}
              {row("Number of Travellers", lead.guests)}
              {row("Selected Package", lead.package)}
              {row("Message", lead.message)}
              {row("Date &amp; Time", when_str)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;background:#faf8f2;border-top:1px solid #eee;">
            <a href="https://wa.me/91{lead.phone.lstrip('+').replace(' ', '')}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;font-size:14px;">Reply on WhatsApp</a>
            <span style="color:#6b7280;font-size:12px;margin-left:14px;">Follow up quickly for the best conversion.</span>
          </td>
        </tr>
      </table>
    </div>
    """


async def send_lead_notification(lead: Lead):
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not set; skipping email notification")
        return
    when_str = lead.created_at.astimezone(timezone.utc).strftime("%d %b %Y, %I:%M %p UTC")
    params = {
        "from": f"Discover Daze Leads <{SENDER_EMAIL}>",
        "to": [LEAD_NOTIFICATION_EMAIL],
        "subject": "New Lead – Discover Daze Holidays",
        "html": _build_lead_email_html(lead, when_str),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Lead notification email sent: {result}")
    except Exception as e:
        logger.error(f"Failed to send lead notification email: {e}")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    if not input.full_name.strip() or not input.phone.strip():
        raise HTTPException(status_code=400, detail="Name and phone are required")
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    # Fire-and-forget email so the response stays fast
    asyncio.create_task(send_lead_notification(lead))
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for l in leads:
        if isinstance(l.get('created_at'), str):
            l['created_at'] = datetime.fromisoformat(l['created_at'])
    return leads


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
