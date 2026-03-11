import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recent Works',
  description: 'A curated look at recent photography projects by Mithu Ashwin — weddings, portraits, and events captured with emotion and artistry.',
  openGraph: {
    title: 'Recent Works | Stories by Mithu Ashwin',
    description: 'A curated look at recent photography projects by Mithu Ashwin — weddings, portraits, and events captured with emotion and artistry.',
    url: 'https://storiesbymithuashwin.com/recent-works',
  },
};

export default function RecentWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
