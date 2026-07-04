import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/registrations";

export default function Contact() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id || e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/submit-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to submit contact enquiry");
      }

      setSuccessMessage(
        `Thank you, ${formData.name}! Your message has been sent successfully. We will contact you shortly.`,
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setErrorMessage(
        err.message || "Connection error. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="design-conference"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Floating Shapes */}
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ top: "150px", left: "6%", width: "40px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/contact-shape.png"
        className="floating-shape-slow"
        style={{ bottom: "200px", right: "5%", width: "90px", opacity: 0.15 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape"
        style={{ bottom: "150px", left: "8%", width: "30px", opacity: 0.25 }}
        alt=""
      />

      <div className="body_wrap o-clip">
        <main>
          {/* Breadcrumb Start */}
          <section
            className="breadcrumb pos-rel bg_img"
            style={{
              backgroundImage: "url('/assets/img/bg/footer-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "140px 0 120px 0",
              position: "relative",
            }}
          >
            {/* Deep overlay to blend custom vector background with branding */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to bottom, rgba(130, 17, 79, 0.6) 0%, rgba(26, 2, 16, 0.85) 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div
              className="container"
              style={{ position: "relative", zIndex: 2 }}
            >
              <div className="breadcrumb__content text-center">
                <span
                  className="breadcrumb__sub-title"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/assets/img/icon/sub-icon.svg"
                    style={{ width: "15px" }}
                    alt=""
                  />
                  Get Support
                  <img
                    src="/assets/img/icon/sub-icon.svg"
                    style={{ width: "15px" }}
                    alt=""
                  />
                </span>
                <h2
                  className="breadcrumb__title"
                  style={{
                    color: "#fff",
                    fontSize: "clamp(36px, 6vw, 64px)",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginTop: "10px",
                  }}
                >
                  Contact Us
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Contact Cards Row Start */}
          <section className="pt-100 pb-50">
            <div className="container">
              <div className="row mt-none-30">
                {/* Location Card */}
                <div className="col-lg-4 mt-30">
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "20px",
                      padding: "35px 24px",
                      height: "100%",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      transition:
                        "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 224, 75, 0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(255, 224, 75, 0.12)";
                      const iconWrap =
                        e.currentTarget.querySelector(".contact-icon-wrap");
                      if (iconWrap) {
                        iconWrap.style.background = "#FFE04B";
                        iconWrap.style.color = "#1a0210";
                        iconWrap.style.boxShadow =
                          "0 0 15px rgba(255,224,75,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,0.2)";
                      const iconWrap =
                        e.currentTarget.querySelector(".contact-icon-wrap");
                      if (iconWrap) {
                        iconWrap.style.background = "rgba(255, 224, 75, 0.1)";
                        iconWrap.style.color = "#FFE04B";
                        iconWrap.style.boxShadow = "none";
                      }
                    }}
                  >
                    <div
                      className="contact-icon-wrap"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        background: "rgba(255, 224, 75, 0.1)",
                        color: "#FFE04B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginBottom: "20px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: "700",
                      }}
                    >
                      Venue Location
                    </h4>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "14px",
                        lineHeight: "22px",
                        margin: 0,
                      }}
                    >
                      Shri Krishan Janmashtami Ashram,
                      <br /> Opp Akshay Patra, Chattikara, Vrindavan, UP -
                      281121
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="col-lg-4 mt-30">
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "20px",
                      padding: "35px 24px",
                      height: "100%",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      transition:
                        "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 224, 75, 0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(255, 224, 75, 0.12)";
                      const iconWrap =
                        e.currentTarget.querySelector(".contact-icon-wrap");
                      if (iconWrap) {
                        iconWrap.style.background = "#FFE04B";
                        iconWrap.style.color = "#1a0210";
                        iconWrap.style.boxShadow =
                          "0 0 15px rgba(255,224,75,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,0.2)";
                      const iconWrap =
                        e.currentTarget.querySelector(".contact-icon-wrap");
                      if (iconWrap) {
                        iconWrap.style.background = "rgba(255, 224, 75, 0.1)";
                        iconWrap.style.color = "#FFE04B";
                        iconWrap.style.boxShadow = "none";
                      }
                    }}
                  >
                    <div
                      className="contact-icon-wrap"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        background: "rgba(255, 224, 75, 0.1)",
                        color: "#FFE04B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginBottom: "20px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: "700",
                      }}
                    >
                      Helpdesk Numbers
                    </h4>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "14px",
                        lineHeight: "22px",
                        margin: 0,
                      }}
                    >
                      <a
                        href="tel:+916280632669"
                        style={{
                          color: "currentColor",
                          textDecoration: "none",
                        }}
                      >
                        +91 6280632669
                      </a>
                      <br />
                      <a
                        href="tel:+919697970004"
                        style={{
                          color: "currentColor",
                          textDecoration: "none",
                        }}
                      >
                        +91 9697970004
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="col-lg-4 mt-30">
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "20px",
                      padding: "35px 24px",
                      height: "100%",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      transition:
                        "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 224, 75, 0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(255, 224, 75, 0.12)";
                      const iconWrap =
                        e.currentTarget.querySelector(".contact-icon-wrap");
                      if (iconWrap) {
                        iconWrap.style.background = "#FFE04B";
                        iconWrap.style.color = "#1a0210";
                        iconWrap.style.boxShadow =
                          "0 0 15px rgba(255,224,75,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,0.2)";
                      const iconWrap =
                        e.currentTarget.querySelector(".contact-icon-wrap");
                      if (iconWrap) {
                        iconWrap.style.background = "rgba(255, 224, 75, 0.1)";
                        iconWrap.style.color = "#FFE04B";
                        iconWrap.style.boxShadow = "none";
                      }
                    }}
                  >
                    <div
                      className="contact-icon-wrap"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        background: "rgba(255, 224, 75, 0.1)",
                        color: "#FFE04B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginBottom: "20px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: "700",
                      }}
                    >
                      Official Email
                    </h4>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "14px",
                        lineHeight: "22px",
                        margin: 0,
                      }}
                    >
                      <a
                        href="mailto:ayurmilanofficial@gmail.com"
                        style={{
                          color: "currentColor",
                          textDecoration: "none",
                        }}
                      >
                        ayurmilanofficial@gmail.com
                      </a>
                      <br />
                      Support available 24x7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Contact Cards Row End */}

          {/* Contact Main Start */}
          <section className="pb-130">
            <div className="container">
              <div className="row g-4 align-items-stretch">
                <div className="col-lg-8">
                  <div
                    style={{
                      background: "rgba(20, 2, 12, 0.75)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "2px solid #FFE04B",
                      borderRadius: "28px",
                      padding: "clamp(24px, 5vw, 50px) clamp(16px, 4vw, 40px)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
                      height: "100%",
                    }}
                  >
                    <div className="form-heading mb-4">
                      <h3
                        className="title"
                        style={{
                          color: "#fff",
                          fontSize: "28px",
                          fontWeight: "800",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        send us a message
                      </h3>
                      <p
                        className="content"
                        style={{
                          color: "#b9b6d6",
                          fontSize: "15px",
                          lineHeight: "24px",
                        }}
                      >
                        Have questions about registrations, accommodation,
                        stalls booking, or sponsorships? Reach out and our team
                        will get back to you shortly.
                      </p>
                    </div>
                    <form
                      className="xb-contact-input-form"
                      onSubmit={handleSubmit}
                      style={{ margin: 0, padding: 0 }}
                    >
                      <div className="row g-4">
                        <div className="col-lg-6">
                          <div className="xb-input-field">
                            <label
                              htmlFor="name"
                              style={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "8px",
                                display: "block",
                              }}
                            >
                              Your Name*
                            </label>
                            <input
                              id="name"
                              type="text"
                              placeholder="e.g. Rahul Sharma"
                              value={formData.name}
                              onChange={handleChange}
                              style={{
                                width: "100%",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "12px",
                                color: "#fff",
                                padding: "14px 18px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#FFE04B";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.08)";
                                e.target.style.boxShadow =
                                  "0 0 12px rgba(255, 224, 75, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(255, 255, 255, 0.15)";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.05)";
                                e.target.style.boxShadow = "none";
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="xb-input-field">
                            <label
                              htmlFor="email"
                              style={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "8px",
                                display: "block",
                              }}
                            >
                              Email Address*
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="e.g. rahul@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              style={{
                                width: "100%",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "12px",
                                color: "#fff",
                                padding: "14px 18px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#FFE04B";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.08)";
                                e.target.style.boxShadow =
                                  "0 0 12px rgba(255, 224, 75, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(255, 255, 255, 0.15)";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.05)";
                                e.target.style.boxShadow = "none";
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="xb-input-field xb-text-field">
                            <label
                              htmlFor="phone"
                              style={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "8px",
                                display: "block",
                              }}
                            >
                              Your Phone*
                            </label>
                            <input
                              id="phone"
                              type="text"
                              placeholder="e.g. +91 98765 43210"
                              value={formData.phone}
                              onChange={handleChange}
                              style={{
                                width: "100%",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "12px",
                                color: "#fff",
                                padding: "14px 18px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#FFE04B";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.08)";
                                e.target.style.boxShadow =
                                  "0 0 12px rgba(255, 224, 75, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(255, 255, 255, 0.15)";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.05)";
                                e.target.style.boxShadow = "none";
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="xb-input-field xb-text-field">
                            <label
                              htmlFor="message"
                              style={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "8px",
                                display: "block",
                              }}
                            >
                              Message
                            </label>
                            <textarea
                              name="message"
                              id="message"
                              placeholder="How can we help you? Ask about passes, accommodation, exhibition stalls, or sponsorships..."
                              value={formData.message}
                              onChange={handleChange}
                              style={{
                                width: "100%",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1.5px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "12px",
                                color: "#fff",
                                padding: "14px 18px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                minHeight: "140px",
                                resize: "vertical",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#FFE04B";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.08)";
                                e.target.style.boxShadow =
                                  "0 0 12px rgba(255, 224, 75, 0.15)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(255, 255, 255, 0.15)";
                                e.target.style.background =
                                  "rgba(255, 255, 255, 0.05)";
                                e.target.style.boxShadow = "none";
                              }}
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {errorMessage && (
                        <div
                          style={{
                            color: "#ff6b6b",
                            background: "rgba(255,107,107,0.1)",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            margin: "15px 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          ⚠️ {errorMessage}
                        </div>
                      )}
                      {successMessage && (
                        <div
                          style={{
                            color: "#2ecc71",
                            background: "rgba(46,204,113,0.1)",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            margin: "15px 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          ✓ {successMessage}
                        </div>
                      )}
                      <div className="form-submit-btn mt-25">
                        <button
                          type="submit"
                          className="thm-btn xb-ticket-btn"
                          disabled={loading}
                          style={{ border: "none" }}
                        >
                          {loading ? "sending..." : "send message"}
                          <span className="xb-icon">
                            <img src="/assets/img/icon/arrow-icon.svg" alt="" />
                            <img src="/assets/img/icon/arrow-icon.svg" alt="" />
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div
                    className="google-map"
                    style={{
                      height: "100%",
                      minHeight: "400px",
                      borderRadius: "28px",
                      overflow: "hidden",
                      border: "2px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
                      marginLeft: "0px",
                      margin: "0px",
                    }}
                  >
                    <iframe
                      title="Google Map Venue"
                      src="https://maps.google.com/maps?q=Shri%20Krishan%20Janmashtami%20Ashram%20Vrindavan%20Opp%20Akshay%20Patra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      style={{
                        border: 0,
                        width: "100%",
                        height: "100%",
                        minHeight: "380px",
                      }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Contact Main End */}

          {/* CTA Section Start */}
          <section
            className="cta pt-100 pb-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(130,17,79,0.6) 0%, rgba(26,2,16,0.85) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="container">
              <div className="row mt-none-50 align-items-center">
                <div className="col-lg-4 order-lg-first mt-50">
                  <div className="xb-cta-title">
                    <div className="sec-title sec-title--white">
                      <span className="sub-title">ensure your seat</span>
                      <h2 className="title">Reserve Your Seat Today!</h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 order-lg-last mt-50">
                  <div className="xb-about-top-content cta-top-content">
                    <h4
                      className="title"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="/assets/img/icon/check-yellow-icon.svg"
                        style={{ width: "18px" }}
                        alt=""
                      />
                      Hands-on Trainings & Practical Exposure
                    </h4>
                    <p className="content" style={{ color: "#b9b6d6" }}>
                      Experience 18+ exclusive workshops under one roof
                      including Marma Therapy, Netra Tarpana, and medicine
                      preparations. Limited seats available on a first-come,
                      first-serve basis.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mt-50">
                  <div className="cta-btn text-center">
                    <Link
                      to="/delegate"
                      className="forum-circle-btn xb-element-parallax"
                    >
                      <p style={{ color: "rgba(255,255,255,0.8)" }}>
                        Secure your seat today, starting at
                      </p>
                      <span
                        className="dollar"
                        style={{ fontSize: "38px", color: "#FFE04B" }}
                      >
                        1599/-
                      </span>
                      <span className="arrow">
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4996 2.03657C24.5198 1.20839 23.8648 0.520645 23.0366 0.500446L9.54059 0.171275C8.71241 0.151076 8.00446 1.63426C7.98426 2.46244 8.63926 3.15018 9.46744 3.17038L21.4639 3.46298L21.1713 15.4594C21.1511 16.2876 21.8061 16.9753 22.6343 16.9955C23.4624 17.0157 24.1502 16.3607 24.1704 15.5326L24.4996 2.03657ZM3.03448 23.0862L24.0345 3.08621L21.9655 0.913793L0.965517 20.9138L3.03448 23.0862ZM3.03448 23.0862L24.0345 3.08621L21.9655 0.913793L0.965517 20.9138L3.03448 23.0862Z"
                            fill="#FFE04B"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* CTA Section End */}
        </main>
      </div>
    </div>
  );
}
