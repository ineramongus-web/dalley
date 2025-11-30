
import { Feature, ShowcaseItem, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' }, // Added
  { label: 'SPR Motion', href: '#code-export' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Roadmap', href: '#process' },
];

export const TEMPLATE_CATEGORIES = [
  "All",
  "HUD",
  "Inventory",
  "Shop",
  "Menu",
  "Notification",
  "Admin Panel"
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Cloud Studio',
    description: 'Design directly in your browser. No downloads required, works on any device.',
    icon: 'Cloud',
  },
  {
    id: '2',
    title: 'Lua Export',
    description: 'One-click export to optimized, clean Lua code ready for Roblox Studio.',
    icon: 'Code2',
  },
  {
    id: '3',
    title: 'Multi-Platform',
    description: 'Responsive constraints automatically calculated for Mobile, Tablet, and PC.',
    icon: 'Smartphone',
  },
  {
    id: '4',
    title: 'SPR Motion',
    description: 'Built-in Spring Physics support for buttery smooth UI interactions.',
    icon: 'Zap',
  },
];

export const SHOWCASE: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Glassmorphism HUD',
    category: 'Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    stats: '60fps'
  },
  {
    id: '2',
    title: 'Sci-Fi Inventory',
    category: 'Complex Grid',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    stats: 'Responsive'
  },
  {
    id: '3',
    title: 'Modern Shop',
    category: 'E-Commerce',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    stats: 'Springs'
  },
  {
    id: '4',
    title: 'Settings Panel',
    category: 'Utility',
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1887&auto=format&fit=crop',
    stats: 'Clean'
  },
];

export const PROJECTS: ShowcaseItem[] = [
  ...SHOWCASE
];
