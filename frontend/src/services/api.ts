import axios from 'axios';
import * as demoData from '../data/demoData';
import { WeatherData, ThermalStressData, RiskAssessment, ForecastData, VulnerabilityData, Alert, DemoScenario, GovernmentDashboard, HistoricalData, MLPrediction } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const api = axios.create({ baseURL: API_URL });

const withDemoFallback = async <T>(apiCall: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    const res = await apiCall();
    return res;
  } catch (err) {
    console.warn('API call failed, using demo data', err);
    return fallback;
  }
};

export const apiService = {
  getWeather: (lat: number, lon: number) => withDemoFallback(() => api.get<WeatherData>('/weather', { params: { lat, lon } }).then(r => r.data), demoData.demoWeather),
  getThermalStress: (lat: number, lon: number) => withDemoFallback(() => api.get<ThermalStressData>('/thermal-stress', { params: { lat, lon } }).then(r => r.data), demoData.demoThermal),
  getRisk: (lat: number, lon: number) => withDemoFallback(() => api.get<RiskAssessment>('/risk', { params: { lat, lon } }).then(r => r.data), demoData.demoRisk),
  getForecast: (lat: number, lon: number, hours: number = 24) => withDemoFallback(() => api.get<ForecastData>('/forecast', { params: { lat, lon, hours } }).then(r => r.data), demoData.demoForecast),
  getVulnerability: (state: string) => withDemoFallback(() => api.get<VulnerabilityData>('/vulnerability', { params: { state } }).then(r => r.data), demoData.demoVulnerability),
  getAlerts: (lat: number, lon: number) => withDemoFallback(() => api.get<Alert[]>('/alerts', { params: { lat, lon } }).then(r => r.data), demoData.demoAlerts),
  getDemoScenarios: () => withDemoFallback(() => api.get<DemoScenario[]>('/demo/scenarios').then(r => r.data), demoData.demoScenarios),
  activateScenario: (id: string) => api.post(`/demo/activate/${id}`).then(r => r.data),
  getGovernmentDashboard: () => withDemoFallback(() => api.get<GovernmentDashboard>('/government/dashboard').then(r => r.data), demoData.demoGovernmentDashboard),
  getHistorical: (location: string) => withDemoFallback(() => api.get<HistoricalData>('/historical', { params: { location } }).then(r => r.data), demoData.demoHistorical),
  getMLPrediction: (lat: number, lon: number) => withDemoFallback(() => api.get<MLPrediction>('/ml/predict', { params: { lat, lon } }).then(r => r.data), demoData.demoMLPrediction),
};
