import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Explore the world of Mithu Ashwin Photography — wedding, portrait, and event photography from Coonoor, Nilgiris, Tamil Nadu.',
  openGraph: {
    title: 'Home | Stories by Mithu Ashwin',
    description: 'Explore the world of Mithu Ashwin Photography — wedding, portrait, and event photography from Coonoor, Nilgiris, Tamil Nadu.',
    url: 'https://storiesbymithuashwin.com/home',
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
