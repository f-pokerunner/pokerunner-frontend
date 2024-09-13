// routes.js or Routes.jsx

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.js';
import Default from './layouts/default';
import NonAuth from './layouts/non-auth';
import Home from './pages/home';
import RankingMap from './pages/ranking-map';
import Login from './pages/login';
import Mypage from './pages/mypage';
import Intro from './pages/intro/index.js';
import NotFound from './pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root component
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        element: <Default />, // Layout with Header and Footer
        children: [
          { path: 'home', element: <Home /> },
          { path: 'ranking-map', element: <RankingMap /> },
          { path: 'mypage', element: <Mypage /> },
        ],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
