import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function RankingMap() {
  const location = [
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '강남구',
    '중랑구',
    '한강',
  ];

  return (
    <div className={cx('rankingMapContainer')}>
      {/* 상단 안내 문구 */}
      <div className={cx('noticeBoxWrapper')}>
        <div className={cx('noticeBox')}>지도 UI가 아직 미완성 입니다.</div>
      </div>

      {/* 지도 */}
      <div className={cx('rankingMapWrapper')}>
        <div className={cx('rankingMapInnerWrapper')}>
          {Array(47)
            .fill(null)
            .map((_, index) => {
              return <div className={cx('map', location[index])}></div>;
            })}
        </div>
      </div>
    </div>
  );
}
