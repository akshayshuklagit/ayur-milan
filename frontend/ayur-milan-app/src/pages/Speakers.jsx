import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Speakers() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  const speakers = [
    {
      name: "Vaidya Panchabhhai Damaniya",
      desig: "RAV Guru & Renowned Ayurveda Expert",
      school: "Arogya Mandir, UNA",
      img: "./vd-panchabhai.png",
      brand: "/assets/img/brand/team-logo01.png",
    },
    {
      name: "Vaidya Hemkant Baviskar",
      desig: "RAV Guru (Ministry Of Ayush) & Eye Specialist",
      school: "Founder Of Netrayu Hospital, Jalgaon",
      img: "./vd-hemant.jpeg",
      brand: "/assets/img/brand/team-logo02.png",
    },
    {
      name: "Vaidya Pravin Joshi",
      desig: "RAV Guru (Ministry Of Ayush) & Panchakarma Expert",
      school: "Founder of Dhanvantari Ayurved Sanshthan, Dhule",
      img: "./vd-pravin.jpeg",
      brand: "/assets/img/brand/team-logo03.png",
    },
    {
      name: "Vaidya Narendra Gujarathi",
      desig: "RAV Guru (Ministry Of Ayush) & Renowned Practitioner",
      school: "Founder of Gujarathi's Ayurved Research Inst., Jalgaon",
      img: "./vd-narendra.jpeg",
      brand: "/assets/img/brand/team-logo08.png",
    },
    {
      name: "Vaidya Niteen Sanjay Ambatkar",
      desig: "MD Ayurved & PhD Scholar",
      school: "Founder of Shree Arogyawardhini Clinic, Nagpur",
      img: "./vd-niteen.jpeg",
      brand: "/assets/img/brand/team-logo04.png",
    },
    {
      name: "Vaidya Kirti Joshi",
      desig: "Gynecology & Infertility Consultant",
      school: "Founder of Dhanvantari Ayurved Sanshthan, Dhule",
      img: "./vd-kirti.jpeg",
      brand: "/assets/img/brand/team-logo05.png",
    },
    {
      name: "Vaidya Aditya Indani",
      desig: "Renowned Dermatology & Aesthetic Expert",
      school: "Founder of Radha Krishan Clinic, Mumbai",
      img: "./vd-aditya.jpeg",
      brand: "/assets/img/brand/team-logo06.png",
    },
    {
      name: "Vaidya Rohit Gujarathi",
      desig: "Ayurvedic Management of Non-Healing Wounds",
      school: "Founder of Gujarathi's Ayurved Research Inst., Jalgaon",
      img: "./vd-rohit.jpeg",
      brand: "/assets/img/brand/team-logo07.png",
    },

    {
      name: "Dr. Ankit Agarwal",
      desig: "MD (Ayu) & Renowned Ayurveda Practitioner",
      school: "Founder of Tulsi Ayurveda",
      img: "./vd-ankit.jpeg",
      brand: "/assets/img/brand/team-logo09.png",
    },
  ];

  const topics = [
    {
      title: "Emergency & Critical Care",
      icon: "fa-kit-medical",
      desc: "Ayurvedic management of acute medical emergencies and critical support.",
    },
    {
      title: "Startup & Brand Building",
      icon: "fa-chart-line",
      desc: "Practical strategies for setting up modern clinics, scale-up models, and personal brand building for Vaidyas.",
    },
    {
      title: "Twak Vikara (Dermatology)",
      icon: "fa-spa",
      desc: "Therapeutic and aesthetic management of non-healing skin disorders and psoriasis.",
    },
    {
      title: "18+ Workshops",
      icon: "fa-person-chalkboard",
      desc: "Hands-on clinical training sessions covering Agnikarma, Viddhakarma, Jalaukavacharana, and Marma.",
    },
  ];

  return (
    <div
      className="design-conference"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Floating Shapes */}
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ top: "180px", right: "12%", width: "45px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape-slow"
        style={{ top: "500px", left: "6%", width: "30px", opacity: 0.25 }}
        alt=""
      />
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ bottom: "250px", right: "5%", width: "35px", opacity: 0.2 }}
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
                  Scientific Committee
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
                  Honorable Speakers
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Featured Quote Start */}
          <section className="pt-100 pb-50">
            <div className="container">
              <div
                className="wow fadeInUp"
                data-wow-delay="0ms"
                data-wow-duration="600ms"
                style={{
                  background:
                    "radial-gradient(circle at 10% 20%, rgba(130, 17, 79, 0.4) 0%, rgba(20, 2, 12, 0.7) 80%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 224, 75, 0.3)",
                  padding: "50px 40px",
                  borderRadius: "28px",
                  position: "relative",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
                  overflow: "hidden",
                }}
              >
                {/* Decorative background circle */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "rgba(255, 224, 75, 0.05)",
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    fontSize: "120px",
                    color: "rgba(255,224,75,0.08)",
                    fontFamily: "serif",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  “
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <p
                    style={{
                      fontStyle: "italic",
                      fontSize: "22px",
                      lineHeight: "38px",
                      color: "#fff",
                      textAlign: "center",
                      maxWidth: "900px",
                      margin: "0 auto",
                    }}
                  >
                    "The transition from theoretical Ayurveda texts to confident
                    bedside clinical practice is the biggest challenge for young
                    Vaidyas. AyurMilan 2026 is designed to demystify these
                    clinical secrets under the direct supervision of RAV Gurus."
                  </p>
                  <div
                    style={{
                      width: "60px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, transparent, #FFE04B, transparent)",
                      margin: "25px auto 15px",
                    }}
                  />
                  <h4
                    style={{
                      color: "#FFE04B",
                      textAlign: "center",
                      fontSize: "16px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: "700",
                      margin: 0,
                    }}
                  >
                    — Agnivesh Events Scientific Committee
                  </h4>
                </div>
              </div>
            </div>
          </section>
          {/* Featured Quote End */}

          {/* Speakers Intro & Keynotes Start */}
          <section className="pt-80 pb-100">
            <div className="container">
              <div className="row align-items-center g-5">
                <div className="col-lg-5">
                  <div className="sec-title mb-40">
                    <span
                      className="sub-title"
                      style={{
                        color: "#FFE04B",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <img
                        src="/assets/img/icon/sub-icon.svg"
                        style={{ width: "12px" }}
                        alt=""
                      />
                      CLINICAL EXPERTS
                    </span>
                    <h2
                      className="title mb-20"
                      style={{
                        color: "#fff",
                        fontSize: "42px",
                        fontWeight: "800",
                        lineHeight: "1.2",
                      }}
                    >
                      Learn From RAV Gurus
                    </h2>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "16px",
                        lineHeight: "28px",
                      }}
                    >
                      AyurMilan 2026 brings together the most respected clinical
                      thinkers of India. Our list of speakers features Rashtriya
                      Ayurveda Vidyapeeth (RAV) Gurus and leading practitioners
                      who have transformed clinical outcomes in emergency care,
                      specialized ophthalmology (Netra Roga), advanced
                      dermatology (Twak Vikara), wound care, and panchakarma.
                    </p>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="row g-4">
                    {topics.map((t, idx) => {
                      const colors = [
                        {
                          border: "rgba(255, 224, 75, 0.4)",
                          glow: "rgba(255, 224, 75, 0.15)",
                          iconBg: "rgba(255, 224, 75, 0.1)",
                          iconColor: "#FFE04B",
                        },
                        {
                          border: "rgba(122, 252, 255, 0.4)",
                          glow: "rgba(122, 252, 255, 0.15)",
                          iconBg: "rgba(122, 252, 255, 0.1)",
                          iconColor: "#7afcff",
                        },
                        {
                          border: "rgba(255, 126, 185, 0.4)",
                          glow: "rgba(255, 126, 185, 0.15)",
                          iconBg: "rgba(255, 126, 185, 0.1)",
                          iconColor: "#ff7eb9",
                        },
                        {
                          border: "rgba(196, 255, 122, 0.4)",
                          glow: "rgba(196, 255, 122, 0.15)",
                          iconBg: "rgba(196, 255, 122, 0.1)",
                          iconColor: "#c4ff7a",
                        },
                      ][idx % 4];

                      return (
                        <div className="col-sm-6" key={idx}>
                          <div
                            style={{
                              padding: "30px 25px",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderLeft: `4px solid ${colors.iconColor}`,
                              background: "rgba(255, 255, 255, 0.03)",
                              borderRadius: "16px",
                              height: "100%",
                              transition:
                                "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-5px)";
                              e.currentTarget.style.borderColor = colors.border;
                              e.currentTarget.style.borderLeftColor =
                                colors.iconColor;
                              e.currentTarget.style.boxShadow = `0 12px 30px ${colors.glow}`;
                              const iconCircle =
                                e.currentTarget.querySelector(".icon-circle");
                              if (iconCircle) {
                                iconCircle.style.background = colors.iconColor;
                                iconCircle.style.color = "#82114f";
                                iconCircle.style.boxShadow = `0 0 15px ${colors.iconColor}`;
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "none";
                              e.currentTarget.style.borderColor =
                                "rgba(255,255,255,0.12)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 30px rgba(0, 0, 0, 0.2)";
                              const iconCircle =
                                e.currentTarget.querySelector(".icon-circle");
                              if (iconCircle) {
                                iconCircle.style.background = colors.iconBg;
                                iconCircle.style.color = colors.iconColor;
                                iconCircle.style.boxShadow = "none";
                              }
                            }}
                          >
                            <div
                              className="icon-circle"
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: colors.iconBg,
                                color: colors.iconColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <i className={`fa-solid ${t.icon}`}></i>
                            </div>
                            <h4
                              style={{
                                color: "#fff",
                                fontSize: "18px",
                                fontWeight: "700",
                                margin: 0,
                              }}
                            >
                              {t.title}
                            </h4>
                            <p
                              style={{
                                color: "#b9b6d6",
                                fontSize: "13.5px",
                                lineHeight: "20px",
                                margin: 0,
                                flexGrow: 1,
                              }}
                            >
                              {t.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Speakers Intro & Keynotes End */}

          {/* Grid Speakers Start */}
          <section className="pb-100">
            <div className="container">
              <div className="sec-title text-center mb-60">
                <span
                  className="sub-title"
                  style={{
                    color: "#FFE04B",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/assets/img/icon/sub-icon.svg"
                    style={{ width: "12px" }}
                    alt=""
                  />
                  ACADEMIC LEADERS
                  <img
                    src="/assets/img/icon/sub-icon.svg"
                    style={{ width: "12px" }}
                    alt=""
                  />
                </span>
                <h2
                  className="title"
                  style={{
                    color: "#fff",
                    fontSize: "42px",
                    fontWeight: "bold",
                  }}
                >
                  Our Honourable Speakers
                </h2>
              </div>
              <div className="row g-4 justify-content-center">
                {speakers.map((spk, idx) => {
                  const isRavGuru = spk.desig
                    .toLowerCase()
                    .includes("rav guru");
                  return (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={idx}>
                      <div
                        style={{
                          height: "100%",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "24px",
                          background: "rgba(255, 255, 255, 0.03)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                          transition:
                            "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 224, 75, 0.45)";
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.boxShadow =
                            "0 18px 40px rgba(255, 224, 75, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow =
                            "0 10px 30px rgba(0,0,0,0.25)";
                        }}
                      >
                        {/* Floating RAV Guru Badge */}
                        {isRavGuru && (
                          <div
                            style={{
                              position: "absolute",
                              top: "16px",
                              left: "16px",
                              background:
                                "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                              color: "#1a0210",
                              fontWeight: "800",
                              fontSize: "11px",
                              letterSpacing: "1px",
                              padding: "6px 14px",
                              borderRadius: "30px",
                              boxShadow: "0 4px 15px rgba(255, 224, 75, 0.4)",
                              zIndex: 3,
                              textTransform: "uppercase",
                            }}
                          >
                            <i
                              className="fa-solid fa-award"
                              style={{ marginRight: "6px" }}
                            ></i>
                            RAV GURU
                          </div>
                        )}

                        {/* Image container with fixed height */}
                        <div
                          style={{
                            height: "320px",
                            width: "100%",
                            overflow: "hidden",
                            position: "relative",
                            background: "rgba(0,0,0,0.2)",
                          }}
                        >
                          <img
                            src={spk.img}
                            alt={spk.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top",
                              transition:
                                "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "scale(1.08)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                            }}
                          />
                        </div>

                        {/* Content block */}
                        <div
                          style={{
                            padding: "24px 20px",
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                color: "#fff",
                                fontSize: "20px",
                                marginBottom: "8px",
                                fontWeight: "800",
                                lineHeight: "1.3",
                              }}
                            >
                              {spk.name}
                            </h3>
                            <p
                              style={{
                                color: "#FFE04B",
                                fontSize: "13px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                lineHeight: "1.4",
                                marginBottom: "15px",
                              }}
                            >
                              {spk.desig}
                            </p>
                          </div>
                          <div
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.08)",
                              paddingTop: "15px",
                              color: "#b9b6d6",
                              fontSize: "13px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            <i
                              className="fa-solid fa-hospital-user"
                              style={{ color: "#FFE04B" }}
                            ></i>
                            <span>{spk.school}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Grid Speakers End */}

          {/* Marquee Row Start */}
          <div
            className="css-marquee-container"
            style={{ margin: "40px 0 80px 0" }}
          >
            <div className="css-marquee-content">
              ★ Agnikarma & Viddhakarma Secrets ★ Marma Therapy Live ★ Netra
              Tarpana Case Studies ★ Ayurvedic Emergency & Critical Care ★ Herb
              Identification ★ Medicine Preparation ★ BAMS Community Meet 2026 ★
              Vrindavan Gathering ★
            </div>
          </div>
          {/* Marquee Row End */}
        </main>
      </div>
    </div>
  );
}
