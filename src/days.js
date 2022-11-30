import { Outlet, useLocation } from 'react-router-dom';

const SUFFIX = new RegExp('[^/]+$');

const Days = () => {
  const { pathname } = useLocation();
  const day = pathname.match(SUFFIX)[0];

  return <>
    <h1>Day {day}</h1>
    <Outlet />
  </>;
}

export default Days;
