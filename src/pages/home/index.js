import classNames from 'classnames/bind';
import styles from './index.module.scss';

export default function Home() {
  const cx = classNames.bind(styles);

  return (
    <>
      <h1 className={cx('testColor')}>Home Component</h1>
    </>
  );
}
