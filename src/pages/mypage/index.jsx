import classNames from 'classnames/bind';
import InfoCard from '../../components/InfoCard/index.jsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import {
  getUserPokemons,
  getUserRunnings,
  setDefaultPokemon,
} from '../../api/apiClient.js';

export default function Mypage() {
  const [pokes, setPokes] = useState([]);
  const [runnings, setRunnings] = useState([]);
  const [defaultPoke, setDefaultPoke] = useState('');

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
          if (data) {
            setRunnings(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user runnings:', error);
        });
    }
  }, [deviceId, defaultPoke]);

  const handlePokeClick = async (poke) => {
    try {
      const response = await setDefaultPokemon(deviceId, poke.pokemonName);
      // 문자열로 넘어오는 response 대신 리렌더링 시키기 위한 new Date()
      setDefaultPoke(new Date());
      if (response) {
        console.log('Default Pokemon set successfully:', response);
        // 성공 시 사용자에게 피드백을 제공하거나 UI 업데이트
      } else {
        console.error('Failed to set default Pokemon');
      }
    } catch (error) {
      console.error('Error setting default Pokemon:', error);
    }
  };

  return (
    <div className={cx('area')}>
      <InfoCard backgroundColor="#B13500" style={{ width: '90%' }}>
        <MyPokeList pokes={pokes} onPokeClick={handlePokeClick} />
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

function MyPokeList({ pokes = [], onPokeClick }) {
  const cx = classNames.bind(styles);

  return (
    <ul className={cx('cardWrapper')}>
      {pokes.map((poke, i) => {
        const pokeClass = poke.defaultPokemon
          ? cx('pokeCard', 'defaultPokemon')
          : cx('pokeCard');

        return (
          <li key={i}>
            <button className={pokeClass} onClick={() => onPokeClick(poke)}>
              <img src={poke.imageUrl} alt="poke" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
