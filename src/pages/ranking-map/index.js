import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import PockemonImage from '../../components/PokemonImage';
import ribbonBanner from '../../assets/icons/ribbon_banner.svg';
import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import pokemon2 from '../../assets/gifs/피카츄gif.gif';
import pokemon3 from '../../assets/gifs/파이리gif.gif';
import ranking from '../../assets/icons/ranking.svg';

import { getLocationListAPI, getLocation1stListAPI } from '../../api/service';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function RankingMap() {
  const [showModal, setShowModal] = useState(false);

  /**
   * locationInfoList 구조
   *
   * [{
   *  locationName: '',
   *  아래의 값은 랭커가 없으면 없을 수 있음.
   *  imageUrl: '',
   *  pokemonName: '',
   *  runningAddress: '',
   *  totalDistance: '',
   *  userId: 0,
   *  userNickname: '',
   * }, ...]
   */
  const [locationInfoList, setLocationInfoList] = useState([]);

  /**
   * TODO:
   * 1. 랭킹이 안정해져 있을때 익명 포켓몬 이미지 띄우기
   * 2. 포켓몬 비율 맞추려니 끝이 좀 잘리는 이슈 있음. 우선순위 낮음.
   * 3. 포켓몬 포지션 정렬
   * 4. 피카츄가 아닌 포켓몬은 scale을 0.8로 조정 필요
   */

  const clickLocation = () => {
    setShowModal(true);
  };

  const clickModalButton = () => {
    setShowModal(false);
  };

  const d = {
    locationName: '',
    // 아래의 값은 랭커가 없으면 없을 수 있음.
    imageUrl: '',
    pokemonName: '',
    runningAddress: '',
    totalDistance: '',
    userId: 0,
    userNickname: '',
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
                  className={cx('map', location.locationName)}
                  onClick={clickLocation}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 지역 클릭시 노출되는 모달 */}
      {showModal && (
        <div className={cx('rankingDetailModalContainer')}>
          <div className={cx('rankingBannerWrapper')}>
            <div className={cx('bannerText')}>무슨무슨구 랭킹</div>
            <img
              className={cx('bannerImage')}
              src={ribbonBanner}
              alt="랭킹배너"
            />
          </div>
          <div className={cx('rankingFloorWrapper')}>
            <img className={cx('rankingFloor')} src={ranking} />

            <div className={cx('rankers')}>
              <div className={cx('ranker', 'secondPlace')}>
                <PockemonImage src={pokemon3} />
              </div>
              <div className={cx('ranker', 'firstPlace')}>
                <PockemonImage src={pokemon2} name={'피카츄'} />
              </div>
              <div className={cx('ranker', 'thirdPlace')}>
                <PockemonImage src={pokemon1} />
              </div>
            </div>
          </div>

          <div className={cx('rankerInfoWrapper')}>
            <p className={cx('rankerInfo')}>
              <div>포켓몬 닉네임</div>
              <div>Lv.34</div>
              <div>Exp.227</div>
            </p>
            <p className={cx('rankerInfo')}>
              <div>포켓몬 닉네임</div>
              <div>Lv.34</div>
              <div>Exp.227</div>
            </p>
            <p className={cx('rankerInfo')}>
              <div>포켓몬 닉네임</div>
              <div>Lv.34</div>
              <div>Exp.227</div>
            </p>
          </div>
          <div className={cx('myRankingWrapper')}>
            <div className={cx('myRanking')}>나의 등수는 N등 입니다</div>
          </div>
          <div className={cx('completeButtonWrapper')}>
            <div className={cx('completeButton')} onClick={clickModalButton}>
              확 인
            </div>
          </div>
        </div>
      )}
    </>
  );
}
