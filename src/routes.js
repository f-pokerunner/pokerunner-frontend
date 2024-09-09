// routes.js or Routes.jsx

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.js';
import Default from './layouts/default';
import NonAuth from './layouts/non-auth';
import Home from './pages/home';
import RankingMap from './pages/ranking-map';
import Login from './pages/login';
import Mypage from './pages/mypage';
import NotFound from './pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root component
    errorElement: <NotFound />,
    children: [
      {
        element: <Default />, // Layout with Header and Footer
        children: [
          { index: true, element: <Home /> },
          { path: 'ranking-map', element: <RankingMap /> },
          { path: 'mypage', element: <Mypage /> },
        ],
      },
      {
        element: <NonAuth />,
        children: [{ path: 'login', element: <Login /> }],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
