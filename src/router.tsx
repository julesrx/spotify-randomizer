import { createBrowserRouter } from "react-router-dom";

import { authLoader, callbackRoute } from "~/auth";
import Queue from "routes/Queue";
import Albums from "routes/Albums";
import App from "~/App";

const router = createBrowserRouter([
  {
    path: "/",
    loader: authLoader,
    element: <App />,
    children: [
      { index: true, element: <p>this is home</p> },
      { path: "queue", element: <Queue /> },
      { path: "albums", element: <Albums /> },
    ],
  },
  callbackRoute,
]);

export default router;
