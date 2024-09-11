import classNames from 'classnames/bind';
import styles from './index.module.scss';

export default function Popup({
  message = '경험치가 상승했습니다!',
  onClose = () => {},
}) {
  const cx = classNames.bind(styles);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={cx('overlay')} onClick={handleOverlayClick} />
      <div className={cx('popup')}>
        <h2>{message}</h2>
        <button onClick={onClose}>확인</button>
      </div>
    </>
  );
}
