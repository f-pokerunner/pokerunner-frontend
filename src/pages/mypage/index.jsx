import classNames from 'classnames/bind';
import InfoCard from '../../components/InfoCard';
import styles from './index.module.scss';
import Popup from '../../components/popup';
import { useExperiencePoll } from '../../\bhooks/useExperiencePoll';

const pokes = [
  {
    id: 1,
    poke: '피카츄',
    src: 'https://www.shutterstock.com/image-vector/red-white-pokemon-ball-circle-260nw-2468816893.jpg',
  },
  {
    id: 2,
    poke: '라이츄',
    src: 'https://www.shutterstock.com/image-vector/red-white-pokemon-ball-circle-260nw-2468816893.jpg',
  },
  {
    id: 3,
    poke: '라이츄',
    src: 'https://pngimg.com/uploads/pokemon/pokemon_PNG154.png',
  },
  {
    id: 4,
    poke: '라이츄',
    src: 'https://www.shutterstock.com/image-vector/red-white-pokemon-ball-circle-260nw-2468816893.jpg',
  },
  {
    id: 5,
    poke: '라이츄',
    src: 'https://www.shutterstock.com/image-vector/red-white-pokemon-ball-circle-260nw-2468816893.jpg',
  },
  {
    id: 6,
    poke: '라이츄',
    src: 'https://www.shutterstock.com/image-vector/red-white-pokemon-ball-circle-260nw-2468816893.jpg',
  },
];

export default function Mypage() {
  const cx = classNames.bind(styles);
  const { showPopup, setShowPopup, message } = useExperiencePoll();

  return (
    <div className={cx('area')}>
      {/* {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )} */}

      <InfoCard backgroundColor="#B13500">
        <MyPokeList pokes={pokes} />
      </InfoCard>
      <div className={cx('recordWrapper')}>
        {[1, 2, 3].map((record) => {
          return (
            <div className={cx('record')} key={record.id}>
              <p>9/27 28m</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MyPokeList({ pokes = [] }) {
  const cx = classNames.bind(styles);

  return (
    <ul className={cx('cardWrapper')}>
      {pokes.map((poke) => {
        return (
          <li className={cx('pokeCard')} key={poke.id}>
            <img src={poke.src} alt="poke" />
          </li>
        );
      })}
    </ul>
  );
}
