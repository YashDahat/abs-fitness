// GENERATED from the architecture plan — do not edit by hand.
// The complete navigation contract: every page, its route, and its nav
// metadata. Link via ROUTES.*, render nav from routeTable — never hardcode
// a path string. This file imports NOTHING by design (cycle-safe).

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  ACCOUNT: '/account',
  CHECKOUT: '/checkout',
  CLASSES: '/classes',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  LOGIN: '/login',
  MEMBERSHIP: '/membership',
  SIGNUP: '/signup',
  TRAINER_DETAIL: '/trainer/:id',
  TRAINERS: '/trainers',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_CLASSES: '/admin/classes',
  ADMIN_INQUIRIES: '/admin/inquiries',
  ADMIN_MEMBERSHIP_PLANS: '/admin/membership-plans',
  ADMIN_TRAINERS: '/admin/trainers',
  NOT_FOUND: '*',
  CART: '/cart',
  ADMIN_MEDIA: '/admin/media',
} as const;

export interface RouteEntry {
  key: keyof typeof ROUTES;
  path: string;
  page: string;        // component name, e.g. 'AdminOrdersPage'
  importPath: string;  // string metadata only — App.tsx does the importing
  label: string;
  admin: boolean;
  nav: boolean;
}

export const routeTable: RouteEntry[] = [
  { key: 'HOME', path: ROUTES.HOME, page: 'HomePage', importPath: './pages/HomePage', label: 'Home', admin: false, nav: true },
  { key: 'ABOUT', path: ROUTES.ABOUT, page: 'AboutPage', importPath: './pages/AboutPage', label: 'About', admin: false, nav: true },
  { key: 'ACCOUNT', path: ROUTES.ACCOUNT, page: 'AccountPage', importPath: './pages/AccountPage', label: 'Account', admin: false, nav: true },
  { key: 'CHECKOUT', path: ROUTES.CHECKOUT, page: 'CheckoutPage', importPath: './pages/CheckoutPage', label: 'Checkout', admin: false, nav: true },
  { key: 'CLASSES', path: ROUTES.CLASSES, page: 'ClassesPage', importPath: './pages/ClassesPage', label: 'Classes', admin: false, nav: true },
  { key: 'CONTACT', path: ROUTES.CONTACT, page: 'ContactPage', importPath: './pages/ContactPage', label: 'Contact', admin: false, nav: true },
  { key: 'GALLERY', path: ROUTES.GALLERY, page: 'GalleryPage', importPath: './pages/GalleryPage', label: 'Gallery', admin: false, nav: true },
  { key: 'LOGIN', path: ROUTES.LOGIN, page: 'LoginPage', importPath: './pages/LoginPage', label: 'Login', admin: false, nav: false },
  { key: 'MEMBERSHIP', path: ROUTES.MEMBERSHIP, page: 'MembershipPage', importPath: './pages/MembershipPage', label: 'Membership', admin: false, nav: true },
  { key: 'SIGNUP', path: ROUTES.SIGNUP, page: 'SignupPage', importPath: './pages/SignupPage', label: 'Signup', admin: false, nav: false },
  { key: 'TRAINER_DETAIL', path: ROUTES.TRAINER_DETAIL, page: 'TrainerDetailPage', importPath: './pages/TrainerDetailPage', label: 'Trainer', admin: false, nav: false },
  { key: 'TRAINERS', path: ROUTES.TRAINERS, page: 'TrainersPage', importPath: './pages/TrainersPage', label: 'Trainers', admin: false, nav: true },
  { key: 'ADMIN_DASHBOARD', path: ROUTES.ADMIN_DASHBOARD, page: 'AdminDashboardPage', importPath: './pages/AdminDashboardPage', label: 'Dashboard', admin: true, nav: true },
  { key: 'ADMIN_BOOKINGS', path: ROUTES.ADMIN_BOOKINGS, page: 'AdminBookingsPage', importPath: './pages/AdminBookingsPage', label: 'Bookings', admin: true, nav: true },
  { key: 'ADMIN_CLASSES', path: ROUTES.ADMIN_CLASSES, page: 'AdminClassesPage', importPath: './pages/AdminClassesPage', label: 'Classes', admin: true, nav: true },
  { key: 'ADMIN_INQUIRIES', path: ROUTES.ADMIN_INQUIRIES, page: 'AdminInquiriesPage', importPath: './pages/AdminInquiriesPage', label: 'Inquiries', admin: true, nav: true },
  { key: 'ADMIN_MEMBERSHIP_PLANS', path: ROUTES.ADMIN_MEMBERSHIP_PLANS, page: 'AdminMembershipPlansPage', importPath: './pages/AdminMembershipPlansPage', label: 'Membership Plans', admin: true, nav: true },
  { key: 'ADMIN_TRAINERS', path: ROUTES.ADMIN_TRAINERS, page: 'AdminTrainersPage', importPath: './pages/AdminTrainersPage', label: 'Trainers', admin: true, nav: true },
  { key: 'NOT_FOUND', path: ROUTES.NOT_FOUND, page: 'NotFoundPage', importPath: './pages/NotFoundPage', label: 'Not Found', admin: false, nav: false },
  { key: 'CART', path: ROUTES.CART, page: 'CartPage', importPath: './pages/CartPage', label: 'Cart', admin: false, nav: true },
  { key: 'ADMIN_MEDIA', path: ROUTES.ADMIN_MEDIA, page: 'AdminMediaPage', importPath: './pages/admin/AdminMediaPage', label: 'Media', admin: true, nav: true },
];
