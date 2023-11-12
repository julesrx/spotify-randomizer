import { createBrowserRouter } from 'react-router-dom';
import { callbackLoader, callbackUri } from './auth';
import Layout from './Layout';
import provider from './auth/provider';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const profile = provider.profile;

      // TODO: load and return profile
      return { profile };
    },
    element: <Layout />,
    children: [{}]
  },
  { path: callbackUri, loader: callbackLoader, element: <></> }
]);

export default router;
