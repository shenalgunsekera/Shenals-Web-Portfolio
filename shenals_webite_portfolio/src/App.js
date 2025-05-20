
import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <Skills/>
      {/* Add other components here as needed */}
      {/* <Projects/> */}
      {/* <Contact/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
