import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Book your wedding, portrait, or event photography session with Mithu Ashwin. Based in Coonoor, Nilgiris — available across Tamil Nadu and beyond.',
  openGraph: {
    title: 'Book a Session | Stories by Mithu Ashwin',
    description: 'Book your wedding, portrait, or event photography session with Mithu Ashwin. Based in Coonoor, Nilgiris — available across Tamil Nadu and beyond.',
    url: 'https://storiesbymithuashwin.com/book-us',
  },
};

export default function BookUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
