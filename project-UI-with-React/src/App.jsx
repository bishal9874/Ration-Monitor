import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Layouts from "./Layouts";

import { useSelector } from "react-redux";
import Login from "./components/AuthScreens/login/Login";
import MainDashSection from "./components/Dashboard/MainDashSection/MainDashSection";
import FaceAuth from "./components/AuthScreens/FaceAuth/FaceAuth";
import Reg from "./components/AuthScreens/Registration/Reg";
import UserKyc from "./components/AuthScreens/userKYC/UserKyc";
function App() {
  const [count, setCount] = useState(0);
  const { access_token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}></Route>
        <Route
          path="/login"
          element={access_token ? <Navigate to={"/logincam"} /> : <Login />}
        />

        <Route
          path="/logincam"
          element={access_token ? <FaceAuth/> : <Navigate to={"/login"} />}
        />
        <Route
          path="/userkyc"
          element={ <UserKyc/>}
        />
         <Route
          path="/signup"
          element={ < Reg />}
        />
        <Route path="/dashboard" element={<MainDashSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
