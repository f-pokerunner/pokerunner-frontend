import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import Nav from '../../components/nav';

export default function Default() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.mainWrapper}>
        <Outlet />
      </main>
      <Nav />
    </div>
  );
}
