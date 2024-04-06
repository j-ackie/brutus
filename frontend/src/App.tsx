import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IconButton, TextButton } from './global/Buttons';
import Listing from './components/Listing/Listing';

const listingProps = {
  user: "JaneDoe42",
  description: "Looking to trade a brand new, unopened set of wireless headphones.",
  have: "Wireless Headphones, Brand New",
  want: "Smart Watch, good condition",
  tags: ["electronics", "trade", "headphones", "smart watch"],
  created_at: new Date().toLocaleDateString(),
  title: "Trade New Headphones for Smart Watch",
  thumbnail_url: "https://example.com/path/to/image.jpg",
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
