import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IconButton, TextButton } from './global/Buttons';

function App() {
  return (
    <div className="App">
      <IconButton icon='asdf' color='asdf' onClick={() => {}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </IconButton>
      <TextButton text='hello world' onClick={() => {console.log("hi")}}/>
    </div>
  );
}

export default App;
