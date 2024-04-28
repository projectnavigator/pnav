import Wrapper from '../assets/wrappers/AdminNav';
import { useDashboardContext } from '../pages/DashboardPage';
import { FaTimes } from "react-icons/fa";
import links
 from '../utils/links';
import { NavLink } from 'react-router-dom';
import { IconBase } from 'react-icons';
import NavLinks from './NavLinks';

const AdminNav = () => {
    const {showSidebar, toggleSidebar} = useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-cotainer show-sidebar':'sidebar-container'
    }>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            Logo
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminNav;
