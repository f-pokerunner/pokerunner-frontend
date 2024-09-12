import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function PockemonImage({ src, name }) {
  const isPikachu = name === '피카츄';

  return (
    <img className={cx('pokemon', { isPikachu })} src={src} alt="포켓몬" />
  );
}

export default PockemonImage;
