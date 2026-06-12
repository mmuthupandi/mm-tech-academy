import CardNav from './CardNav';


const items = [
  {
    label: 'About',
    bgColor: '#1B1722',
    textColor: '#fff',
    links: [
      { label: 'Our Story',    href: '/#about',    ariaLabel: 'About Our Story' },
      { label: 'Global Reach', href: '/#about',    ariaLabel: 'About Global Reach' },
    ],
  },
  {
    label: 'Programs',
    bgColor: '#2F293A',
    textColor: '#fff',
    links: [
      { label: 'All Courses',  href: '/courses',   ariaLabel: 'All Courses' },
      { label: 'Services',     href: '/#services', ariaLabel: 'Our Services' },
    ],
  },
  {
    label: 'Connect',
    bgColor: '#2F293A',
    textColor: '#fff',
    links: [
      { label: 'Partner With Us', href: '/partner',  ariaLabel: 'Partner With Us' },
      { label: 'Contact',         href: '/#contact',  ariaLabel: 'Contact Us' },
    ],
  },
];

export const Navbar = () => (
  <CardNav
    brandName={null}
    items={items}
    baseColor="#fff"
    menuColor="#000"
    buttonBgColor="#FF6B00"
    buttonTextColor="#fff"
    ease="power3.out"
  />
);
