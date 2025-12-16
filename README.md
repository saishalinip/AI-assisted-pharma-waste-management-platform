# Pharma Waste Management

A comprehensive platform for managing pharmaceutical waste recycling and disposal processes. This application connects pharmaceutical manufacturers with certified recyclers to ensure proper waste management and environmental compliance.

## Features

- Manufacturer dashboard for waste upload and tracking
- Recycler management and comparison
- Request processing and approval workflow
- Recycling records and documentation
- User management for manufacturers
- Responsive design with modern UI

## Technologies Used

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pharma-waste-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── shared/         # Shared components
│   └── layout/         # Layout components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── manufacturer/   # Manufacturer-specific pages
│   └── recycler/       # Recycler-specific pages
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utilities and mock data
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
