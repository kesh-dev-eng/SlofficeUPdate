import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import SignupForm from './pages/SignupForm.jsx'
import SigninForm from './pages/SigninForm.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import WarrantyClaimPage from './pages/WarrantyClaimPage.jsx'
import RepairCenterPage from './pages/RepairCenterPage.jsx'
import InstallationServicePage from './pages/InstallationServicePage.jsx'
import DeliveryReturnsPage from './pages/DeliveryReturnsPage.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/warranty-claim', element: <WarrantyClaimPage /> },
  { path: '/repair-center', element: <RepairCenterPage /> },
  { path: '/installation-service', element: <InstallationServicePage /> },
  { path: '/delivery-returns', element: <DeliveryReturnsPage /> },
  { path: '/signup', element: <SignupForm /> },
  { path: '/signin', element: <SigninForm /> },
]);