import MyButton from "./components/button";
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Footer from "./components/footer";
import HomePage from "./pages/homepage";


export default function App() {
  return (
   <>
   <Router>
   <Navbar />
  
   <Routes>
   <Route exact path="/" element={<HomePage />} />
   </Routes>
   
   <Footer/>
   </Router>
   </>
  );
}