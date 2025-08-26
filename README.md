# Stories - Photography Portfolio

A modern, animated photography portfolio website built with Next.js, TypeScript, and Framer Motion.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Built with Next.js 15 for optimal performance
- **Animations**: Beautiful animations powered by Framer Motion
- **TypeScript**: Type-safe development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## Pages

1. **Home**: Hero section with portfolio preview and call-to-action
2. **Blogs**: Photography insights and tips with engaging content
3. **Book Us**: Booking form with package selection and testimonials

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Turbopack (for development)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── blogs/          # Blog listing page
│   ├── book-us/        # Booking page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout with navigation
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   └── Navbar.tsx      # Navigation component
public/                 # Static assets
```

## Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and themes
- Update `src/app/globals.css` for global styles

### Content
- Update package information in `src/app/book-us/page.tsx`
- Modify blog posts in `src/app/blogs/page.tsx`
- Change hero content in `src/app/page.tsx`

### Animations
- Customize Framer Motion animations in each component
- Adjust animation timing and easing functions

## Deployment

The project is ready for deployment on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

For Vercel deployment:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. Please replace with your actual license.

## Contact

For questions or support, please contact:
- Email: hello@stories.com
- Phone: (555) 123-4567

---

Built with ❤️ using Next.js and modern web technologies.
