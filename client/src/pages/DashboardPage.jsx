import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Sidebar, Navbar, AdminNav } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardPage = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <AdminNav />
          <Sidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardPage;
