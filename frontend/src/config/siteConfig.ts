import { SiteConfig } from '@/shell/types';
import { ROUTES } from '@/routes';

export const siteConfig: SiteConfig = {
  header: {
    brandName: 'ABS FITNESS',
    navLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Classes', href: ROUTES.CLASSES },
      { label: 'Membership', href: ROUTES.MEMBERSHIP },
      { label: 'Trainers', href: ROUTES.TRAINERS },
      { label: 'Gallery', href: ROUTES.GALLERY },
      { label: 'Contact', href: ROUTES.CONTACT },
    ],
    ctaButton: {
      label: 'Join Now',
      href: ROUTES.MEMBERSHIP,
    },
    bgClass: 'bg-[#1A1A1A]',
    textClass: 'text-[#FFFFFF]',
    hoverClass: 'hover:text-[#FF5722]',
    ctaClass: 'bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
  },
  footer: {
    brandName: 'ABS FITNESS',
    tagline: 'Your Journey to a Stronger You Starts Here.',
    address: '123 Fitness Ave, Gym City, GC 12345',
    phone: '+91 98765 43210',
    email: 'info@absfitness.com',
    openingHours: 'Mon-Fri: 6 AM - 10 PM, Sat-Sun: 8 AM - 8 PM',
    quickLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'About Us', href: ROUTES.ABOUT },
      { label: 'Classes', href: ROUTES.CLASSES },
      { label: 'Membership', href: ROUTES.MEMBERSHIP },
      { label: 'Trainers', href: ROUTES.TRAINERS },
      { label: 'Contact Us', href: ROUTES.CONTACT },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/absfitness' },
      { platform: 'instagram', url: 'https://instagram.com/absfitness' },
      { platform: 'twitter', url: 'https://twitter.com/absfitness' },
      { platform: 'youtube', url: 'https://youtube.com/absfitness' },
      { platform: 'whatsapp', url: 'https://wa.me/919876543210' },
    ],
    bgClass: 'bg-[#1A1A1A]',
    textClass: 'text-[#FFFFFF]',
    accentClass: 'text-[#FF5722]',
  },
};