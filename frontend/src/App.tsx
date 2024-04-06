import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import BottomBar from './components/BottomBar/BottomBar';

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
    <div className='flex flex-col h-screen'>
      <BrowserRouter>
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search' element={<Search />}/>
          </Routes>
        </div>
        <BottomBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
