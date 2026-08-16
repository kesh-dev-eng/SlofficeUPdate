import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import SignupForm from './pages/SignupForm.jsx'
import SigninForm from './pages/SigninForm.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import WarrantyClaimPage from './pages/WarrantyClaimPage.jsx'
import RepairCenterPage from './pages/RepairCenterPage.jsx'
import DeliveryReturnsPage from './pages/DeliveryReturnsPage.jsx'
import TermsConditionsPage from './pages/TermsConditionsPage.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/warranty-claim', element: <WarrantyClaimPage /> },
  { path: '/repair-center', element: <RepairCenterPage /> },
  { path: '/delivery-returns', element: <DeliveryReturnsPage /> },
  { path: '/terms-conditions', element: <TermsConditionsPage /> },
  { path: '/signup', element: <SignupForm /> },
  { path: '/signin', element: <SigninForm /> },
]);