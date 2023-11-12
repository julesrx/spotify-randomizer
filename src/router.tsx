import { createBrowserRouter } from 'react-router-dom';
import { callbackLoader, callbackUri } from './auth';
import Layout from './Layout';
import provider from './auth/provider';
import Queue from './routes/Queue';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      if (!provider.isAuthenticated) return null;

      try {
        await provider.load();
        return provider.profile;
      } catch {
        return null;
      }
    },
    element: <Layout />,
    children: [
      { index: true, element: <p>this is home</p> },
      { path: 'queue', element: <Queue /> }
    ]
  },
  { path: callbackUri, loader: callbackLoader, element: <></> }
]);

export default router;
