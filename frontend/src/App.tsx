import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { GovernmentDashboard } from './pages/GovernmentDashboard';
import { MapPage } from './pages/MapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-200">
      <Header />
      <Navbar />
      <main className="pt-2">{children}</main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <CitizenDashboard />
              </AppLayout>
            }
          />
          <Route
            path="/government"
            element={
              <AppLayout>
                <GovernmentDashboard />
              </AppLayout>
            }
          />
          <Route
            path="/map"
            element={
              <AppLayout>
                <MapPage />
              </AppLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <AppLayout>
                <AnalyticsPage />
              </AppLayout>
            }
          />
          <Route
            path="/about"
            element={
              <AppLayout>
                <AboutPage />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
