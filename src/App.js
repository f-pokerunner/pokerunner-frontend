import { Suspense } from 'react';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={styles.renderTest}>
      <Suspense fallback={<div>Loading..</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
