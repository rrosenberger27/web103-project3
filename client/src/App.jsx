import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ListView from './pages/ListView';
import DetailView from './pages/DetailView';
import EditView from './pages/EditView';
import CreateView from './pages/CreateView';

function App() {
  const [mode, setMode] = React.useState("light");
  return (
    <div className='app-container'>
      <NavBar currentMode={mode} onClick={() => setMode(mode === "light" ? "dark" : "light")} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tshirts' element={<ListView />} />
        <Route path='/tshirts/:id' element={<DetailView />} />
        <Route path='/tshirts/edit/:id' element={<EditView />} />
        <Route path='/tshirts/create' element={<CreateView />} />

      </Routes>

    </div>
  )
}

export default App
