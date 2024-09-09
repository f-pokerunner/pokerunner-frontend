import { Link, Outlet } from 'react-router-dom';

export default function Default() {
  return (
    <>
      <h2>Default</h2>
      <Outlet />

      {/* 개발전 임시 nav */}
      <div style={{ marginTop: 10, display: 'flex', gap: 5 }}>
        <Link to="/">home</Link>
        <Link to="/ranking-map">map</Link>
        <Link to="/mypage">mypage</Link>
      </div>
    </>
  );
}
