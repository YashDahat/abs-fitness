// GENERATED from the architecture plan — do not edit by hand.
// The complete route table, derived from the plan. Rendered by the App.tsx shell
// inside the provider tree. Re-derived every attempt — never edit by hand.

import { Routes, Route, Outlet } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { SiteLayout } from '@/shell'
import siteConfig from '@/config/siteConfig'

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import ClassesPage from './pages/ClassesPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import MyBookingsPage from './pages/MyBookingsPage';
import MySubscriptionPage from './pages/MySubscriptionPage';
import SignupPage from './pages/SignupPage';
import TrainerDetailPage from './pages/TrainerDetailPage';
import TrainersPage from './pages/TrainersPage';
import VirtualTourPage from './pages/VirtualTourPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminClassesPage from './pages/AdminClassesPage';
import AdminContentPage from './pages/AdminContentPage';
import AdminMembershipsPage from './pages/AdminMembershipsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookingsPage /></ProtectedRoute>} />
      <Route path="/admin/classes" element={<ProtectedRoute><AdminClassesPage /></ProtectedRoute>} />
      <Route path="/admin/content" element={<ProtectedRoute><AdminContentPage /></ProtectedRoute>} />
      <Route path="/admin/memberships" element={<ProtectedRoute><AdminMembershipsPage /></ProtectedRoute>} />
      <Route element={<SiteLayout config={siteConfig}><Outlet /></SiteLayout>}>
        {/* Outlet receives the matched child route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/my-subscription" element={<MySubscriptionPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/trainer/:id" element={<TrainerDetailPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/virtual-tour" element={<VirtualTourPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
