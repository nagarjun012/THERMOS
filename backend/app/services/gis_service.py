from app.data.indian_cities import INDIAN_CITIES
from app.models.schemas import CityData
import random

class GISService:
    def get_cities_data(self) -> list[CityData]:
        # Return mock active data for cities based on base values
        cities = []
        for c in INDIAN_CITIES:
            # Add some variability
            temp = c["normal_max_temp"] + random.uniform(-2, 4)
            rh = c["typical_summer_rh"] + random.uniform(-10, 10)
            
            cities.append(CityData(
                name=c["name"],
                state=c["state"],
                lat=c["lat"],
                lon=c["lon"],
                temperature=round(temp, 1),
                humidity=round(rh, 1),
                wind_speed=round(random.uniform(5, 15), 1),
                solar_radiation=round(random.uniform(600, 900), 1),
                heat_index=round(temp + random.uniform(2, 5), 1),
                wbgt=round(temp - random.uniform(2, 6), 1),
                utci=round(temp + random.uniform(3, 7), 1),
                htss_score=round(random.uniform(30, 90), 1),
                risk_level=random.choice(["Low", "Moderate", "High", "Extreme"]),
                heatwave_probability=round(random.uniform(0, 100), 1)
            ))
        return cities

    def get_india_states_geojson(self):
        # A simple geojson placeholder that frontend can use
        return {
            "type": "FeatureCollection",
            "features": []
        }

gis_service = GISService()
