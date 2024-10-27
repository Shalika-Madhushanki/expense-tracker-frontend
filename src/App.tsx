import React from "react";
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DashBoardScreen from "./screens/DashBoardScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ViewExpenseScreen from "./screens/ViewExpenseScreen";
const App: React.FC = () => {
  return (
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard/*" element={<DashBoardScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/expenses/add" element={<AddExpenseScreen />} />
          <Route path="/expenses/view/:id" element={<ViewExpenseScreen />} />
          <Route path="/expenses/edit/:id" element={<AddExpenseScreen />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
