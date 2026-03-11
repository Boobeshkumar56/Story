import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories behind the shots — explore wedding recaps, portrait sessions, and photography insights from Mithu Ashwin.',
  openGraph: {
    title: 'Blog | Stories by Mithu Ashwin',
    description: 'Stories behind the shots — explore wedding recaps, portrait sessions, and photography insights from Mithu Ashwin.',
    url: 'https://storiesbymithuashwin.com/blogs',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
