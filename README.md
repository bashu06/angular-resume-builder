# Angular Resume Builder

A complete, production-ready Angular Resume Builder application built with Angular 18+ and Material Design. Create professional resumes with real-time preview, multiple sections, and export capabilities.

![Resume Builder Screenshot](docs/resume-builder-main-view.png)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Editing** - Live preview updates as you type
- **Professional Templates** - Clean, modern resume layouts
- **Multiple Sections** - Personal info, experience, education, skills, projects
- **Material Design** - Beautiful, responsive UI components
- **PWA Ready** - Progressive Web App with offline capabilities

### 📝 Resume Sections
- **Personal Information** - Contact details, summary, job title
- **Work Experience** - Job history with achievements and technologies
- **Education** - Academic background with honors and coursework
- **Skills** - Categorized technical and soft skills with proficiency levels
- **Projects** - Portfolio items with descriptions and tech stacks

### 🛠 Technical Features
- **Angular Signals** - Modern reactive state management
- **Standalone Components** - Latest Angular 18+ architecture
- **IndexedDB Storage** - Local data persistence with Dexie.js
- **Export Ready** - PDF/DOCX export capabilities (libraries included)
- **TypeScript** - Full type safety and IntelliSense
- **Responsive Design** - Mobile-first, works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bashu06/angular-resume-builder.git
   cd angular-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
# Build production version
npm run build

# Build PWA with service worker
npm run build:prod
```

## 📖 Usage Guide

### Getting Started
1. **Load Sample Data** - Click "Sample Data" to see a complete resume example
2. **Edit Sections** - Use the sidebar to navigate between resume sections
3. **Real-time Preview** - See changes instantly in the live preview
4. **Export** - Generate PDF or DOCX files (implementation ready)

### Navigation
- **Edit Mode** - Split-screen editor with section navigation
- **Preview Mode** - Full-page resume preview for final review
- **Sample Data** - Quick way to populate with professional example

### Editing Sections

#### Personal Information
- Basic contact details (name, email, phone, address)
- Professional summary and job title
- Social links (website, LinkedIn, GitHub)

#### Work Experience
- Add multiple positions with company details
- List key achievements and responsibilities
- Specify technologies used
- Mark current positions

#### Education
- Academic degrees and institutions
- GPA and honors recognition
- Relevant coursework

#### Skills
- Categorized by type (Technical, Framework, Tool, Language, Soft)
- Proficiency levels (Beginner, Intermediate, Advanced, Expert)
- Easy add/remove functionality

#### Projects
- Project portfolio with descriptions
- Technology stacks used
- Live demo and GitHub links
- Key achievements and metrics

## 🏗 Architecture

### Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # State management & storage
│   ├── features/
│   │   ├── builder/         # Main editing interface
│   │   ├── editor/          # Section-specific editors
│   │   └── preview/         # Resume preview components
│   └── shared/
│       └── components/      # Reusable UI components
├── assets/                  # Static assets and icons
└── environments/           # Environment configurations
```

### Key Services
- **ResumeStateService** - Signal-based state management
- **StorageService** - IndexedDB operations with Dexie
- **ExportService** - PDF/DOCX generation (ready for implementation)

### State Management
Built with Angular Signals for reactive updates:
- Computed properties for derived state
- Auto-save functionality
- Real-time preview synchronization

## 🎨 Customization

### Adding New Templates
1. Create new template component in `features/preview/`
2. Add template selection logic to `TemplateService`
3. Update template picker UI

### Extending Resume Sections
1. Add new interface to `core/models/`
2. Update `Resume` interface
3. Create editor component
4. Add to builder navigation

### Styling
- Global styles in `src/styles.scss`
- Component-specific styles use Angular's scoped CSS
- Material theme customization available

## 📦 Dependencies

### Core Dependencies
- **Angular 18.2** - Modern web framework
- **Angular Material** - UI component library
- **RxJS** - Reactive programming
- **Dexie** - IndexedDB wrapper
- **PDFMake** - PDF generation
- **DOCX** - Word document generation

### Development Tools
- **TypeScript** - Type-safe development
- **Angular CLI** - Build toolchain
- **Karma/Jasmine** - Testing framework

## 🚢 Deployment

### GitHub Pages
```bash
npm run build:prod
# Deploy dist/ folder to GitHub Pages
```

### Docker
```dockerfile
FROM nginx:alpine
COPY dist/angular-resume-builder /usr/share/nginx/html
```

### Other Platforms
- **Netlify** - Drag and drop `dist/` folder
- **Vercel** - Connect GitHub repository
- **Firebase Hosting** - Use Angular deployment schematic

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Material Design team for beautiful components
- Open source community for excellent libraries

## 📞 Support

- **Issues** - GitHub Issues tab
- **Discussions** - GitHub Discussions
- **Documentation** - Check this README and code comments

---

**Happy Resume Building!** 🎉

Create beautiful, professional resumes with ease using this modern Angular application.