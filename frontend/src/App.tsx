import React from 'react';
import logo from './logo.svg';
import './App.css';
import Listing from './components/listing/Listing';


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
      <Listing {...listingProps}></Listing>
    </div>
  );
}

export default App;
