import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import { postRunningStart, postRunningEnd } from '../../api/service.js';

import { ReactComponent as PokeBall } from '../../assets/icons/PokeBall.svg';
import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import map from '../../assets/icons/icon_map.png';
import speechBalloon from '../../assets/icons/icon_speech_balloon.png';
import InfoCard from '../../components/InfoCard/index.jsx';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [userInfo, setUserInfo] = useState({
    level: 1,
    exp: 289,
    notRunTime: 358,
    nickName: 'heesu',
    pokemonName: '꼬부기',
    imageUrl: pokemon1,
  });
  const userId = 123123;

  const setCurrentPosition = async (position) => {
    const {
      coords: { latitude, longitude },
    } = position;

    postRunningStart(userId, latitude, longitude);
  };

  const handleButtonClick = async () => {
    setIsRunning(!isRunning);

    if (isRunning) {
      /**
       * hsPyo 여기하고있었음
       */
      const resonse = await postRunningEnd(userId);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentPosition, null, {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 0,
        });
      }
    }
  };

  useEffect(() => {
    if (window.pokeRunnerInavi) {
      // var map = new window.pokeRunnerInavi.maps.Map({
      //   center: [127.110749, 37.402158],
      //   container: 'div_map',
      //   zoom: 13,
      // });
    }
  }, []);

  return (
    <div className={cx('homeContainer')}>
      {/* 상단 안내 문구 */}
      <div className={cx('iconWrapper')}>
        <div className={cx('icon')}>
          <img src={map} alt="지도아이콘" />
        </div>
        <div className={cx('icon')}>
          <img src={speechBalloon} alt="말풍선아이콘" />
        </div>
      </div>

      <div className={cx('main')}>
        {/* 말풍선 */}
        <div className={cx('speechBubbleWrapper')}>
          <div className={cx('speechBubble')}>
            {isRunning ? '달리는중...' : '예시문구 입니다.'}
          </div>
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
