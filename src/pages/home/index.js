import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import {
  postRunningStart,
  postRunningEnd,
  getCommentAPI,
  saveCommentAPI,
  getUserID,
} from '../../api/service.js';

import { ReactComponent as PokeBall } from '../../assets/icons/PokeBall.svg';
import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import map from '../../assets/icons/icon_map.png';
import speechBalloon from '../../assets/icons/icon_speech_balloon.png';
import revolution from '../../assets/icons/revolution.gif';
import InfoCard from '../../components/InfoCard/index.jsx';
import styles from './index.module.scss';
import { useExperience } from '../../context/ExperienceContext.js';
import { getUserHomeData } from '../../api/apiClient.js';

const cx = classNames.bind(styles);

export default function Home() {
  const homeEl = useRef();
  const commentEl = useRef();
  const [isRunning, setIsRunning] = useState(false);
  const [userInfo, setUserInfo] = useState({
    level: 1,
    experience: 0,
    userNickname: '',
    pokemonName: '',
    imageUrl: '',
  });
  const userId = getUserID();
  const [comment, setComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [animationOn, setAnimationOn] = useState(false);

  const setCurrentPosition = async (position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    console.log('Starting run with userId:', userId, 'at', latitude, longitude);

    try {
      const response = await postRunningStart(userId, latitude, longitude);
      console.log('postRunningStart response:', response);
    } catch (error) {
      console.error('Error starting run:', error);
    }
  };

  const { checkExperience, showPopup } = useExperience();

  const handleAddExperience = (newExperience) => {
    checkExperience(newExperience);
  };

  const handleButtonClick = async () => {
    setIsRunning(!isRunning);

    if (!isRunning) {
      // 러닝 시작
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          setCurrentPosition,
          (error) => {
            console.error('Error getting location:', error);
          },
          {
            // enableHighAccuracy: true, // 정확도 높은 위치 정보 요청
            timeout: 15000,
            maximumAge: 0,
          },
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else {
      // 러닝 종료
      try {
        const response = await postRunningEnd(userId);
        if (response) {
          const { pokemonInfo, runningInfo } = response;
          const { level, experience, userNickname, pokemonName, imageUrl } =
            userInfo;

          if (level < pokemonInfo.level) {
            setAnimationOn(true);
          }

          setUserInfo({
            ...userInfo,
            level: pokemonInfo.level,
            experience: pokemonInfo.currentExp,
            pokemonName: pokemonInfo.pokemonName,
            imageUrl: pokemonInfo.imageUrl,
            notRunningDays: 0,
          });

          handleAddExperience(pokemonInfo.currentExp - experience);
        }
      } catch (error) {
        console.error('Error ending run:', error);
      }
    }
  };

  // const dd = {
  //   pokemonInfo: {
  //     userId: 81,
  //     currentExp: 20,
  //     evolutionStatus: 3,
  //     level: 2,
  //     pokemonName: '루기아',
  //     imageUrl:
  //       'https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_5d9b15db2dc0418296ce71a647d8853d/pokestorage/pokemon/lugia.gif',
  //   },
  //   runningInfo: {
  //     totalDistance: 1200.0,
  //     pace: '0\'09"/km',
  //     averageSpeed: 367.0348343245539,
  //     duration: 11770,
  //   },
  // };

  const changeComment = (e) => {
    const value = e.target.value;

    setComment(value);
  };

  const clickCommentIcon = async () => {
    const response = await getCommentAPI(userId);

    if (response) {
      setComment(response.comment);
    }

    setShowCommentModal(true);
  };

  const clickCommentModalConfirmButton = () => {
    saveCommentAPI(userId, comment);
    setComment('');
    setShowCommentModal(false);
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

  const deviceId = localStorage.getItem('deviceId');

  useEffect(() => {
    const fetchUserHomeData = async () => {
      const data = await getUserHomeData(deviceId);

      if (data) {
        setUserInfo({
          level: data.level,
          experience: data.experience,
          notRunningDays: data.notRunningDays,
          userNickname: data.userNickname,
          pokemonName: data.pokemonName,
          imageUrl: data.imageUrl || pokemon1, // 기본 포켓몬 이미지
        });
      }
    };
    fetchUserHomeData();
  }, [deviceId]);

  useEffect(() => {
    if (!showPopup && animationOn) {
      const el = homeEl.current;

      el.classList.add(cx('revol'));

      setTimeout(() => {
        el.classList.remove(cx('revol'));
      }, 1500);

      setAnimationOn(false);
    }
  }, [showPopup, animationOn]);

  return (
    <>
      <img className={cx('revolution', 'none')} ref={homeEl} src={revolution} />
      <div className={cx('homeContainer')}>
        {/* 상단 안내 문구 */}
        <div className={cx('iconWrapper')}>
          {/* <div className={cx('icon')}>
            <img src={map} alt="지도아이콘" />
          </div> */}
          <div className={cx('icon')} onClick={clickCommentIcon}>
            <img src={speechBalloon} alt="말풍선아이콘" />
          </div>
        </div>
        <div className={cx('main')}>
          {/* 말풍선 */}
          <div className={cx('speechBubbleWrapper')}>
            <div className={cx('speechBubble')}>
              {isRunning ? '달리는중...' : '나와 함께 뛰면 넌 더 빨라질 거야!'}
            </div>
          </div>

          {/* 포켓몬 */}
          <div className={cx('pokemonGifWrapper')}>
            <img
              className={cx('pokemonGif')}
              src={userInfo.imageUrl}
              alt="포켓몬"
            />
          </div>
        </div>
        <InfoCard
          backgroundColor="#446934"
          title={userInfo.userNickname}
          style={{ fontSize: '1rem' }}
        >
          <div className={cx('infoWrapper')}>
            <div className={cx('infoBox')}>
              <div className={cx('info')}>
                <span>{userInfo.pokemonName}</span>
                <span>Lv. {userInfo.level}</span>
              </div>
              <div className={cx('progressWrapper')}>
                <span>exp</span>
                <ProgressBar currentExp={userInfo.experience} maxExp={300} />
              </div>
              <span className={cx('currentExp')}>
                {userInfo.experience}/300
              </span>
            </div>
            <div className={cx('statusWrapper')}>
              <button
                className={cx('statusBox', { running: !isRunning })}
                onClick={handleButtonClick}
              >
                <PokeBall style={{ zIndex: '2' }} />
                <span className={cx('statusText')}>
                  {isRunning ? '러닝종료' : '러닝시작'}
                </span>
              </button>
              <div className={cx('run')}>{/* <span>7.5Km/h</span> */}</div>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* 상단 말풍선 아이콘 클릭 > 1등 코멘트 작성 모달 */}
      {showCommentModal && (
        <div className={cx('commentModalContainer')}>
          <div className={cx('commentModalInnerContainer')}>
            <div className={cx('commentWrapper')}>
              <div className={cx('comment')}>
                <div className={cx('title')}>코멘트를 작성해 주세요!</div>
                <div className={cx('content')}>
                  작성하신 코멘트는 지역(구)의 랭킹 1순위가 되면 모든
                  포켓러너들에게 노출됩니다.
                </div>
              </div>
              <input
                ref={commentEl}
                className={cx('input')}
                value={comment}
                type="text"
                onChange={changeComment}
              />
            </div>

            <div
              className={cx('completeButtonWrapper')}
              onClick={clickCommentModalConfirmButton}
            >
              <div className={cx('completeButton')}>확 인</div>
            </div>
          </div>
        </div>
      )}
    </>
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
