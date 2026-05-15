import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import LandingPage from '../pages/landing/LandingPage';
import HistoryPage from '../pages/history/HistoryPage';
import WizardPage from '../pages/wizard/WizardPage.jsx';
import MistDetailPage from '../pages/mist/MistDetailPage.jsx';
import ProfilePage from '../pages/profile/ProfilePage.jsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Лендінг — головна сторінка */}
        <Route path="/" element={<LandingPage />} />

        {/* Публічні маршрути */}
        <Route path="/login" element={<LoginPage />} />

        {/* Захищені маршрути */}
        <Route
          path="/dashboard"
          element={
              <DashboardPage />           
          }
        />
        <Route
  path="/history"
  element={
    <HistoryPage />
  }
        />
        <Route
  path="/wizard"
  element={
    <WizardPage />
  }
        />
        <Route
  path="/mist/:id"
  element={
    <MistDetailPage />
  }
        />
        <Route path="/profile"
          element={
            <ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;