import classNames from 'classnames/bind';
import InfoCard from '../../components/InfoCard/index.jsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { getUserPokemons, getUserRunnings } from '../../api/apiClient.js';

export default function Mypage() {
  const [pokes, setPokes] = useState([]);
  const [runnings, setRunnings] = useState([]);

  const cx = classNames.bind(styles);
  const deviceId = localStorage.getItem('deviceId');

  useEffect(() => {
    if (deviceId) {
      getUserPokemons(deviceId)
        .then((data) => {
          if (data) {
            setPokes(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user pokemons:', error);
        });

      // 런닝 기록 데이터 가져오기
      getUserRunnings(deviceId)
        .then((data) => {
          console.log(data);
          if (data) {
            setRunnings(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user runnings:', error);
        });
    }
  }, [deviceId]);

  return (
    <div className={cx('area')}>
      <InfoCard backgroundColor="#B13500" style={{ width: '90%' }}>
        <MyPokeList pokes={pokes} />
      </InfoCard>
      <div className={cx('recordWrapper')}>
        {runnings.length > 0 ? (
          runnings.map((record, i) => (
            <div className={cx('record')} key={i}>
              <p>{record.pace}</p>
            </div>
          ))
        ) : (
          <div className={cx('noRecordMessage')}>
            <p>러닝 기록이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MyPokeList({ pokes = [] }) {
  const cx = classNames.bind(styles);

  return (
    <ul className={cx('cardWrapper')}>
      {pokes.map((poke, i) => {
        return (
          <li key={i}>
            <button className={cx('pokeCard')}>
              <img src={poke.imageUrl} alt="poke" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
