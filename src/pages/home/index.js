import classNames from 'classnames/bind';

import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx('homeContainer')}>
      {/* 상단 안내 문구 */}
      <div className={cx('noticeBoxWrapper')}>
        <div className={cx('noticeBox')}>예시문구 입니다.</div>
        <div className={cx('noticeBox')}>예시문구 입니다.</div>
      </div>

      {/* 말풍선 */}
      <div className={cx('speechBubbleWrapper')}>
        <div className={cx('speechBubble')}>말풍선 테스트 입니다</div>
      </div>

      {/* 포켓몬 */}
      <div className={cx('pokemonGifWrapper')}>
        <img className={cx('pokemonGif')} src={pokemon1} alt="포켓몬" />
      </div>
    </div>
  );
}
