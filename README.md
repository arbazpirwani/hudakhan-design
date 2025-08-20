# Huda Khan Portfolio

A modern, TypeScript-first portfolio website built with Next.js 14, featuring clean architecture and fully dynamic content management.

## 🏗️ Architecture

This project follows Clean Architecture principles with clear separation of concerns:

```
src/
├── domain/          # Business logic and entities
│   ├── entities/    # Core business models
│   ├── repositories/# Repository interfaces
│   └── use-cases/   # Business use cases
├── data/            # Data layer
│   ├── content/     # JSON data sources
│   └── repositories/# Repository implementations
└── presentation/    # UI layer
    ├── components/  # React components (Atomic Design)
    │   ├── atoms/
    │   ├── molecules/
    │   └── organisms/
    ├── hooks/       # Custom React hooks
    ├── utils/       # Utility functions
    └── contexts/    # React contexts
```

## 🚀 Features

- **Clean Architecture**: Domain-driven design with clear separation between business logic and UI
- **100% Dynamic Content**: All content is managed through JSON files
- **TypeScript First**: Fully typed with strict TypeScript configuration
- **Atomic Design**: Component architecture following atomic design principles
- **Performance Optimized**: Static site generation with Next.js
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animation**: GSAP and Framer Motion for smooth animations

## 📦 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP, Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/huda-portfolio.git

# Navigate to project directory
cd huda-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📝 Content Management

All content is managed through JSON files in `src/data/content/`:

- `portfolio-config.json` - Personal information, navigation, services
- `projects.json` - Project portfolio data
- `site-content.json` - All page content and UI text

To update content, simply edit these JSON files. No code changes required!

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 🚢 Deployment

The project includes GitHub Actions workflows for automatic deployment.

## 📄 License

MIT License

## 👤 Author

**Huda Khan**
- Email: hudapervez@hotmail.com
- LinkedIn: [hudapervez](https://www.linkedin.com/in/hudapervez/)
- Behance: [hudapervez](https://www.behance.net/hudapervez)

Built with Claude Code
