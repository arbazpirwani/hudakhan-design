# Dynamic Configuration Guide

This portfolio is now **100% configurable** through JSON files. No code changes needed to update content, styling, or behavior!

## 📁 Configuration Files

### 1. **Theme Configuration** (`src/data/content/theme-config.json`)
Controls all visual styling including colors, typography, spacing, and animations.

```json
{
  "themes": {
    "light": { "colors": {...}, "gradients": {...} },
    "dark": { "colors": {...}, "gradients": {...} }
  },
  "typography": { "fontFamilies": {...}, "fontSizes": {...} },
  "spacing": { "containerMaxWidth": "1200px", ... },
  "animations": { "durations": {...}, "easing": {...} }
}
```

**What you can change:**
- ✅ Light/Dark theme colors
- ✅ Font families and sizes
- ✅ Gradients and shadows
- ✅ Animation timings
- ✅ Container widths and spacing
- ✅ Border radius values

### 2. **UI Strings** (`src/data/content/ui-strings.json`)
All text content throughout the website.

```json
{
  "navigation": { "home": "Home", "about": "About", ... },
  "buttons": { "viewProject": "View Project", ... },
  "forms": { "labels": {...}, "placeholders": {...} },
  "sections": { "hero": {...}, "about": {...} }
}
```

**What you can change:**
- ✅ Navigation labels
- ✅ Button text
- ✅ Form labels and placeholders
- ✅ Section titles and descriptions
- ✅ Error messages
- ✅ Meta descriptions

### 3. **Assets Configuration** (`src/data/content/assets-config.json`)
Manages all images, documents, and external resources.

```json
{
  "images": {
    "profile": { "main": "/huda-khan-profile.jpg", ... },
    "logo": { "main": "/logo.svg", ... }
  },
  "documents": { "resume": { "path": "/resume/...", ... } },
  "external": { "fonts": [...], "analytics": {...} }
}
```

**What you can change:**
- ✅ Profile images and logos
- ✅ Document paths (resume, portfolio)
- ✅ Google Fonts URLs
- ✅ Analytics tracking codes
- ✅ Image optimization settings

### 4. **Site Content** (`src/data/content/site-content.json`)
Page-specific content and copy.

```json
{
  "homepage": {
    "services": { "title": "What I Do Best", ... },
    "portfolio": { "title": "Featured Projects", ... }
  },
  "about": { "bio": [...], "stats": {...} }
}
```

### 5. **Portfolio Config** (`src/data/content/portfolio-config.json`)
Personal information, services, and navigation.

### 6. **Projects Data** (`src/data/content/projects.json`)
Complete project portfolio with details, images, and metadata.

## 🎨 How to Customize

### Change Colors
Edit `theme-config.json`:
```json
{
  "themes": {
    "dark": {
      "colors": {
        "accent": "#YOUR_COLOR",
        "background": "#YOUR_BG_COLOR"
      }
    }
  }
}
```

### Add New Font
1. Add Google Font URL to `assets-config.json`:
```json
{
  "external": {
    "fonts": {
      "google": ["https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap"]
    }
  }
}
```

2. Update font family in `theme-config.json`:
```json
{
  "typography": {
    "fontFamilies": {
      "display": "\"YourFont\", sans-serif"
    }
  }
}
```

### Change Text Content
Edit any string in `ui-strings.json`:
```json
{
  "buttons": {
    "viewProject": "See Project Details"
  }
}
```

### Update Images
1. Add your image to `/public/` folder
2. Update path in `assets-config.json`:
```json
{
  "images": {
    "profile": {
      "main": "/your-new-image.jpg"
    }
  }
}
```

## 🛠️ Using in Components

### Access Theme Data
```tsx
import { useTheme } from '@/presentation/hooks/useTheme';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div style={{ color: theme.colors.accent }}>
      <button onClick={toggleTheme}>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}
```

### Access UI Strings
```tsx
import { useStrings } from '@/presentation/hooks/useStrings';

function MyComponent() {
  const { t } = useStrings();
  
  return (
    <button>{t('buttons.viewProject')}</button>
  );
}
```

### Access Assets
```tsx
import { useAssets } from '@/presentation/hooks/useAssets';

function MyComponent() {
  const { getImagePath, getDocumentPath } = useAssets();
  
  return (
    <img src={getImagePath('profile', 'main')} alt="Profile" />
  );
}
```

## 🚀 Advanced Features

### Multi-language Support
Add new language by duplicating `ui-strings.json`:
- `ui-strings-en.json` (English)
- `ui-strings-es.json` (Spanish)

### Custom Theme Variants
Add new themes to `theme-config.json`:
```json
{
  "themes": {
    "dark": {...},
    "light": {...},
    "blue": { "colors": {...} },
    "purple": { "colors": {...} }
  }
}
```

### Dynamic Animation Controls
Modify animation speeds globally:
```json
{
  "animations": {
    "durations": {
      "fast": 100,
      "normal": 200,
      "slow": 800
    }
  }
}
```

## 📝 Tips for Non-Developers

1. **Always backup** your JSON files before making changes
2. **Validate JSON** using online tools to avoid syntax errors
3. **Use consistent naming** for images and assets
4. **Test changes** locally before deploying
5. **Keep image sizes optimized** for web performance

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check configuration
npx tsc --noEmit

# Lint configuration files
npm run lint
```

## 📦 File Structure

```
src/data/content/
├── theme-config.json      # Visual styling
├── ui-strings.json        # All text content
├── assets-config.json     # Images & documents
├── site-content.json      # Page content
├── portfolio-config.json  # Personal info
└── projects.json          # Portfolio data

src/presentation/hooks/
├── useTheme.ts           # Theme management
├── useStrings.ts         # Text localization
└── useAssets.ts          # Asset management
```

Now your portfolio is **completely dynamic** and can be updated by anyone through simple JSON file edits!