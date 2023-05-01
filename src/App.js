import Navbar from './components/navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import { useState, useEffect } from "react"

export default function App () {
    const [pathname, setPathname] = useState( window.location.pathname )
    const location = useLocation()
    useEffect( () => {
        setPathname( location.pathname )
    }, [location.pathname] )

    const showNavbar = !pathname.includes( '/dashboard' ) && !pathname.includes( '/jsonpage' ) && !pathname.includes( '/annotate' )

    return (
        <>
            {showNavbar && (
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

            {showNavbar && (
                <Footer />
            )}
        </>
    )
}
