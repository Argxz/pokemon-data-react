import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import List from './pages/List';
import About from './pages/About';
import Detail from './pages/Detail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list-anime" element={<List />} />
        <Route path="/detail/:animeId" element={<Detail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
