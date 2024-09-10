import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
import Nav from '../../components/nav';

const cx = classNames.bind(styles);

export default function Default() {
  const location = useLocation();

  const isIntroPage = location.pathname === '/intro';

  return (
    <div className={cx('commonLayout')}>
      <main>
        <Outlet />
      </main>
      {!isIntroPage && <Nav />}
    </div>
  );
}
