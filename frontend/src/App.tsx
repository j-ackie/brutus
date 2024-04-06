import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IconButton, TextButton } from './global/Buttons';
import Listing from './components/Listing/Listing';

const listingProps = {
  user: "JaneDoe42",
  description: "Need 300 level electives",
  have: "PHIL 300",
  want: "CS 310, CS 349, CS 345, CS 343",
  tags: ["CS", "Electives", "300+"],
  created_at: new Date().toLocaleDateString(),
};

function App() {
  return (
    <div className="App">
      <IconButton icon='asdf' color='asdf' onClick={() => {}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </IconButton>
      <TextButton text='hello world' onClick={() => {console.log("hi")}}/>
      <Listing {...listingProps}/>
    </div>
  );
}

export default App;
