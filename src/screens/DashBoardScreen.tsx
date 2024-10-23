import React from "react";
import { TabBar } from "antd-mobile";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  AppOutline,
  CalendarOutline,
  UserOutline,
  PieOutline,
} from "antd-mobile-icons";
import HomeScreen from "./HomeScreen";
import PieChartComponent from "../components/PieChartComponent";

const DashBoardScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };
  const tabs = [
    {
      key: "home",
      title: "Home",
      icon: <AppOutline />,
      component: HomeScreen,
    },
    {
      key: "calendar",
      title: "Calendar",
      icon: <CalendarOutline />,
      component: Calendar,
    },
    // {
    //     key:'add',
    //     title : '',
    //     icon: <AddCircleOutline fontSize={35} />
    // },
    {
      key: "statistics",
      title: "Statistics",
      icon: <PieOutline />,
      component: Statistics,
    },
    {
      key: "profile",
      title: "Profile",
      icon: <UserOutline />,
      component: Profile,
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="content">
        <Routes>
          {tabs.map((tab) => (
            <Route key={tab.key} path={tab.key} element={<tab.component />} />
          ))}
        </Routes>
      </div>
      <div className="tab-bar">
        <TabBar
          activeKey={pathname}
          onChange={(value) => setRouteActive(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export function Calendar() {
  return <div>Calendar</div>;
}
export function Profile() {
  return <div>Profile</div>;
}
export function Statistics() {
  return (
    <div>
      <PieChartComponent />
    </div>
  );
}
export default DashBoardScreen;
