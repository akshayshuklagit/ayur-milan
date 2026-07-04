import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [mobileMenuActive] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [sticky, setSticky] = useState(false);
  const location = useLocation();

  // Listen for scroll to toggle sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileActive(false);
  }, [location]);

  // Handle active class helper
  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <header
        id="xb-header-area"
        className={`header-area header-style header-style--two header-transparent ${
          sticky ? "stricky-fixed" : ""
        }`}
      >
        <div className="xb-header stricky">
          <div className="container">
            <div className="header__wrap ul_li_between">
              <div className="xb-header-logo">
                <Link to="/" className="logo1">
                  <img
                    src="/ayurmilan-logo1.png"
                    alt="AyurMilan Logo"
                  />
                </Link>
              </div>
              <div className="main-menu__wrap navbar navbar-expand-lg p-0">
                <nav className="main-menu collapse navbar-collapse">
                  <ul>
                    <li className={getLinkClass("/")}>
                      <Link to="/">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#!" onClick={(e) => e.preventDefault()}>
                        <span>About</span>
                      </a>
                      <ul className="submenu">
                        <li>
                          <Link to="/about">About Us & Venue</Link>
                        </li>
                        <li>
                          <Link to="/team">Organizing Team</Link>
                        </li>
                      </ul>
                    </li>
                    <li className={getLinkClass("/brochure")}>
                      <Link to="/brochure">
                        <span>Brochure</span>
                      </Link>
                    </li>
                    <li className={getLinkClass("/speakers")}>
                      <Link to="/speakers">
                        <span>Speakers</span>
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#!" onClick={(e) => e.preventDefault()}>
                        <span>Scientifics</span>
                      </a>
                      <ul className="submenu">
                        <li>
                          <Link to="/abstract">Abstract Submission</Link>
                        </li>
                      </ul>
                    </li>
                    <li className={getLinkClass("/delegate")}>
                      <Link to="/delegate">
                        <span>Register</span>
                      </Link>
                    </li>
                    <li className={getLinkClass("/exhibitors")}>
                      <Link to="/exhibitors">
                        <span>Exhibitors</span>
                      </Link>
                    </li>
                    <li className={getLinkClass("/contact")}>
                      <Link to="/contact">
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="header-bar-mobile side-menu d-lg-none">
                <a
                  className="xb-nav-mobile"
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileActive(!mobileActive);
                  }}
                >
                  <i className="far fa-bars"></i>
                </a>
              </div>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`xb-header-wrap ${mobileActive ? "active" : ""}`}>
              <div className={`xb-header-menu ${mobileActive ? "active" : ""}`}>
                <div className="xb-header-menu-scroll">
                  <div
                    className="xb-menu-close xb-hide-xl xb-close"
                    onClick={() => setMobileActive(false)}
                  ></div>
                  <div className="xb-logo-mobile xb-hide-xl">
                    <Link to="/" onClick={() => setMobileActive(false)}>
                      <img
                        src="/assets/img/logo/logo-two.svg"
                        alt="AyurMilan Logo"
                      />
                    </Link>
                  </div>
                  <nav className="xb-header-nav">
                    <ul className="xb-menu-primary clearfix">
                      <li>
                        <Link to="/" onClick={() => setMobileActive(false)}>
                          <span>Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>About Us & Venue</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/team" onClick={() => setMobileActive(false)}>
                          <span>Organizing Team</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/brochure"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>Interactive Brochure</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/speakers"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>Speakers Profiles</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/abstract"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>Abstract Submission</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/delegate"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>Register / Delegate Info</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/exhibitors"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>Exhibitors Expo</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          onClick={() => setMobileActive(false)}
                        >
                          <span>Contact</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div
                className="xb-header-menu-backdrop"
                onClick={() => setMobileActive(false)}
              ></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
