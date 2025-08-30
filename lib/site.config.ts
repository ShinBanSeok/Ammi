export const SITE_INFO = {
  companyName: '(주)암미',
  ceo: 'J. Doe',
  address: 'Seoul, Republic of Korea, 12-34, Sample-ro',
  phone: '02-1234-5678',
  bizRegNo: '215-81-36619',
  copyright: `Copyright © (주)암미. ALL RIGHTS RESERVED.`,
  logoAlt: 'AMMI Logo',
};

export const NAV = {
  company: {
    label: 'COMPANY',
    children: [
      { label: 'OVERVIEW', href: '/company/overview' },
      { label: 'HISTORY', href: '/company/history' },
      { label: 'ORGANIZATIONAL', href: '/company/organizational' },
      { label: 'CULTURE', href: '/company/culture' },
    ],
  },
  quality: {
    label: 'QUALITY',
    children: [
      { label: 'BEMBERG', href: '/quality/bemberg' },
      { label: 'POLYESTER', href: '/quality/polyester' },
      { label: 'CUPRO', href: '/quality/cupro' },
    ],
  },
  location: {
    label: 'LOCATION',
    children: [{ label: 'LOCATION', href: '/location' }],
  },
  contact: {
    label: 'CONTACT',
    children: [
      { label: 'Q&A', href: '/contact/qna' },
      { label: 'METHOD', href: '/contact/method' },
    ],
  },
};

export const HERO_SLIDES = [
  {
    src: '/images/slide-3.jpg',
    alt: 'Hero slide 1',
  },
  {
    src: '/images/slide-1.jpg',
    alt: 'Hero slide 2',
  },
  {
    src: '/images/slide-2.jpg',
    alt: 'Hero slide 3',
  },
];
