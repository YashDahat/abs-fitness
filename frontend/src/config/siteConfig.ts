import { SiteConfig, NavLink, SocialLink } from '@/shell/types';
import { ROUTES } from '@/routes';

export const siteConfig: SiteConfig = {
  header: {
    brandName: 'ABS FITNESS',
    navLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Classes', href: ROUTES.CLASSES },
      { label: 'Trainers', href: ROUTES.TRAINERS },
      { label: 'Membership', href: ROUTES.MEMBERSHIP },
      { label: 'Gallery', href: ROUTES.GALLERY },
      { label: 'Virtual Tour', href: ROUTES.VIRTUAL_TOUR },
      { label: 'Contact', href: ROUTES.CONTACT },
    ] as NavLink[],
    ctaButton: {
      label: 'Start Your Free Trial',
      href: ROUTES.MEMBERSHIP,
    },
    bgClass: 'bg-[#1A1A1A]',
    textClass: 'text-[#FFFFFF]',
    hoverClass: 'hover:text-[#FF5722]',
    ctaClass: 'bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
  },
  footer: {
    brandName: 'ABS FITNESS',
    tagline: 'Unleash Your Potential. Transform Your Body. Elevate Your Life.',
    address: '123 Fitness Ave, Gym City, GC 12345',
    phone: '+91 98765 43210',
    email: 'info@absfitness.com',
    openingHours: 'Mon-Fri: 6 AM - 10 PM, Sat-Sun: 8 AM - 8 PM',
    quickLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'FAQs', href: '#' },
    ] as NavLink[],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/absfitness' },
      { platform: 'instagram', url: 'https://instagram.com/absfitness' },
      { platform: 'twitter', url: 'https://twitter.com/absfitness' },
      { platform: 'youtube', url: 'https://youtube.com/absfitness' },
      { platform: 'whatsapp', url: 'https://wa.me/919876543210' },
    ] as SocialLink[],
    bgClass: 'bg-[#1A1A1A]',
    textClass: 'text-[#FFFFFF]',
    accentClass: 'text-[#FF5722]',
  },
};