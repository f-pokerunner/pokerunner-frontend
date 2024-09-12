import classNames from 'classnames/bind';
import styles from './index.module.scss';

export default function Popup({
  message = '경험치가 상승했습니다!',
  onClose = () => {},
  onContentClick = () => {},
}) {
  const cx = classNames.bind(styles);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const messageList = Array.isArray(message) ? message : [message];

  return (
    <>
      <div className={cx('overlay')} onClick={handleOverlayClick} />
      <div className={cx('popupWrapper')}>
        <div className={cx('popup')}>
          <h2>
            {messageList.map((item) => {
              return (
                <div
                  className={cx('content')}
                  onClick={() => onContentClick(item)}
                >
                  {item}
                </div>
              );
            })}
          </h2>
        </div>
        <button onClick={onClose}>확인</button>
      </div>
    </>
  );
}
