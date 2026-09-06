import httpx
from datetime import datetime, timedelta
import random
from app.config import settings
from app.models.schemas import WeatherData, ForecastPoint
from app.data.indian_cities import INDIAN_CITIES
import math

class WeatherService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=10.0)

    async def get_current_weather(self, lat: float, lon: float) -> WeatherData:
        """Fetch current weather from Open-Meteo with fallback to demo data"""
        try:
            url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,direct_radiation"
            response = await self.client.get(url)
            
            if response.status_code == 200:
                data = response.json()
                current = data.get('current', {})
                return WeatherData(
                    temp=current.get('temperature_2m', 35.0),
                    humidity=current.get('relative_humidity_2m', 45.0),
                    wind_speed=current.get('wind_speed_10m', 10.0),
                    solar_radiation=current.get('direct_radiation', 600.0),
                    pressure=current.get('surface_pressure', 1010.0),
                    description="Clear" if current.get('cloud_cover', 0) < 30 else "Cloudy",
                    timestamp=datetime.now()
                )
        except Exception as e:
            print(f"Weather API failed: {e}. Using demo data.")
            
        return self._get_demo_weather(lat, lon)

    def _get_demo_weather(self, lat: float, lon: float) -> WeatherData:
        # Find nearest city
        nearest = min(INDIAN_CITIES, key=lambda c: math.hypot(c['lat'] - lat, c['lon'] - lon))
        
        return WeatherData(
            temp=nearest['normal_max_temp'] + random.uniform(-2, 2),
            humidity=nearest['typical_summer_rh'] + random.uniform(-5, 5),
            wind_speed=random.uniform(5, 15),
            solar_radiation=random.uniform(500, 800),
            pressure=1005.0,
            description="Sunny",
            timestamp=datetime.now()
        )

    async def get_forecast(self, lat: float, lon: float, hours: int = 72) -> list[ForecastPoint]:
        points = []
        base = self._get_demo_weather(lat, lon)
        
        for i in range(hours):
            t = datetime.now() + timedelta(hours=i)
            # Simple diurnal cycle
            hour_factor = math.sin(math.pi * (t.hour - 6) / 12) if 6 <= t.hour <= 18 else -0.5
            temp = base.temp + hour_factor * 5 + random.uniform(-1, 1)
            solar = max(0, 800 * hour_factor)
            
            points.append(ForecastPoint(
                time=t,
                temp=temp,
                humidity=max(20, base.humidity - hour_factor * 15),
                wind=base.wind_speed,
                solar=solar,
                htss_score=0.0, # Will be filled by other service
                risk_level="Unknown"
            ))
        return points

weather_service = WeatherService()
