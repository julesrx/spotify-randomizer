import { createBrowserRouter } from 'react-router-dom';

import { authLoader, callbackRoute } from '~/auth';
import App from '~/App';
import Index from './routes/Index';
import Queue from 'routes/Queue';
import Albums from 'routes/Albums';
import Tops from 'routes/Tops';

const router = createBrowserRouter([
  callbackRoute,
  {
    path: '/',
    loader: authLoader,
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: 'queue', element: <Queue /> },
      { path: 'albums', element: <Albums /> },
      { path: 'tops', element: <Tops /> },
    ],
  },
]);

export default router;
