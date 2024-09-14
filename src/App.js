import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { getUserID } from './api/service';

function App() {
  const navigate = useNavigate();
  const userId = getUserID();

  useEffect(() => {
    if (userId) {
      navigate('/home', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [userId]);

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Outlet />
    </Suspense>
  );
}

export default App;
