import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IconButton, TextButton } from './global/Buttons';
import Listing from './components/listing/Listing';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
