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


export default function App() {
  return (
   <>
  
   <Navbar />
   <HeroSection/>
   <Footer/>
   </>
  );
}