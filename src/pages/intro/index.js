import { useState } from 'react';
import classNames from 'classnames/bind';
import ItemsCarousel from 'react-items-carousel';

import pokemon1 from '../../assets/gifs/이상해씨gif.gif';
import pokemon2 from '../../assets/gifs/피카츄gif.gif';
import pokemon3 from '../../assets/gifs/파이리gif.gif';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow_right.svg';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Intro() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

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
            requestToChangeActive={setActiveItemIndex}
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
            <input />
          </div>

          <div className={cx('inputInnerContainer')}>
            <div>주소(구)</div>
            <input />
          </div>
        </div>

        <div className={cx('completeButton')}>완 료</div>
      </div>
    </div>
  );
}
