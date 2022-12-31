import MyButton from "./components/button";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
       <Navbar/>
      
       <Routes>
     
       {/* <Route path='/get-started' element={<GetStarted/>} />
       <Route path='/upload-page' element={<UploadPageSection/>} />
       <Route path='/' element={<Home/>} />
       <Route path='/extraction-status' element={<ExtractionStatus/>} />
       <Route path='/signup-page' element={<SignupPageSection/>} />
       <Route path='/login-page' element={<LoginPageSection/>} /> */}

            
       </Routes>
      </Router>
     </>
  );
}