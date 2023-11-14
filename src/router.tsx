import { createBrowserRouter } from "react-router-dom";

import { callbackLoader, callbackUri } from "~/auth";
import provider from "~/auth/provider";
import Queue from "routes/Queue";
import Albums from "routes/Albums";
import App from "~/App";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      if (!provider.isAuthenticated) return null;

      try {
        await provider.load();
        return provider.profile;
      } catch {
        return null;
      }
    },
    element: <App />,
    children: [
      { index: true, element: <p>this is home</p> },
      { path: "queue", element: <Queue /> },
      { path: "albums", element: <Albums /> },
    ],
  },
  { path: callbackUri, loader: callbackLoader, element: <></> },
]);

export default router;
