import { useState } from 'react';
import classNames from 'classnames/bind';
import ItemsCarousel from 'react-items-carousel';

import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import pokemon2 from '../../assets/gifs/피카츄gif.gif';
import pokemon3 from '../../assets/gifs/파이리gif.gif';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow_right.svg';

import styles from './index.module.scss';
import { handleSignup } from '../../api/service';

const cx = classNames.bind(styles);

export default function Intro() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [login, setLogin] = useState({
    nickname: '',
    address: '',
    pokemonName: '',
  });

  /** 포켓몬 이름을 설정 */
  const updatePokemonName = (index) => {
    const pokemonNames = ['이상해씨', '피카츄', '파이리'];
    setLogin((prev) => ({ ...prev, pokemonName: pokemonNames[index] }));
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
    } else {
      console.error('All fields are required!');
    }
  };
  /**
   * TODO:
   * 1. 중복 닉네임 경고 문구 UI 추가 필요
   * 2. 해당 컴포넌트를 Login 페이지로 이동 필요
   */
  return (
    <div className={cx('introContainer')}>
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
            <div>
              <img className={cx('pokemonGif')} src={pokemon1} alt="포켓몬" />
            </div>
            <div>
              <img className={cx('pokemonGif')} src={pokemon2} alt="포켓몬" />
            </div>
            <div>
              <img className={cx('pokemonGif')} src={pokemon3} alt="포켓몬" />
            </div>
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
            />
          </div>

          <div className={cx('inputInnerContainer')}>
            <div>주소(구)</div>
            <input
              type="text"
              name="address"
              value={login.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={cx('completeButton')} onClick={handleComplete}>
          완 료
        </div>
      </div>
    </div>
  );
}
