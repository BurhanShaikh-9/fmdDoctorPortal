import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import './style.css';
import { Layout } from './Main/layout';
import { Sidebar } from './Main/Component/sidebar';
import { Dashboard } from './Main/WebPage/dashboard/dashboard';
import {Appointment} from './Main/WebPage/appointment/appointment'
import { ROUTES } from './utils/Routes';
import { TotalProfile } from './Main/WebPage/doctorReport/totalProfile';
import { Sales } from './Main/WebPage/doctorReport/sales';
import { Profile } from './Main/WebPage/doctorProfile/profile';


export const SidebarContext = createContext({ sideBar: false, setSideBar: () => { } })

function App() {
  //for sideBar and top header functionality
  const [sideBar, setsideBar] = useState(false);
  const getSideBarPos = (value) => {
    setsideBar(!value);
  }

  return (
    <>
      <SidebarContext.Provider value={{ sideBar: sideBar, setSideBar: setsideBar }}>
        <Sidebar />
        <div className={sideBar ? 'AppFull' : 'App'}>
          <Routes>
            <Route element={<Layout />}>
              <Route path={ROUTES.HOMEPAGE} element={<Dashboard />} />
              <Route path={ROUTES.APPOINTMENT} element={<Appointment />} />
              <Route path={ROUTES.TOTALPROFIT} element={< TotalProfile />} />
              <Route path={ROUTES.SALES} element={< Sales />} />
              <Route path={ROUTES.PROFILE} element={< Profile />} />
            </Route>
          </Routes>
        </div>
      </SidebarContext.Provider>
      
      {/* <Login /> */}

    </>
  );
}

export default App;
