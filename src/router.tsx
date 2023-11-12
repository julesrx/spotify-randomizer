import { createBrowserRouter } from 'react-router-dom';
import { callbackLoader, callbackUri } from './auth';
import Layout from './Layout';
import provider from './auth/provider';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      try {
        await provider.load();

        console.log('layout loader');

        return provider.profile;
      } catch {
        return null;
      }
    },
    element: <Layout />,
    children: [
      { index: true, element: <p>this is home</p> },
      { path: 'about', element: <p>this is about</p> }
    ]
  },
  { path: callbackUri, loader: callbackLoader, element: <></> }
]);

export default router;
