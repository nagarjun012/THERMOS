from fastapi import APIRouter
from app.models.schemas import GovernmentDashboard, HistoricalData
from app.api.gis import get_cities
from app.api.alerts import get_all_alerts

router = APIRouter()

@router.get("/government", response_model=GovernmentDashboard)
async def get_gov_dashboard():
    cities = await get_cities()
    alerts = await get_all_alerts()
    
    high_risk_cities = sum(1 for c in cities if c.risk_level in ["High", "Extreme"])
    
    return GovernmentDashboard(
        total_states_affected=5,
        high_risk_locations=high_risk_cities,
        active_alerts=len(alerts),
        affected_population=15000000,
        states=[],
        cities=cities,
        alerts=alerts
    )

@router.get("/overview")
async def get_overview():
    return {"status": "operational", "active_incidents": 2}

@router.get("/historical", response_model=list[HistoricalData])
async def get_historical(location: str = "Delhi", years: int = 5):
    return [HistoricalData(
        location=location,
        years=[
            {"year": 2024, "avg_temp": 42.1, "heatwave_days": 12},
            {"year": 2023, "avg_temp": 41.5, "heatwave_days": 9}
        ]
    )]
