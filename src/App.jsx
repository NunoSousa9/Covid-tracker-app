import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./MainComponents/Sidebar";
import MainChart from "./MainComponents/MainChart";
import WorldMap from "./MainComponents/WorldMap";
import CountryDetails from "./Countries/CountryDetails";
import './styles.css';


const App = () => {


    const [activeTab, setActiveTab] = useState('cases');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    }

    return (
      <Router>
        <div className="app">
          <div className="sidebar-container">
            <Sidebar onTabChange={handleTabChange} />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage activeTab={activeTab} />} />
              <Route path="/countries/:countryName" element={<CountryDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  };
  
  const HomePage = ({ activeTab }) => {
    return (
      <>
      <div className="world-map">
        <WorldMap activeTab={activeTab} />
      </div>
      <div className="main-chart">
        <MainChart activeTab={activeTab} />
      </div>
      </>
    );
  };
  
  export default App;