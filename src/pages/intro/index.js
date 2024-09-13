import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import classNames from 'classnames/bind';

// hsPyo: 혹시 모를 상황에 대비해 남겨둠
// import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
// import pokemon2 from '../../assets/gifs/피카츄gif.gif';
// import pokemon3 from '../../assets/gifs/파이리gif.gif';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow_right.svg';

import Popup from '../../components/popup';

import {
  getSeoulLocationList,
  handleSignup,
  getPokemonsAPI,
} from '../../api/service';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Intro() {
  const navigate = useNavigate();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [login, setLogin] = useState({
    nickname: '',
    address: '',
    pokemonName: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  /** 포켓몬 이름을 설정 */
  const updatePokemonName = (index) => {
    const pokemonCount = index % pokemons.length;
    setLogin((prev) => ({
      ...prev,
      pokemonName: pokemons[pokemonCount].pokemonName,
    }));
  };

  /** 캐러셀 아이템 변경 시 포켓몬 이름 업데이트 */
  const handleCarouselChange = (index) => {
    setActiveItemIndex(index);
    updatePokemonName(index);
  };

  /** 입력 필드 변경 시 상태 업데이트 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  /** 완료 버튼 클릭 시 처리 */
  const handleComplete = async () => {
    const { nickname, address, pokemonName } = login;
    console.log(nickname, address, pokemonName);
    if (nickname && address && pokemonName) {
      const response = await handleSignup(nickname, address, pokemonName);
      console.log('Signup or Login:', response);

      if (response === 'success') {
        navigate('/home', { replace: true });
      }
    } else {
      console.error('All fields are required!');
    }
  };

  /** 주소(구) 입력칸 클릭 */
  const clickAddress = () => {
    setShowPopup(true);
  };

  /** 주소(구) 입력칸 클릭 > 팝업 본문 클릭 */
  const handlePopupContentClick = (item) => {
    setLogin((prev) => ({ ...prev, address: item }));
    setShowPopup(false);
  };

  /** 주소(구) 팝업 확인 버튼 클릭 */
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  /**
   * 마운트 시
   *
   * 1. 주소(구) 리스트 요청
   * 2. 포켓몬 image 리스트 요청
   */
  useEffect(() => {
    const initLocation = async () => {
      const response = await getSeoulLocationList();
      const pokemons = await getPokemonsAPI();
      setLocation(response);
      setPokemons(pokemons);
      setLogin((prev) => ({ ...prev, pokemonName: pokemons[0].pokemonName }));
    };

    initLocation();
  }, []);

  return (
    <div className={cx('introContainer')}>
      {showPopup && (
        <Popup
          message={location}
          onContentClick={handlePopupContentClick}
          onClose={handlePopupClose}
        />
      )}
      <div className={cx('introInnerContainer')}>
        <div className={cx('title')}>포켓몬을 선택해 주세요!</div>
        <div className={cx('pokemonCarouselContainer')}>
          <ItemsCarousel
            requestToChangeActive={handleCarouselChange}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            gutter={0}
            leftChevron={
              <div>
                <ArrowLeft />
              </div>
            }
            rightChevron={
              <div>
                <ArrowRight />
              </div>
            }
            outSideChevron
            chevronWidth={40}
            infiniteLoop
          >
            {pokemons.map((pokemon) => (
              <div key={pokemon.pokemonName}>
                <img
                  className={cx('pokemonGif')}
                  src={pokemon.imageUrl}
                  alt={pokemon.pokemonName}
                />
              </div>
            ))}
          </ItemsCarousel>
        </div>

        <div className={cx('inputContainer')}>
          <div className={cx('inputInnerContainer')}>
            <div>닉네임</div>
            <input
              type="text"
              name="nickname"
              value={login.nickname}
              onChange={handleInputChange}
              className={cx('input')}
            />
          </div>

          <div className={cx('inputInnerContainer')}>
            <div>주소(구)</div>
            <div className={cx('input')} onClick={clickAddress}>
              {login.address}
            </div>
          </div>
        </div>

        <div className={cx('completeButton')} onClick={handleComplete}>
          완 료
        </div>
      </div>
    </div>
  );
}
