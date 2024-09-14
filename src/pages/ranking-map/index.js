import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

// import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
// import pokemon2 from '../../assets/gifs/피카츄gif.gif';
// import pokemon3 from '../../assets/gifs/파이리gif.gif';
import PockemonImage from '../../components/PokemonImage';
import ribbonBanner from '../../assets/icons/ribbon_banner.svg';
import ranking from '../../assets/icons/ranking.svg';

import {
  getLocationListAPI,
  getLocation1stListAPI,
  getRankerInfoAPI,
} from '../../api/service';

import styles from './index.module.scss';
import { getUserRunnings } from '../../api/apiClient';

const cx = classNames.bind(styles);

export default function RankingMap() {
  const [showModal, setShowModal] = useState(false);
  const [locationInfoList, setLocationInfoList] = useState([]);
  const [rankerInfoList, setRankerInfoList] = useState([]);
  const [selectedLocationName, setSelectedLocationName] = useState('');
  const [gu, setLocation] = useState('');
  const deviceId = localStorage.getItem('deviceId');

  useEffect(() => {
    if (deviceId) {
      // 런닝 기록 데이터 가져오기
      getUserRunnings(deviceId)
        .then((data) => {
          if (data) {
            setLocation(data.map((i) => i.guAddress));
          }
        })
        .catch((error) => {
          console.error('Error fetching user runnings:', error);
        });
    }
  }, [deviceId]);

  /**
   * TODO:
   * 1. 랭킹이 안정해져 있을때 익명 포켓몬 이미지 띄우기
   * 2. 포켓몬 비율 맞추려니 끝이 좀 잘리는 이슈 있음. 우선순위 낮음.
   * 3. 포켓몬 포지션 정렬
   * 4. 피카츄가 아닌 포켓몬은 scale을 0.8로 조정 필요
   */

  const clickLocation = async (guAddress) => {
    const response = await getRankerInfoAPI(guAddress);

    if (response) {
      setRankerInfoList(response);
    }
    setSelectedLocationName(guAddress);
    setShowModal(true);
  };

  const clickModalButton = () => {
    setSelectedLocationName('');
    setRankerInfoList([]);
    setShowModal(false);
  };

  /**
   * 마운트 시
   *
   * 1. 지역(구) 명칭 리스트 요청
   * 2. 각 지역(구) 1순위 정보 리스트 요청
   */
  useEffect(() => {
    const init = async () => {
      const locationList = await getLocationListAPI();
      const location1stList = await getLocation1stListAPI();

      if (location1stList && locationList) {
        const locationInfoList = locationList.map((locationName) => {
          const item = location1stList.find(
            (value) => value.runningAddress === locationName,
          );

          return { locationName, ...item };
        });

        locationInfoList.push({ locationName: '한강' });

        setLocationInfoList(locationInfoList);
      }
    };

    init();
  }, []);

  return (
    <>
      {/* 지도 화면 */}
      <div className={cx('rankingMapContainer')}>
        <div className={cx('noticeBoxWrapper')}>
          <div className={cx('noticeBox')}>
            각 지역(구)의 랭킹 1순위가 보여집니다.
          </div>
        </div>
        <div className={cx('rankingMapWrapper')}>
          <div className={cx('rankingMapInnerWrapper')}>
            {locationInfoList.map((location, index) => {
              return (
                <div
                  key={index}
                  className={cx('map', location.locationName, {
                    sparkle: gu[0] === location.locationName,
                  })}
                  onClick={() => clickLocation(location.locationName)}
                >
                  {location.imageUrl && (
                    <PockemonImage src={location.imageUrl} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 지역 클릭시 노출되는 모달 */}
      {showModal && (
        <div className={cx('rankingDetailModalContainer')}>
          <div className={cx('rankingDetailModalInnerContainer')}>
            {/* 랭킹 배너 */}
            <div className={cx('rankingBannerWrapper')}>
              <div className={cx('bannerText')}>
                {selectedLocationName} 랭킹
              </div>
              <img
                className={cx('bannerImage')}
                src={ribbonBanner}
                alt="랭킹배너"
              />
            </div>

            {/* 말풍선 */}
            {rankerInfoList?.map((ranker, index) => {
              const comment = ranker?.ranking === 1 && ranker?.comment;

              return (
                comment && (
                  <div className={cx('speechBubbleWrapper')} key={index}>
                    <div className={cx('speechBubble')}>{comment}</div>
                  </div>
                )
              );
            })}

            {/* 랭커 캐릭터, 순위 발판 이미지 */}
            <div className={cx('rankingFloorWrapper')}>
              <img className={cx('rankingFloor')} src={ranking} alt="" />

              <div className={cx('rankers')}>
                {[2, 1, 3].map((value, index) => {
                  const ranker = rankerInfoList.find(
                    (item) => item.ranking === value,
                  );

                  const className =
                    (value === 1 && 'first') ||
                    (value === 2 && 'second') ||
                    (value === 3 && 'third') ||
                    '';

                  return (
                    <div key={value} className={cx('ranker', className)}>
                      {ranker && <PockemonImage src={ranker?.imageUrl} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 랭커의 닉네임, 레벨, 경험치 */}
            <div className={cx('rankerInfoWrapper')}>
              {[2, 1, 3].map((value, index) => {
                const ranker = rankerInfoList.find(
                  (item) => item.ranking === value,
                );

                return (
                  <div key={value} className={cx('rankerInfo')}>
                    <div>{ranker?.userNickname || ''}</div>
                    <div>{ranker?.level ? `Lv. ${ranker.level}` : ''}</div>
                    <div>{ranker?.exp ? `Exp. ${ranker.exp}` : ''}</div>
                  </div>
                );
              })}
            </div>

            {/* <div className={cx('myRankingWrapper')}>
            <div className={cx('myRanking')}>나의 등수는 N등 입니다</div>
          </div> */}
            <div className={cx('completeButtonWrapper')}>
              <div className={cx('completeButton')} onClick={clickModalButton}>
                확 인
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
