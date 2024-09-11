import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
import Nav from '../../components/nav';

const cx = classNames.bind(styles);

export default function Default() {
  return (
    <div className={cx('commonLayoutWrapper')}>
      <main className={cx('mainWrapper')}>
        <Outlet />
      </main>
      <div className={cx('navWrapper')}>
        <Nav />
      </div>
    </div>
  );
}
