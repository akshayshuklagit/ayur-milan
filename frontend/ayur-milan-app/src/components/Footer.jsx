import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="footer footer-style-two pt-140 bg_img"
      style={{ backgroundImage: "url('/assets/img/bg/footer-bg.jpg')" }}
    >
      <div className="container">
        <div className="xb-footer-wrap ul_li_between align-items-start">
          <div className="xb-footer_widget mt-30">
            <h3 className="xb-widget-title">Quick Links</h3>
            <ul
              className="xb-list list-unstyled"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 40px",
              }}
            >
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/speakers">Speakers</Link>
              </li>
              <li>
                <Link to="/abstract">Abstracts</Link>
              </li>
              <li>
                <Link to="/exhibitors">Exhibitors</Link>
              </li>
              <li>
                <Link to="/delegate">Delegates</Link>
              </li>
              <li>
                <Link to="/delegate">Registration</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/team">Committee</Link>
              </li>
              <li>
                <Link to="/brochure">Brochure</Link>
              </li>
            </ul>
          </div>
          <div className="xb-newsletter mt-30">
            <div
              className="xb-item--logo"
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  borderRadius: "50%",
                  width: "130px",
                  height: "130px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  padding: "16px",
                }}
              >
                <img
                  src="/ayurmilan-logo1.png"
                  alt="AyurMilan Logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <p className="xb-item--title">Subscribe to our newsletter</p>
            <form
              className="xb-item--newsletter_form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" placeholder="Enter your email" required />
              <button className="submit_btn" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="xb-footer_info mt-30">
            <h3 className="xb-widget-title">Get in touch</h3>
            <ul className="xb-contact list-unstyled">
              <li>
                <img src="/assets/img/icon/location-icon03.svg" alt="" />
                Shri Krishan Janmashtami Ashram,
                <br /> Vrindavan, Uttar Pradesh, India
              </li>
              <li>
                <img src="/assets/img/icon/call-icon03.svg" alt="" />
                <a href="tel:+916280632669">+91 6280632669 ,</a>
                <a href="tel:+919501400650"> +91 9501400650</a>
              </li>

              <li>
                <img src="/assets/img/icon/sms-icon02.svg" alt="" />
                <a href="mailto:ayurmilanofficial@gmail.com">
                  ayurmilanofficial@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="xb-footer_bottom">
        <div className="container">
          <div className="xb-footer-bottom-inner ul_li_between">
            <p>
              Copyright © 2026 <Link to="/">AYURMILAN,</Link> All rights
              reserved.
            </p>
            <div className="xb-social_media">
              <ul className="social-link list-unstyled ul_li">
                <li>Follow us :</li>
                <li>
                  <a
                    href="https://www.instagram.com/ayur.milan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#!" onClick={(e) => e.preventDefault()}>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#!" onClick={(e) => e.preventDefault()}>
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
