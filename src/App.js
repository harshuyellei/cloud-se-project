import ProfilePage from "./components/profile";
import AdditionPage from "./components/addpage";
import FinancialData from "./components/financialData";
import InventoryPage from './components/InventoryPage';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUp from "./components/SingUp";
import Login from "./components/Login";
import Info from "./components/Info";

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/additionPage" element={<AdditionPage />}></Route>
                    <Route path="/" element={<ProfilePage />}></Route>
                    <Route path="/financial-data" element={<FinancialData />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/info" element={<Info />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
