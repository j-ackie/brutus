import "./App.css";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import BottomBar from "./components/BottomBar/BottomBar";
import CreateListing from "./pages/create/Create";
import Inbox from "./pages/inbox/Inbox";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/login/Login";
import Landing from "./pages/landing/Landing";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <BrowserRouter>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/inbox" element={<Inbox />} />
            </Routes>
          </div>
          <BottomBar />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
