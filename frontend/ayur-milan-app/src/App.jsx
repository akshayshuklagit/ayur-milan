import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import About from "./pages/About";
import Speakers from "./pages/Speakers";
import Abstract from "./pages/Abstract";
import Delegate from "./pages/Delegate";
import Exhibitors from "./pages/Exhibitors";
import Brochure from "./pages/Brochure";
import FloatingButtons from "./components/FloatingButtons";

// Helper component to reset scroll position on page change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Helper to set body class to dark theme 'design-conference' across all routes
function BodyClassToggler() {
  useEffect(() => {
    document.body.className = "design-conference";
  }, []);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BodyClassToggler />

      {/* Universal Dark Header */}
      <Header />

      {/* Pages Routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/team" element={<Team />} />
        <Route path="/abstract" element={<Abstract />} />
        <Route path="/delegate" element={<Delegate />} />
        <Route path="/exhibitors" element={<Exhibitors />} />
        <Route path="/brochure" element={<Brochure />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Universal Dark Footer */}
      <Footer />

      {/* Global Floating Buttons */}
      <FloatingButtons />
    </BrowserRouter>
  );
}

export default App;
