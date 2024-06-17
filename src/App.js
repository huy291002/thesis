import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jwt-decode';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './Provider/AuthProvider';

// routes

import AppRouter from './routes/AppRouter';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <AppRouter />
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
