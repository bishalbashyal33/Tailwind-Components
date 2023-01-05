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
import UploadPage from "./pages/uploadpage";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";


export default function App() {
  return (
   <>
   <Router>
   <Navbar />
  
   <Routes>
   <Route exact path="/" element={<HomePage />} />
   <Route exact path="/UploadPage" element={<UploadPage />} />
   <Route exact path="/login" element={<LogIn />} />
   <Route exact path="/signup" element={<SignUp />} />
   </Routes>
   
   <Footer/>
   </Router>
   </>
  );
}