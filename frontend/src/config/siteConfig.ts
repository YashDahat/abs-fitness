import type { SiteConfig } from '@/shell/types';

export const siteConfig: SiteConfig = {
  header: {
    brandName: "ABS FITNESS",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Classes", href: "/classes" },
      { label: "Membership", href: "/membership" },
      { label: "Trainers", href: "/trainers" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
    showAuth: true,
    showCart: false,
  },
  footer: {
    brandName: "ABS FITNESS",
    tagline: "Achieve your fitness goals with ABS FITNESS. State-of-the-art facilities, expert trainers, and a supportive community.",
    address: "123 Fitness Ave, Gym City, GC 12345",
    phone: "+91 98765 43210",
    email: "info@absfitness.com",
    openingHours: "Mon - Fri: 6:00 AM - 10:00 PM | Sat: 7:00 AM - 8:00 PM | Sun: 8:00 AM - 6:00 PM",
  },
};