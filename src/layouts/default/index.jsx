// import { Outlet } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import { useExperience } from '../../hooks/useExperience';
// import styles from './index.module.scss';
// import Nav from '../../components/nav';
// import Popup from '../../components/popup';
// import { ExperienceProvider } from '../../context/ExperienceContext';

// const cx = classNames.bind(styles);

// export default function Default() {
//   const { showPopup, setShowPopup, message } = useExperience();

//   return (
//     <ExperienceProvider>
//       <div className={cx('commonLayoutWrapper')}>
//         {showPopup && (
//           <Popup message={message} onClose={() => setShowPopup(false)} />
//         )}

//         <main className={cx('mainWrapper')}>
//           <Outlet />
//         </main>
//         <div className={cx('navWrapper')}>
//           <Nav />
//         </div>
//       </div>{' '}
//     </ExperienceProvider>
//   );
// }
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import {
  ExperienceProvider,
  useExperience,
} from '../../context/ExperienceContext';
import styles from './index.module.scss';
import Nav from '../../components/nav';
import Popup from '../../components/popup';

const cx = classNames.bind(styles);

export default function Default() {
  return (
    <ExperienceProvider>
      <DefaultContent />
    </ExperienceProvider>
  );
}

function DefaultContent() {
  const { showPopup, setShowPopup, message } = useExperience();

  return (
    <div className={cx('commonLayoutWrapper')}>
      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}

      <main className={cx('mainWrapper')}>
        <Outlet />
      </main>
      <div className={cx('navWrapper')}>
        <Nav />
      </div>
    </div>
  );
}
