import classNames from 'classnames/bind';

import { ReactComponent as PokeBall } from '../../assets/icons/PokeBall.svg';
import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import styles from './index.module.scss';
import InfoCard from '../../components/InfoCard/index.jsx';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);

  const handleButtonClick = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className={cx('homeContainer')}>
      {/* 상단 안내 문구 */}
      <div className={cx('noticeBoxWrapper')}>
        <div className={cx('noticeBox')}>예시문구 입니다.</div>
        <div className={cx('noticeBox')}>예시문구 입니다.</div>
      </div>

      <div className={cx('main')}>
        {/* 말풍선 */}
        <div className={cx('speechBubbleWrapper')}>
          <div className={cx('speechBubble')}>말풍선 테스트 입니다</div>
        </div>

        {/* 포켓몬 */}
        <div className={cx('pokemonGifWrapper')}>
          <img className={cx('pokemonGif')} src={pokemon1} alt="포켓몬" />
        </div>
      </div>

      <InfoCard
        backgroundColor="#446934"
        title={'상태'}
        style={{ fontSize: '1rem' }}
      >
        <div className={cx('infoWrapper')}>
          <div className={cx('infoBox')}>
            <div className={cx('info')}>
              <span>이상해씨</span>
              <span>Lv. 34</span>
            </div>
            <div className={cx('progressWrapper')}>
              <span>exp</span>
              <ProgressBar currentExp={250} maxExp={300} />
            </div>
            <span className={cx('currentExp')}>270/300</span>
          </div>
          <div className={cx('statusWrapper')}>
            <button
              className={cx('statusBox', { running: !isRunning })}
              onClick={handleButtonClick}
            >
              <PokeBall style={{ zIndex: '2' }} />
              <span className={cx('statusText')}>
                {isRunning ? '러닝 종료' : '러닝 시작'}
              </span>
            </button>
            <div className={cx('run')}>
              <span>7.5Km/h</span>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}

function ProgressBar({ currentExp, maxExp }) {
  const cx = classNames.bind(styles);
  const percentage = (currentExp / maxExp) * 100;

  return (
    <div className={cx('progressBar')}>
      <div className={cx('fill')} style={{ width: `${percentage}%` }} />
    </div>
  );
}
