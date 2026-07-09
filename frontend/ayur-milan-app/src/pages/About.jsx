import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  return (
    <div
      className="design-conference"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Floating Shapes */}
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ top: "150px", left: "10%", width: "40px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape-slow"
        style={{ top: "400px", right: "8%", width: "35px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cup-shape01.png"
        className="floating-shape"
        style={{ bottom: "300px", left: "5%", width: "50px", opacity: 0.25 }}
        alt=""
      />
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape-slow"
        style={{ bottom: "100px", right: "12%", width: "35px", opacity: 0.2 }}
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
                  About the Summit
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
                  About Us &amp; Venue
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Visual Showcase Start */}
          <section className="pt-100 pb-100 pos-rel">
            {/* Floating background vector lines */}
            <svg
              style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                zIndex: 0,
                width: "100px",
                height: "100px",
                opacity: 0.15,
              }}
              fill="none"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#FFE04B"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>
            <svg
              style={{
                position: "absolute",
                bottom: "10%",
                right: "5%",
                zIndex: 0,
                width: "120px",
                height: "120px",
                opacity: 0.15,
              }}
              fill="none"
              viewBox="0 0 120 120"
            >
              <path
                d="M10 60 Q 30 10, 60 60 T 110 60"
                stroke="#FFE04B"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <div
              className="container"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="sec-title text-center mb-60">
                <span
                  className="sub-title"
                  style={{
                    color: "#FFE04B",
                    fontSize: "15px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  SUMMIT INCLUSIONS
                </span>
                <h2
                  className="title"
                  style={{
                    color: "#fff",
                    fontSize: "42px",
                    fontWeight: "bold",
                  }}
                >
                  Highlights & Inclusions
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    maxWidth: "700px",
                    margin: "15px auto 0",
                    fontSize: "16px",
                    lineHeight: "26px",
                  }}
                >
                  A comprehensive breakdown of clinical workshops, academic
                  platforms, and professional networking inclusions for
                  AyurMilan 2026.
                </p>
              </div>

              <div className="row g-4 justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      padding: "30px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                      borderRadius: "20px",
                      height: "100%",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,224,75,0.4)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(255,224,75,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px 0 rgba(0, 0, 0, 0.15)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "25px",
                      }}
                    >
                      <div
                        style={{
                          width: "54px",
                          height: "54px",
                          borderRadius: "16px",
                          background: "rgba(255,224,75,0.1)",
                          border: "1px solid rgba(255,224,75,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFE04B",
                          fontSize: "22px",
                        }}
                      >
                        <i className="fa-solid fa-graduation-cap"></i>
                      </div>
                      <span
                        style={{
                          background: "rgba(255,224,75,0.15)",
                          color: "#FFE04B",
                          fontSize: "11px",
                          fontWeight: "800",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Academic
                      </span>
                    </div>

                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "22px",
                        marginBottom: "15px",
                        fontWeight: "700",
                      }}
                    >
                      Academic Excellence
                    </h4>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "15px",
                        marginBottom: "25px",
                        lineHeight: "24px",
                      }}
                    >
                      Engage in deep clinical discussions, panel reviews, and
                      academic papers presented by leading gurus in the field of
                      Ayurveda.
                    </p>

                    <ul
                      className="list-unstyled"
                      style={{ margin: 0, padding: 0 }}
                    >
                      {[
                        "70+ Expert National Speakers",
                        "Clinical Case Paper Reviews",
                        "Direct Q&A with RAV Gurus",
                        "Research Poster Presentations",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "12px",
                            color: "#e2e0ff",
                            fontSize: "14px",
                          }}
                        >
                          <span
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: "rgba(255,224,75,0.1)",
                              color: "#FFE04B",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "9px",
                              flexShrink: 0,
                            }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      padding: "30px",
                      border: "1px solid rgba(255,224,75,0.25)",
                      background:
                        "linear-gradient(135deg, rgba(255, 224, 75, 0.05) 0%, rgba(255, 224, 75, 0.01) 100%)",
                      borderRadius: "20px",
                      height: "100%",
                      transition: "all 0.3s ease",
                      boxShadow: "0 12px 40px rgba(255,224,75,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,224,75,0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 45px rgba(255,224,75,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255,224,75,0.25)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 40px rgba(255,224,75,0.06)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "25px",
                      }}
                    >
                      <div
                        style={{
                          width: "54px",
                          height: "54px",
                          borderRadius: "16px",
                          background: "rgba(255,224,75,0.2)",
                          border: "1px solid rgba(255,224,75,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFE04B",
                          fontSize: "22px",
                        }}
                      >
                        <i className="fa-solid fa-mortar-pestle"></i>
                      </div>
                      <span
                        style={{
                          background: "#FFE04B",
                          color: "#82114F",
                          fontSize: "11px",
                          fontWeight: "800",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          boxShadow: "0 4px 10px rgba(255,224,75,0.2)",
                        }}
                      >
                        Practical
                      </span>
                    </div>

                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "22px",
                        marginBottom: "15px",
                        fontWeight: "700",
                      }}
                    >
                      Clinical Workshops
                    </h4>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "15px",
                        marginBottom: "25px",
                        lineHeight: "24px",
                      }}
                    >
                      Acquire hands-on training and clinical experience during
                      live procedures guided by eminent classical practitioners.
                    </p>

                    <ul
                      className="list-unstyled"
                      style={{ margin: 0, padding: 0 }}
                    >
                      {[
                        "Live Agnikarma Demonstrations",
                        "Marma Chikitsa Practice Drills",
                        "Ayurvedic Formulation Labs",
                        "Clinical Completion Certificates",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "12px",
                            color: "#e2e0ff",
                            fontSize: "14px",
                          }}
                        >
                          <span
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: "rgba(255,224,75,0.2)",
                              color: "#FFE04B",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "9px",
                              flexShrink: 0,
                            }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      padding: "30px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                      borderRadius: "20px",
                      height: "100%",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,224,75,0.4)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(255,224,75,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px 0 rgba(0, 0, 0, 0.15)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "25px",
                      }}
                    >
                      <div
                        style={{
                          width: "54px",
                          height: "54px",
                          borderRadius: "16px",
                          background: "rgba(255,224,75,0.1)",
                          border: "1px solid rgba(255,224,75,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFE04B",
                          fontSize: "22px",
                        }}
                      >
                        <i className="fa-solid fa-cubes"></i>
                      </div>
                      <span
                        style={{
                          background: "rgba(255,224,75,0.15)",
                          color: "#FFE04B",
                          fontSize: "11px",
                          fontWeight: "800",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Networking
                      </span>
                    </div>

                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "22px",
                        marginBottom: "15px",
                        fontWeight: "700",
                      }}
                    >
                      Exhibitions & B2B
                    </h4>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "15px",
                        marginBottom: "25px",
                        lineHeight: "24px",
                      }}
                    >
                      Connect with major Ayurveda brands and research hubs in
                      India to expand your clinical practice or business
                      network.
                    </p>

                    <ul
                      className="list-unstyled"
                      style={{ margin: 0, padding: 0 }}
                    >
                      {[
                        "100+ Leading Wellness Brands",
                        "Live Medicine Formulations Expo",
                        "B2B Distributorship Portals",
                        "Complimentary Clinical Samples",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "12px",
                            color: "#e2e0ff",
                            fontSize: "14px",
                          }}
                        >
                          <span
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: "rgba(255,224,75,0.1)",
                              color: "#FFE04B",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "9px",
                              flexShrink: 0,
                            }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Visual Showcase End */}

          {/* About Agnivesh Events Start */}
          <section className="pt-100 pb-120 pos-rel">
            {/* Background glowing gradients */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                right: "5%",
                width: "300px",
                height: "300px",
                background:
                  "radial-gradient(circle, rgba(165,7,102,0.3) 0%, rgba(165,7,102,0) 75%)",
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "5%",
                width: "250px",
                height: "250px",
                background:
                  "radial-gradient(circle, rgba(255,224,75,0.1) 0%, rgba(255,224,75,0) 70%)",
                filter: "blur(30px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            ></div>

            <div
              className="container"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="row align-items-center g-5">
                {/* Left Column: Copy & Stats */}
                <div className="col-lg-6">
                  <div className="sec-title mb-40">
                    <span
                      className="sub-title"
                      style={{
                        color: "#FFE04B",
                        fontSize: "15px",
                        fontWeight: "700",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      THE ORGANIZER
                    </span>
                    <h2
                      className="title"
                      style={{
                        color: "#fff",
                        fontSize: "42px",
                        fontWeight: "800",
                        marginBottom: "20px",
                        lineHeight: "1.2",
                      }}
                    >
                      Agnivesh Events
                    </h2>
                    <p
                      style={{
                        color: "#e2e0ff",
                        fontSize: "17px",
                        lineHeight: "28px",
                        marginBottom: "15px",
                      }}
                    >
                      Agnivesh Events is a premier academic organization
                      dedicated to conducting high-impact Ayurveda seminars,
                      practical workshops, and brand exhibitions across India.
                    </p>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "16px",
                        lineHeight: "26px",
                      }}
                    >
                      We bridge the gap between classroom theory and real-world
                      clinical practice, providing BAMS students, practitioners,
                      and leading healthcare brands with an integrated platform
                      for continuous learning, professional exposure, and
                      network expansion.
                    </p>
                  </div>

                  {/* Glassmorphic Stats Grid */}
                  <div className="row g-3">
                    {[
                      {
                        value: "1.3M+",
                        label: "Monthly Active Reach",
                        desc: "BAMS community online",
                        icon: "fa-globe",
                        color: "#ff7eb9",
                      },
                      {
                        value: "60K+",
                        label: "Instagram Scholars",
                        desc: "Active student network",
                        icon: "fa-instagram",
                        color: "#FFE04B",
                      },
                      {
                        value: "70+",
                        label: "Expert Mentors",
                        desc: "Renowned RAV Gurus",
                        icon: "fa-chalkboard-user",
                        color: "#7afcff",
                      },
                      {
                        value: "100+",
                        label: "Partner Brands",
                        desc: "Exposition exhibitors",
                        icon: "fa-handshake",
                        color: "#c4ff7a",
                      },
                    ].map((stat, idx) => (
                      <div key={idx} className="col-sm-6">
                        <div
                          className="about-stat-card"
                          style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            padding: "15px 20px",
                            transition: "all 0.3s ease",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-3px)";
                            e.currentTarget.style.borderColor =
                              "rgba(255,224,75,0.4)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 20px rgba(255,224,75,0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.1)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 15px rgba(0,0,0,0.1)";
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginBottom: "5px",
                            }}
                          >
                            <i
                              className={`fa-solid ${stat.icon}`}
                              style={{ color: stat.color, fontSize: "16px" }}
                            ></i>
                            <span
                              className="about-stat-value"
                              style={{
                                fontSize: "24px",
                                fontWeight: "800",
                                color: "#fff",
                              }}
                            >
                              {stat.value}
                            </span>
                          </div>
                          <div
                            className="about-stat-label"
                            style={{
                              fontSize: "13px",
                              fontWeight: "700",
                              color: "#FFE04B",
                            }}
                          >
                            {stat.label}
                          </div>
                          <div 
                            className="about-stat-desc"
                            style={{ fontSize: "11px", color: "#b9b6d6" }}
                          >
                            {stat.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Stacked Image Composition */}
                <div className="col-lg-6 mt-5 mt-lg-0 d-flex justify-content-center align-items-center">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "480px",
                      height: "420px",
                      margin: "20px 0",
                    }}
                  >
                    {/* SVG Dot Grid Background */}
                    <svg
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-15px",
                        zIndex: 0,
                        opacity: 0.25,
                        width: "160px",
                        height: "160px",
                      }}
                      fill="none"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <pattern
                          id="gridDots"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle cx="2" cy="2" r="2" fill="#FFE04B" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#gridDots)" />
                    </svg>

                    {/* SVG Circular Vector Aura */}
                    <svg
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        left: "-30px",
                        zIndex: 0,
                        width: "220px",
                        height: "220px",
                        opacity: 0.15,
                      }}
                      viewBox="0 0 200 200"
                      fill="none"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#fff"
                        strokeWidth="1"
                        strokeDasharray="10 15"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="50"
                        stroke="#FFE04B"
                        strokeWidth="2"
                        strokeDasharray="4 8"
                      />
                    </svg>

                    {/* Stacked Image 1: Brochure scan (Background layer) */}
                    <div
                      style={{
                        position: "absolute",
                        width: "65%",
                        height: "auto",
                        bottom: "40px",
                        left: "20px",
                        zIndex: 1,
                        transform: "rotate(-6deg) skewY(-2deg)",
                        transition: "all 0.4s ease",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                      className="stacked-img-bg"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(-2deg) scale(1.05) translate(-10px, -10px)";
                        e.currentTarget.style.zIndex = "3";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(-6deg) skewY(-2deg)";
                        e.currentTarget.style.zIndex = "1";
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(0,0,0,0.4)",
                          padding: "5px 12px",
                          fontSize: "11px",
                          color: "#FFE04B",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <span>AyurMilan Summit</span>
                        <i className="fa-solid fa-users"></i>
                      </div>
                      <img
                        src="/assets/img/about/delegate_gathering.png"
                        alt="AyurMilan Conference Gathering"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </div>

                    {/* Stacked Image 2: Team photograph (Foreground layer) */}
                    <div
                      style={{
                        position: "absolute",
                        width: "78%",
                        height: "auto",
                        top: "20px",
                        right: "10px",
                        zIndex: 2,
                        transform: "rotate(3deg) skewY(1deg)",
                        transition: "all 0.4s ease",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 20px 45px rgba(255, 224, 75, 0.2)",
                        border: "3px solid #FFE04B",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                      }}
                      className="stacked-img-fg"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(0deg) scale(1.03)";
                        e.currentTarget.style.boxShadow =
                          "0 25px 50px rgba(255, 224, 75, 0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(3deg) skewY(1deg)";
                        e.currentTarget.style.boxShadow =
                          "0 20px 45px rgba(255, 224, 75, 0.2)";
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(0,0,0,0.6)",
                          padding: "8px 16px",
                          fontSize: "13px",
                          color: "#FFE04B",
                          fontWeight: "bold",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "2px solid #FFE04B",
                        }}
                      >
                        <span>Meet Our Organizing Team</span>
                        <span
                          style={{
                            background: "#FFE04B",
                            color: "#82114F",
                            fontSize: "10px",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            textTransform: "uppercase",
                          }}
                        >
                          Executive
                        </span>
                      </div>
                      <img
                        src="/assets/img/about/agnivesh_events_team.png"
                        alt="Agnivesh Events Organizing Committee"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* About Agnivesh Events End */}

          {/* Visual History Timeline Start */}
          <section className="pb-120 pos-rel">
            {/* Ambient gold glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "450px",
                height: "450px",
                background:
                  "radial-gradient(circle, rgba(255, 224, 75, 0.08) 0%, rgba(130, 17, 79, 0) 70%)",
                filter: "blur(50px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            ></div>

            <div
              className="container"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="sec-title text-center mb-60">
                <span
                  className="sub-title"
                  style={{
                    color: "#FFE04B",
                    fontSize: "15px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  MILESTONES & JOURNEY
                </span>
                <h2
                  className="title"
                  style={{
                    color: "#fff",
                    fontSize: "42px",
                    fontWeight: "bold",
                  }}
                >
                  Agnivesh Events Timeline
                </h2>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div
                    className="timeline-box"
                    style={{
                      position: "relative",
                      padding: "30px 20px",
                      borderRadius: "24px",
                    }}
                  >
                    {/* SVG Curved Timeline Line */}
                    <div
                      style={{
                        position: "absolute",
                        left: "45px",
                        top: "40px",
                        bottom: "40px",
                        width: "4px",
                        zIndex: 0,
                        background:
                          "linear-gradient(to bottom, #FFE04B 0%, #A50766 50%, #FFE04B 100%)",
                        borderRadius: "2px",
                        opacity: 0.8,
                      }}
                    ></div>

                    <div style={{ position: "relative", zIndex: 1 }}>
                      {[
                        {
                          year: "2023",
                          stage: "Core Ideation",
                          title: "Foundation of Agnivesh Events",
                          desc: "Started with a vision to revolutionize classical BAMS educational meetups by introducing clinical hands-on models and RAV Guru interactions.",
                          icon: "fa-lightbulb",
                          color: "#ffb300",
                        },
                        {
                          year: "2024",
                          stage: "Growth & Digital Outreach",
                          title: "Digital Base Expansion",
                          desc: "Reached a niche audience of 60,000+ followers on Instagram and over 1.3 million monthly active BAMS students and practitioners online.",
                          icon: "fa-chart-line",
                          color: "#00e676",
                        },
                        {
                          year: "2025",
                          stage: "National Assembly",
                          title: "Launching Flagship Event: AyurMilan",
                          desc: "Gathered over 5,000 delegates on-ground across key academic panels and medicine preparation workshops.",
                          icon: "fa-users",
                          color: "#29b6f6",
                        },
                        {
                          year: "2026",
                          stage: "Emerging Platform",
                          title: "AyurMilan 2026 - Vrindavan Assembly",
                          desc: "Bringing 70+ Speakers, 4000+ Delegates, and 100+ Brands under a single massive expo pavilion in Vrindavan.",
                          icon: "fa-gopuram",
                          color: "#FFE04B",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            marginBottom: index === 3 ? "0" : "40px",
                            position: "relative",
                          }}
                        >
                          {/* Pulsing indicator node */}
                          <div
                            style={{
                              width: "54px",
                              height: "54px",
                              borderRadius: "50%",
                              background: "#1F0419",
                              border: `3px solid ${item.color}`,
                              boxShadow: `0 0 15px ${item.color}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 2,
                              position: "absolute",
                              left: "20px",
                              top: "5px",
                            }}
                          >
                            <i
                              className={`fa-solid ${item.icon}`}
                              style={{ color: item.color, fontSize: "18px" }}
                            ></i>
                          </div>

                          {/* Details Content */}
                          <div
                            style={{
                              marginLeft: "95px",
                              width: "calc(100% - 95px)",
                            }}
                          >
                            <div
                              className="timeline-card"
                              style={{
                                borderRadius: "16px",
                                padding: "24px 30px",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateX(8px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "10px",
                                  marginBottom: "8px",
                                }}
                              >
                                <span
                                  style={{
                                    background: `linear-gradient(135deg, ${item.color} 0%, #D78633 100%)`,
                                    color: "#000",
                                    fontSize: "13px",
                                    fontWeight: "800",
                                    padding: "4px 14px",
                                    borderRadius: "20px",
                                    textTransform: "uppercase",
                                    boxShadow: `0 3px 8px rgba(0,0,0,0.2)`,
                                  }}
                                >
                                  {item.year} — {item.stage}
                                </span>
                              </div>
                              <h4
                                className="timeline-card-title"
                                style={{
                                  fontSize: "20px",
                                  marginBottom: "10px",
                                  fontWeight: "700",
                                }}
                              >
                                {item.title}
                              </h4>
                              <p
                                className="timeline-card-desc"
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "25px",
                                  margin: 0,
                                }}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Visual History Timeline End */}

          {/* About the Venue Start */}
          <section className="pb-130 pos-rel">
            {/* Background vector elements - Mandala or spiritual wave outlines */}
            <div
              style={{
                position: "absolute",
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "600px",
                height: "600px",
                opacity: 0.04,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              {/* Elegant Mandala Vector */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="#FFE04B"
                strokeWidth="0.5"
              >
                <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="35" />
                <circle cx="50" cy="50" r="25" strokeDasharray="4 2" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 50 + 25 * Math.cos(angle);
                  const y1 = 50 + 25 * Math.sin(angle);
                  const x2 = 50 + 45 * Math.cos(angle);
                  const y2 = 50 + 45 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x = 50 + 35 * Math.cos(angle);
                  const y = 50 + 35 * Math.sin(angle);
                  return <circle key={i} cx={x} cy={y} r="2" fill="#FFE04B" />;
                })}
              </svg>
            </div>

            <div
              className="container"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="sec-title text-center mb-60">
                <span
                  className="sub-title"
                  style={{
                    color: "#FFE04B",
                    fontSize: "15px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  ACCOMMODATION & VENUE
                </span>
                <h2
                  className="title"
                  style={{
                    color: "#fff",
                    fontSize: "42px",
                    fontWeight: "bold",
                  }}
                >
                  Shri Krishan Janmashtami Ashram, Vrindavan
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    maxWidth: "800px",
                    margin: "15px auto 0",
                    fontSize: "16px",
                    lineHeight: "26px",
                  }}
                >
                  Enjoy a peaceful, spiritual, and distraction-free learning
                  environment surrounded by the divine atmosphere of Vrindavan,
                  Uttar Pradesh.
                </p>
              </div>

              {/* Venue Location Map */}
              <div className="row g-3 mb-50">
                {/* Google Maps embed */}
                <div className="col-12">
                  <div
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        zIndex: 10,
                        background: "rgba(20,0,15,0.85)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,224,75,0.3)",
                        borderRadius: "10px",
                        padding: "8px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <i
                        className="fa-solid fa-map-location-dot"
                        style={{ color: "#FFE04B", fontSize: "16px" }}
                      ></i>
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        Shri Krishan Janmashtami Ashram, Vrindavan
                      </span>
                    </div>
                    <iframe
                      title="Venue Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.123456789!2d77.6499!3d27.5744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397377b9e0f0b0b1%3A0x1234567890abcdef!2sShri%20Krishna%20Janmashtami%20Ashram!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="280"
                      style={{
                        border: 0,
                        display: "block",
                        filter: "invert(90%) hue-rotate(180deg)",
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
              {/* Venue Photo Showcase End */}

              <div className="row g-4 mt-none-30">
                {/* Venue Highlights */}
                <div className="col-lg-6 mt-30">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      height: "100%",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "35px 30px",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <h3
                      style={{
                        color: "#FFE04B",
                        fontSize: "24px",
                        marginBottom: "25px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div
                        className="circle-icon-wrap"
                        style={{
                          width: "45px",
                          height: "45px",
                          fontSize: "18px",
                          background: "rgba(255,224,75,0.1)",
                          border: "1px solid rgba(255,224,75,0.3)",
                        }}
                      >
                        <i className="fa-solid fa-map-pin"></i>
                      </div>
                      Venue Highlights
                    </h3>
                    <ul
                      className="list-unstyled"
                      style={{
                        color: "#b9b6d6",
                        lineHeight: "40px",
                        fontSize: "16px",
                        padding: 0,
                      }}
                    >
                      {[
                        "Clean and comfortable ashram rooms for all participants",
                        "Pure satvik vegetarian meals provided (Breakfast & Lunch)",
                        "Ample open spaces and spiritual settings for networking",
                        "Safe, secure, and fully assisted 24x7 support environment",
                      ].map((item, index) => (
                        <li
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            className="highlight-check-icon"
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              flexShrink: 0,
                            }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </span>
                          <span className="highlight-text-item">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* How to Reach */}
                <div className="col-lg-6 mt-30">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      height: "100%",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "35px 30px",
                      background: "rgba(255,255,255,0.03)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* SVG connecting dashed path */}
                    <svg
                      style={{
                        position: "absolute",
                        right: "-20px",
                        bottom: "-20px",
                        width: "150px",
                        height: "150px",
                        opacity: 0.1,
                        zIndex: 0,
                      }}
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M 0 100 Q 50 50, 100 100"
                        fill="none"
                        stroke="#FFE04B"
                        strokeWidth="4"
                        strokeDasharray="10 10"
                      />
                    </svg>

                    <h3
                      style={{
                        color: "#ffffff",

                        marginBottom: "25px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        fontWeight: "700",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <div
                        className="circle-icon-wrap"
                        style={{
                          width: "45px",
                          height: "45px",
                          fontSize: "18px",
                          background: "rgba(255,224,75,0.1)",
                          border: "1px solid rgba(255,224,75,0.3)",
                        }}
                      >
                        <i className="fa-solid fa-route"></i>
                      </div>
                      How to Reach
                    </h3>

                    <div style={{ position: "relative", zIndex: 1 }}>
                      {[
                        {
                          title: "By Train",
                          desc: "Mathura Junction railway station is the nearest hub (Approx. 12 km away). Highly accessible from major routes.",
                          icon: "fa-train",
                        },
                        {
                          title: "By Road",
                          desc: "Well connected by major highways (Yamuna Expressway) from Delhi, Noida, Agra, and neighboring states.",
                          icon: "fa-bus",
                        },
                        {
                          title: "By Air",
                          desc: "Agra Airport (~65 km) and New Delhi Indira Gandhi International Airport (~150 km) are the closest airports.",
                          icon: "fa-plane",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            gap: "15px",
                            marginBottom: index === 2 ? 0 : "18px",
                          }}
                        >
                          <div
                            className="reach-icon"
                            style={{
                              marginTop: "3px",
                            }}
                          >
                            <i className={`fa-solid ${item.icon}`}></i>
                          </div>
                          <div>
                            <strong className="reach-title">
                              {item.title}
                            </strong>
                            <p className="reach-desc">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Nearby Spiritual Attractions */}
                <div className="col-lg-12 mt-30">
                  <div
                    className="temple-box"
                    style={{
                      padding: "50px 40px",
                      borderRadius: "24px",
                    }}
                  >
                    <div className="sec-title text-center mb-50">
                      <h3
                        style={{
                          color: "#ffffff",

                          marginBottom: "15px",
                          fontWeight: "800",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <i className="fa-solid fa-gopuram"></i>
                        Places to Seek Blessings
                      </h3>
                      <p
                        style={{
                          color: "#b9b6d6",
                          fontSize: "16px",
                          lineHeight: "26px",
                          maxWidth: "750px",
                          margin: "0 auto",
                        }}
                      >
                        Vrindavan is a holy town in Uttar Pradesh, renowned as a
                        major place of pilgrimage. Take the opportunity to seek
                        blessings at these sacred temples located close to the
                        Janmashtami Ashram.
                      </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                      {[
                        {
                          name: "Prem Mandir",
                          dist: "~2.5 km",
                          desc: "Temple of Divine Love, famous for its magnificent white marble architecture and spectacular musical fountain light shows.",
                          icon: "fa-heart",
                        },
                        {
                          name: "Shri Banke Bihari Ji",
                          dist: "~3 km",
                          desc: "The heart of Vrindavan devotion, housing the sacred self-manifested deity of Lord Krishna standing in Tribhanga posture.",
                          icon: "fa-om",
                        },
                        {
                          name: "ISKCON Vrindavan",
                          dist: "~4 km",
                          desc: "Also known as Sri Krishna Balaram Mandir, offering a vibrant global spiritual sanctuary, non-stop kirtans, and community kitchens.",
                          icon: "fa-dharmachakra",
                        },
                        {
                          name: "Nidhivan",
                          dist: "~3.5 km",
                          desc: "A mystical forest where basil trees are believed to turn into Gopis at night to perform the divine Raslila with Lord Krishna.",
                          icon: "fa-tree",
                        },
                        {
                          name: "Shri Krishna Janmabhoomi",
                          dist: "~12 km",
                          desc: "Mathura. The highly sacred birthplace of Lord Krishna, featuring deep historical chambers and massive temple pavilions.",
                          icon: "fa-gopuram",
                        },
                        {
                          name: "Yamuna Ghats",
                          dist: "~4.5 km",
                          desc: "Serene holy riverbanks of Vrindavan, ideal for morning purification dips, peaceful meditation, and evening Aarti prayers.",
                          icon: "fa-water",
                        },
                        {
                          name: "Shree Ji Mandir (Barsana)",
                          dist: "Barsana",
                          desc: "The historic hilltop palace temple dedicated to Shri Radha Rani, offering grand structures and panoramic views.",
                          icon: "fa-landmark",
                        },
                        {
                          name: "Shree Radha Raman Mandir",
                          dist: "~3.2 km",
                          desc: "Houses a self-manifested deity of Krishna that emerged from a Shaligram Shila, worshipped continuously since 1542.",
                          icon: "fa-bahai",
                        },
                        {
                          name: "Shree Radha Vallabh Mandir",
                          dist: "~3 km",
                          desc: "A historic temple emphasizing the path of pure love (Radha-prema), displaying ancient structural styles and classical song rituals.",
                          icon: "fa-dove",
                        },
                        {
                          name: "Dwarkadhish Temple",
                          dist: "Mathura",
                          desc: "Renowned for its grand carvings, colorful paintings, and celebratory festival swings during the monsoon season.",
                          icon: "fa-archway",
                        },
                        {
                          name: "Gopeshwar Mahadev",
                          dist: "~3.4 km",
                          desc: "The unique Shiva temple where Lord Shiva is dressed and decorated as a Gopi to participate in Krishna's eternal dance.",
                          icon: "fa-dharmachakra",
                        },
                        {
                          name: "Radha Kund & Syama Kund",
                          dist: "~15 km",
                          desc: "Sacred twin holy ponds created by Radha and Krishna themselves, considered the absolute crown jewel of spiritual bathing spots.",
                          icon: "fa-droplet",
                        },
                        {
                          name: "Shree Giriraj Ji Maharaj",
                          dist: "Govardhan",
                          desc: "The sacred Govardhan hill path, representing the physical form of Krishna himself who lifted the mountain to protect the cows.",
                          icon: "fa-mountain",
                        },
                      ].map((place, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                          <div className="temple-grid-card">
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: "20px",
                                }}
                              >
                                <div className="temple-icon-box">
                                  <i className={`fa-solid ${place.icon}`}></i>
                                </div>
                                <span className="temple-dist-badge">
                                  <i
                                    className="fa-solid fa-location-dot"
                                    style={{ marginRight: "6px" }}
                                  ></i>
                                  {place.dist}
                                </span>
                              </div>
                              <h4
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                  marginBottom: "12px",
                                }}
                              >
                                {place.name}
                              </h4>
                              <p
                                style={{
                                  fontSize: "14px",
                                  lineHeight: "22px",
                                  margin: 0,
                                }}
                              >
                                {place.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* About the Venue End */}
        </main>
      </div>
    </div>
  );
}
