# iham_baobab_web - E-commerce Platform

This project has been **migrated from Create React App to Next.js** to improve performance, SEO, and development experience.

## 🚀 Next.js Migration

This application is now powered by [Next.js](https://nextjs.org/), providing:

- **Server-Side Rendering (SSR)** for better SEO and performance
- **Static Site Generation (SSG)** for faster page loads
- **Automatic code splitting** and optimizations
- **Built-in API routes** for backend functionality
- **Enhanced image optimization**
- **Improved development experience**

## 📁 Project Structure

```
├── pages/                 # Next.js pages (file-based routing)
│   ├── _app.js            # App wrapper with Redux Provider
│   ├── _document.js       # HTML document structure
│   ├── index.js           # Home page (/)
│   ├── connexion.js       # Login page (/connexion)
│   ├── inscription.js     # Registration page (/inscription)
│   ├── compte.js          # Account page (/compte)
│   ├── panier.js          # Cart page (/panier)
│   ├── produit/[id].js    # Product detail page (/produit/[id])
│   ├── categorie/[...params].js # Category pages
│   └── api/               # API routes
├── src/                   # Legacy React components (being migrated)
│   ├── components/        # Reusable components
│   ├── pages/             # Original React pages
│   ├── redux/             # Redux store and actions
│   └── Images/            # Static images
├── public/                # Static assets
├── styles/                # Global styles
└── middleware.js          # Next.js middleware for authentication
```

## 🛠 Available Scripts

### Development
```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Legacy (React) Scripts
```bash
npm run legacy-start # Start legacy React development server
npm run legacy-build # Build legacy React app
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with:
```env
REACT_APP_Backend_Url=your_backend_url
```

### Next.js Configuration
The project is configured in `next.config.js` with:
- Automatic redirects from old React Router paths
- Environment variable mapping
- Image optimization settings

## 📄 Key Pages

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Home page | SSR, SEO optimized |
| `/produit/[id]` | Product details | SSR with dynamic meta tags |
| `/connexion` | User login | Client-side authentication |
| `/inscription` | User registration | Form validation |
| `/compte` | User account | Protected route |
| `/panier` | Shopping cart | Real-time updates |
| `/categorie/[...params]` | Category pages | Dynamic routing |

## 🔐 Authentication

The application includes:
- **Middleware-based route protection**
- **JWT token verification**
- **Automatic redirects for unauthorized access**
- **Session management with localStorage**

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Bootstrap** for component styling
- **Custom CSS** for specific components
- **Responsive design** for mobile and desktop

## 📱 Features

- **E-commerce functionality** (products, cart, orders)
- **User authentication** and account management
- **Real-time messaging** with Socket.io
- **Product search** and filtering
- **Category browsing**
- **Mobile-responsive design**
- **SEO optimization**

## 🚀 Deployment

The application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting platform**

Build command: `npm run build`
Start command: `npm start`

## 🔄 Migration Status

✅ **Completed**
- Next.js setup and configuration
- Core page migrations
- SSR implementation
- Authentication flow
- Dynamic routing
- Build optimization

🔄 **In Progress**
- Complete component migration
- Image optimization with Next.js Image
- API route implementation
- Performance optimizations

## 🧪 Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iham_baobab_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.
