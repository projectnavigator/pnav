import Wrapper from "../assets/wrappers/Sidebar";
import NavLinks from "./NavLinks";
import { useDashboardContext
 } from "../pages/DashboardPage";
 import Logo from "../components/Logo"

const Sidebar = () => {
  const { showSidebar } = useDashboardContext()

  return <Wrapper>
    <div className={showSidebar?'sidebar-container ':'sidebar-container show-sidebar'}>
    <div className="content">
      <header>
        <Logo/>
      </header>
      <NavLinks  isSidebar />
    </div>
    </div>
  </Wrapper>
  
};

export default Sidebar;

