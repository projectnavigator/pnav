import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from "../pages/DashboardPage";
import LogoutContainer from "./LogoutContainer";



const Navbar = () => {
    const {toggleSidebar} = useDashboardContext();
    return (
    <Wrapper>
        <div className="nav-center">
            <button type="button" className="toggle-btn" onClick={toggleSidebar}>
                <FaAlignLeft />
            </button>
            <div>
                
                <h4 className="logo-text"></h4>
            </div>
            <div className="btn-container">
                <LogoutContainer />
            </div>
        </div>
    </Wrapper>
    );
};

export default Navbar;