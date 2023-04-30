import Navbar from './components/navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import HomePage from './pages/homepage'
import UploadPage from './pages/uploadpage'
import LogIn from './pages/login'
import SignUp from './pages/signup'
import DashBoard from './pages/dashboard'
import AboutPage from './pages/about'
import JsonPage from './pages/jsonpage'
import AnnotationPage from './pages/annotation'
import Protected from './components/ProtectedRoute'

export default function App () {
    return (
        <Router>
            {!window.location.pathname.includes( '/dashboard' ) &&
                !window.location.pathname.includes( '/jsonpage' ) &&
                !window.location.pathname.includes( '/annotate' ) && (
                    <Navbar />
                )}

            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/UploadPage" element={<UploadPage />} />
                <Route exact path="/login" element={<LogIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route
                    exact
                    path="/dashboard/*"
                    element={
                        <Protected>
                            <DashBoard />
                        </Protected>
                    }
                />
                <Route exact path="/about" element={<AboutPage />} />
                <Route
                    exact
                    path="/jsonpage/:docType"
                    element={
                        <Protected>
                            <JsonPage />
                        </Protected>
                    }
                />
                <Route
                    exact
                    path="/annotate/:docId"
                    element={
                        <Protected>
                            <AnnotationPage />
                        </Protected>
                    }
                />
            </Routes>

            {!window.location.pathname.includes( '/dashboard' ) &&
                !window.location.pathname.includes( '/jsonpage' ) &&
                !window.location.pathname.includes( '/annotate' ) && (
                    <Footer />
                )}
        </Router>
    )
}
