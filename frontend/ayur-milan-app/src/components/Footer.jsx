import React, { useState } from "react";
import { Link } from "react-router-dom";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  if (subscribed)
    return (
      <p style={{ color: "#FFE04B", fontWeight: 600, marginTop: "12px", textAlign: "center" }}>
        🎉 Thank you for subscribing!<br />
        <span style={{ fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
          You're now part of the AyurMilan community.
        </span>
      </p>
    );

  return (
    <form className="xb-item--newsletter_form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="submit_btn" type="submit">Submit</button>
    </form>
  );
}

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
            <NewsletterForm />
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.8)",
              }}
              className="footer-dev-credits"
            >
              <span>Developed by</span>
              <a
                href="https://1techveda.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#ffffff",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    border: "2px solid #ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    padding: "4px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="https://1techveda.com/1techveda-logo.webp"
                    alt="1TechVeda Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span
                  style={{ fontWeight: "700", color: "#FFE04B" }}
                  className="dev-name"
                >
                  1TechVeda
                </span>
              </a>
            </div>
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
