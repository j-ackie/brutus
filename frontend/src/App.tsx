import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import BottomBar from './components/BottomBar/BottomBar';
import CreateListing from './pages/create/Create';
function App() {
  return (
    <div className='flex flex-col h-screen'>
      <BrowserRouter>
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search' element={<Search />}/>
            <Route path="/create-listing" element={<CreateListing />} />  
          </Routes>
        </div>
        <BottomBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
