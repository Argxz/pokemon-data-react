import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:pokemonId" element={<Detail />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
