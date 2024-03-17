// App.js
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard"; // Import Dashboard component
import Sidebar from "./scenes/global/Sidebar";
import RegisteredMember from "./scenes/registeredmembers";
import ManageRegisteredMembers from "./scenes/manageregisteredmembers";
import AddUser from "./scenes/userform/adduser";
import ManageGymEquipments from "./scenes/managegymequipments";
import UpdateGymEquipments from "./scenes/updategymequipments";
import Attendance from "./scenes/attendance";
import AddEquipment from "./scenes/gymform";
import Login from "./components/Login";
import { useState } from "react";
import UpdateRegisteredMembers from "./scenes/updatemember";
import ManageWalkIn from "./scenes/managewalkin";
import AddWalkIn from "./scenes/walkinform";
import AttendanceWalkIn from "./scenes/attendancewalkin";
import Membership from "./scenes/membership";
import UpdatePayment from "./scenes/paymentform";
import Bar from "./scenes/bar";
import GenderPie from "./scenes/genderpie";
import MemberPie from "./scenes/memberpie";
import ToDo from "./components/ToDo";
import LineChart from "./scenes/line";

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
  const [isSidebar, setIsSidebar] = useState(true);

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isLoggedIn && (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/registeredmember" element={<RegisteredMember />} />
                <Route path="/manageregisteredmembers" element={<ManageRegisteredMembers />} />
                <Route path="/userform" element={<AddUser />} />
                <Route path="/updatemember/:id" element={<UpdateRegisteredMembers />} />
                <Route path="/managegymequipments" element={<ManageGymEquipments />}/>
                <Route path="/updategymequipments/:id" element={<UpdateGymEquipments />} />
                <Route path="/gymform" element={<AddEquipment />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/attendancewalkin" element={<AttendanceWalkIn />} />
                <Route path="/managewalkin" element={ <ManageWalkIn/> }> </Route>
                <Route path="/walkinform" element={<AddWalkIn />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/paymentform/:id" element={<UpdatePayment />} />
                <Route path="/bar" element={<Bar  />}></Route>
                <Route path="/todo" element={<ToDo  />}></Route>
                <Route path="/genderpiechart" element={<GenderPie  />}></Route>
                <Route path="/memberpiechart" element={<MemberPie  />}></Route>
                <Route path="/line" element={<LineChart />}></Route>
          </Routes>
        )}
          {/* <main className="content">
            <Topbar setIsSidebar={setIsSidebar} onLogout={handleLogout} />
            <Routes>
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/registeredmember" element={<RegisteredMember />} />
                <Route path="/manageregisteredmembers" element={<ManageRegisteredMembers />} />
                <Route path="/userform" element={<AddUser />} />
                <Route path="/updatemember/:id" element={<UpdateRegisteredMembers />} />
                <Route path="/managegymequipments" element={<ManageGymEquipments />}/>
                <Route path="/updategymequipments/:id" element={<UpdateGymEquipments />} />
                <Route path="/gymform" element={<AddEquipment />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/attendancewalkin" element={<AttendanceWalkIn />} />
                <Route path="/managewalkin" element={ <ManageWalkIn/> }> </Route>
                <Route path="/walkinform" element={<AddWalkIn />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/paymentform/:id" element={<UpdatePayment />} />
                <Route path="/bar" element={<Bar  />}></Route>
                <Route path="/todo" element={<ToDo  />}></Route>
                <Route path="/genderpiechart" element={<GenderPie  />}></Route>
                <Route path="/memberpiechart" element={<MemberPie  />}></Route>
                <Route path="/line" element={<LineChart />}></Route>

              </>
            </Routes>
          </main> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
