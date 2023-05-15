import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/png/logo-no-background.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../../utils/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { getToken ,removeToken} from "../../../API/localStorage";
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { unSetUsertoken } from "../../../features/authSlice";


const Sidebar = () => {
  const {access_token}=getToken()
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const navigate = useNavigate()
	const dispatch =useDispatch()
	const handleLogout = () => {
	  dispatch(unSetUsertoken({access_token:null}))
	  removeToken()
	  navigate('/login')
	}

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
       
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        
        <div className="menuItem">
          <UilSignOutAlt onClick={handleLogout}/>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
