import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';

const listingProps = {
  user: "JaneDoe42",
  description: "Need 300 level electives",
  have: "PHIL 300",
  want: "CS 310, CS 349, CS 345, CS 343",
  tags: ["CS", "Electives", "300+"],
  created_at: new Date().toLocaleDateString(),
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
