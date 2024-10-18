import './App.css';
import React, { useState } from 'react';
import Editor from './components/Editor';
import Slider from './components/Slider';

function App() {
  const [pantalla, setPantalla] = useState(1);


  const handleEditor = () => {
    setPantalla(2);
  };

  return (
    <>
      {pantalla === 1 &&
        <Slider handleEditor={handleEditor} />}
      {pantalla === 2 &&
        <Editor />}
    </>
  );
}

export default App;
