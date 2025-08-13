# Angular Resume Builder

A modern, professional resume builder application built with Angular 18+ and Material Design. Create, edit, and export professional resumes with ease.

## Features

### ✨ Core Functionality
- **Real-time editing**: Changes reflect immediately in the preview
- **Multiple resume sections**: Personal info, work experience, education, skills, projects, certificates, and languages
- **Export formats**: PDF, DOCX, and plain text
- **Progressive Web App**: Works offline and can be installed on mobile devices
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile
- **Auto-save**: Automatically saves your work to prevent data loss

### 🎨 Modern UI/UX
- **Material Design**: Clean, professional interface using Angular Material
- **Multiple templates**: Choose from various professionally designed templates
- **Real-time preview**: See your resume as you build it
- **Intuitive navigation**: Easy-to-use sidebar with section completion tracking

### 🚀 Technical Features
- **Angular 18+**: Built with the latest Angular framework using standalone components
- **Signal-based state management**: Reactive data flow with Angular signals
- **TypeScript**: Full type safety and modern development experience
- **IndexedDB storage**: Local data persistence for offline usage
- **Service Worker**: Offline functionality and caching
- **Tree-shakable**: Optimized bundle size with lazy-loaded components

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 7+

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

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build:prod
```

The built application will be in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # TypeScript interfaces and types
│   │   └── services/         # Core application services
│   ├── features/
│   │   ├── editor/           # Resume section editor components
│   │   └── preview/          # Resume preview and templates
│   ├── shared/
│   │   └── components/       # Reusable UI components
│   └── app.component.*       # Root component
├── public/                   # Static assets and PWA files
└── styles.scss              # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run linter
- `npm run e2e` - Run end-to-end tests

## Data Models

The application uses comprehensive TypeScript interfaces for type safety:

- **PersonalInfo**: Contact information and professional summary
- **WorkExperience**: Employment history with descriptions and achievements
- **Education**: Academic background and qualifications
- **Skill**: Technical and soft skills with proficiency levels
- **Project**: Personal and professional projects
- **Certificate**: Professional certifications and credentials
- **Language**: Language proficiency information

## Services

### ResumeStateService
Signal-based state management for reactive data flow throughout the application.

### StorageService
IndexedDB operations using Dexie for local data persistence and offline functionality.

### ExportService
Resume export functionality supporting PDF, DOCX, and plain text formats.

### TemplateService
Management of resume templates and styling options.

### ATSOptimizerService
ATS (Applicant Tracking System) optimization suggestions and keyword analysis.

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with PWA support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Angular](https://angular.io/)
- UI components from [Angular Material](https://material.angular.io/)
- Icons from [Material Icons](https://fonts.google.com/icons)
- PDF generation with [pdfMake](http://pdfmake.org/)
- DOCX generation with [docx](https://github.com/dolanmiu/docx)
- Local storage with [Dexie](https://dexie.org/)

---

**Made with ❤️ by the Angular Resume Builder team**