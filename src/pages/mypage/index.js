import classNames from 'classnames/bind';
import InfoCard from '../../components/InfoCard';
import styles from './index.module.scss';

export default function Mypage() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('area')}>
      <InfoCard backgroundColor="#446934" />
    </div>
  );
}
