import { useDashboardContext } from "../pages/DashboardPage";
import links from "../utils/links";
import { NavLink, redirect } from "react-router-dom";
const NavLinks = ({isSidebar}) => {
    const {toggleSidebar, user} = useDashboardContext()
  return (
    <div className="nav-links">
    {links.map((link) => {
      const {text, path, icon} = link
      const {role, isProjectManager} =user
      if ((path === 'progress-report' &&!(role === 'admin' || isProjectManager))) return null
      if((path==='database' && role!=='admin')) return
      return (
        <NavLink to={path} key={text} className='nav-link' onClick={isSidebar ? null : toggleSidebar} end>
          <span className='icon'>
            {icon}
          </span>
          {text}
        </NavLink>
      );
    })}
  </div>
  )
}

export default NavLinks;
