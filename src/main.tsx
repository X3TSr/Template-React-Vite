import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { Router } from './router/router'

// Import Components
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const root = document.getElementById('root');

createRoot(root!).render(
  <BrowserRouter>
    <Header />
    <Router />
    <Footer />
  </BrowserRouter>,
)
