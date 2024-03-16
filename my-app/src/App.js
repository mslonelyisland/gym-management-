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
// import GymEquipments from "./scenes/gymequipments";
import ManageGymEquipments from "./scenes/managegymequipments";
import UpdateGymEquipments from "./scenes/updategymequipments";
import Attendance from "./scenes/attendance";
import AddEquipment from "./scenes/gymform";
import Login from "./components/login";
import { useState } from "react";
import UpdateRegisteredMembers from "./scenes/updatemember";

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
          </Routes>
        )}
         <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} onLogout={handleLogout} />
            <Routes>
              <>
                <Route path="/dashboard" element={<Dashboard />} />{" "}
                <Route path="/registeredmember" element={<RegisteredMember />} />
                <Route path="/manageregisteredmembers" element={<ManageRegisteredMembers />} />
                <Route path="/userform" element={<AddUser />} />
                <Route path="/updatemember/:id" element={<UpdateRegisteredMembers />} />
                <Route path="/managegymequipments" element={<ManageGymEquipments />}/>
                <Route path="/updategymequipments/:id" element={<UpdateGymEquipments />} />
                <Route path="/gymform" element={<AddEquipment />} />
                <Route path="/attendance" element={<Attendance />} />
              </>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
