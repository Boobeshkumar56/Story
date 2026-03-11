import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
  description: 'Browse the full photography library of Mithu Ashwin — a timeless collection of weddings, portraits, and precious moments.',
  openGraph: {
    title: 'Library | Stories by Mithu Ashwin',
    description: 'Browse the full photography library of Mithu Ashwin — a timeless collection of weddings, portraits, and precious moments.',
    url: 'https://storiesbymithuashwin.com/library',
  },
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
