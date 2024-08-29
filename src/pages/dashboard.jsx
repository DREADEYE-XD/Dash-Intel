import { Navbar } from "../ui/dashboard/navbar";
import { Sidebar } from "../ui/dashboard/sidebar";
import { useTheme } from "../lib/themeContext";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  const { themeOptions } = useTheme();
  return (
    // Window wrapper
    <div
      className="w-screen h-screen"
      style={{
        backgroundColor: themeOptions.backgroundColor,
        color: themeOptions.color,
      }}
    >
      {/* container wrapper */}
      <div className="w-full h-full flex flex-wrap">
        {/* top nav */}
        <Navbar />

        {/* side nav */}
        <Sidebar />

        

        <div id="detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
