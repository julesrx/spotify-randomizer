import { createBrowserRouter } from 'react-router-dom';

import { authLoader } from '~/auth';
import App from '~/App';
import Index from './routes/Index';

const router = createBrowserRouter(
  [
    {
      path: '/',
      loader: authLoader,
      element: <App />,
      children: [{ index: true, element: <Index /> }],
    },
  ],
  { basename: import.meta.env.PROD ? '/spotify-randomizer' : undefined }
);

export default router;
