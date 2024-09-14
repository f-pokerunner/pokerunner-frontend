import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { ReactComponent as PokeBall } from '../../assets/icons/PokeBall.svg';
import { ReactComponent as Badge } from '../../assets/icons/Badge.svg';
import { ReactComponent as My } from '../../assets/icons/My.svg';
import classNames from 'classnames/bind';

export default function Nav() {
  const cx = classNames.bind(styles);

  return (
    <div className={styles.wrapper}>
      <NavLink
        to="/"
        className={({ isActive }) => cx('item', { selected: isActive })}
      >
        <PokeBall />
        <ShadowEffect />
      </NavLink>
      <NavLink
        to="/ranking-map"
        className={({ isActive }) => cx('item', { selected: isActive })}
      >
        <Badge />
        <ShadowEffect />
      </NavLink>
      <NavLink
        to="/mypage"
        className={({ isActive }) => cx('item', { selected: isActive })}
      >
        <My />
        <ShadowEffect />
      </NavLink>
    </div>
  );
}

function ShadowEffect() {
  return <div className={styles.shadow} />;
}
