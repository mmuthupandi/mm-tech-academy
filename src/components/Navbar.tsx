import CardNav from './CardNav';
import logo from '../assets/logo only.png';

const items = [
  {
    label: 'About',
    bgColor: '#1B1722',
    textColor: '#fff',
    links: [
      { label: 'Our Story', href: '#about', ariaLabel: 'About Our Story' },
      { label: 'Global Reach', href: '#about', ariaLabel: 'About Global Reach' },
    ],
  },
  {
    label: 'Programs',
    bgColor: '#2F293A',
    textColor: '#fff',
    links: [
      { label: 'All Courses', href: '#programs', ariaLabel: 'All Programs' },
      { label: 'Case Studies', href: '#programs', ariaLabel: 'Program Case Studies' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#2F293A',
    textColor: '#fff',
    links: [
      { label: 'Email', href: '#contact', ariaLabel: 'Email us' },
      { label: 'Partners', href: '#partners', ariaLabel: 'Our Partners' },
      { label: 'LinkedIn', href: '#contact', ariaLabel: 'LinkedIn' },
    ],
  },
];

export const Navbar = () => (
  <CardNav
    logo={logo}
    logoAlt="MM Tech Academy"
    items={items}
    baseColor="#fff"
    menuColor="#000"
    buttonBgColor="#6A63B7"
    buttonTextColor="#fff"
    ease="power3.out"
  />
);
