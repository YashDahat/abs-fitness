// GENERATED from the architecture plan — do not edit by hand.
// The complete route table, derived from the plan. Rendered by the App.tsx shell
// inside the provider tree. Re-derived every attempt — never edit by hand.

import { Routes, Route, Outlet } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { SiteLayout } from '@/shell'
import { siteConfig } from '@/config/siteConfig'

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';
import ClassesPage from './pages/ClassesPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import MyBookingsPage from './pages/account/MyBookingsPage';
import MyMembershipPage from './pages/account/MyMembershipPage';
import ProfilePage from './pages/account/ProfilePage';
import SignupPage from './pages/SignupPage';
import TrainersPage from './pages/TrainersPage';
import TrainersDetailPage from './pages/TrainersDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminClassesPage from './pages/AdminClassesPage';
import AdminEnquiriesPage from './pages/AdminEnquiriesPage';
import AdminMembershipPlansPage from './pages/AdminMembershipPlansPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import AdminTrainersPage from './pages/AdminTrainersPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import AdminMediaPage from './pages/admin/AdminMediaPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookingsPage /></ProtectedRoute>} />
      <Route path="/admin/classes" element={<ProtectedRoute><AdminClassesPage /></ProtectedRoute>} />
      <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiriesPage /></ProtectedRoute>} />
      <Route path="/admin/membership-plans" element={<ProtectedRoute><AdminMembershipPlansPage /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviewsPage /></ProtectedRoute>} />
      <Route path="/admin/trainers" element={<ProtectedRoute><AdminTrainersPage /></ProtectedRoute>} />
      <Route path="/admin/media" element={<ProtectedRoute><AdminMediaPage /></ProtectedRoute>} />
      <Route element={<SiteLayout config={siteConfig}><Outlet /></SiteLayout>}>
        {/* Outlet receives the matched child route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/my-membership" element={<MyMembershipPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/trainers/:id" element={<TrainersDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  )
}
