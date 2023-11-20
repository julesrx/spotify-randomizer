import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '~/main.css';
import router from '~/router';
import Loading from './components/Loading';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading fullHeight>Loading...</Loading>} />
  </StrictMode>
);
