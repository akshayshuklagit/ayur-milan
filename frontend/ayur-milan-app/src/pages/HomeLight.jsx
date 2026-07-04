import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";

export default function HomeLight() {
  const [activeImageIndex, setActiveImageIndex] = useState(2); // index 2 is active by default (img08)
  const [activeTab, setActiveTab] = useState("day1");

  // Toggle body light-mode class for theme scoping
  useEffect(() => {
    document.body.classList.add("light-mode");
    return () => {
      document.body.classList.remove("light-mode");
    };
  }, []);

  // Mousemove parallax effect for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      const items = document.querySelectorAll(".hero-content-img .img");
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      items.forEach((item) => {
        const speed = parseFloat(item.getAttribute("data-speed") || "0");
        const x = ((e.clientX - centerX) * speed) / 100;
        const y = ((e.clientY - centerY) * speed) / 100;
        item.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text highlight active switcher effect
  useEffect(() => {
    const hilightText = document.querySelectorAll(".hilight-text");
    let current = 0;

    if (hilightText.length > 0) {
      const interval = setInterval(() => {
        hilightText.forEach((box) => box.classList.remove("active"));
        hilightText[current].classList.add("active");
        current = (current + 1) % hilightText.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  // Initialize Swiper for Honorable Speakers
  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper(".dc-team-slider", {
        loop: true,
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 3,
        centeredSlides: true,
        autoplay: {
          enabled: true,
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1600: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          576: { slidesPerView: 1.0, spaceBetween: 20, centeredSlides: true },
          0: { slidesPerView: 1.0, spaceBetween: 15, centeredSlides: true },
        },
      });
    }
  }, []);

  // Initialize Marquee
  useEffect(() => {
    if (window.$ && window.$.fn.marquee) {
      window.$(".marquee-left").marquee({
        speed: 10,
        gap: 0,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: false,
        startVisible: true,
      });
      window.$(".marquee-right").marquee({
        speed: 20,
        gap: 0,
        delayBeforeStart: 0,
        direction: "right",
        duplicated: true,
        pauseOnHover: false,
        startVisible: true,
      });
    }
  }, []);

  // Initialize WOW.js
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  const speakers = [
    {
      name: "Vd. Panchabhhai Damaniya",
      desig: "RAV Guru & Renowned Ayurveda Expert",
      img: "./vd-pan.jpeg",
    },
    {
      name: "Vd. Hemkant Baviskar",
      desig: "RAV Guru & Eye Care Specialist",
      img: "./vd-hemant.jpeg",
    },
    {
      name: "Vd. Pravin Joshi",
      desig: "RAV Guru & Panchakarma Expert",
      img: "./vd-pravin.jpeg",
    },
    {
      name: "Vd. Niteen Sanjay Ambatkar",
      desig: "MD Ayurved & MD Scholar",
      img: "./vd-niteen.jpeg",
    },
    {
      name: "Vd. Kirti Joshi",
      desig: "Gynecology & Infertility Consultant",
      img: "./vd-kirti.jpeg",
    },
    {
      name: "Vd. Aditya Indani",
      desig: "Dermatology & Aesthetic Specialist",
      img: "./vd-aditya.jpeg",
    },
    {
      name: "Vd. Rohit Gujarathi",
      desig: "Non-Healing Wounds Expert",
      img: "./vd-rohit.jpeg",
    },
    {
      name: "Vd. Narendra Gujarathi",
      desig: "RAV Guru & Renowned Practitioner",
      img: "./vd-narendra.jpeg",
    },
    {
      name: "Dr. Ankit Agarwal",
      desig: "MD (Ayu) & Tulsi Ayurveda Founder",
      img: "./vd-ankit.jpeg",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  ];

  return (
    <div className="design-conference">
      <div className="body_wrap o-clip">
        <main>
          {/* Hero Section Start */}
          <section
            className="hero hero-style--two pos-rel "
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url('/assets/img/bg/abstract_edu_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="xb-hero_content text-center">
                {/* Agnivesh Events branding line */}
                <div
                  className="wow fadeInDown"
                  data-wow-delay="0ms"
                  data-wow-duration="600ms"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "16px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px",
                    padding: "6px 28px 6px 6px",
                    marginBottom: "28px",
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2.5px solid #FFE04B",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="./agnivesh-logo.png"
                      alt="Agnivesh Events"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "14px",
                      fontWeight: "700",
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Agnivesh Events Presents
                  </span>
                </div>

                <h2
                  className="title wow fadeInUp"
                  data-wow-delay="0ms"
                  data-wow-duration="600ms"
                  style={{
                    fontSize: "clamp(42px, 8vw, 96px)",
                    textTransform: "uppercase",
                  }}
                >
                  AyurMilan 2026
                </h2>
                <p
                  className="wow fadeInUp"
                  data-wow-delay="100ms"
                  style={{
                    color: "#FFE04B",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  India's Emerging Platform for Ayurveda Students, Professionals
                  & Brands
                </p>

                {/* date + location pill */}
                <div
                  className="wow fadeInUp"
                  data-wow-delay="120ms"
                  data-wow-duration="600ms"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "24px",
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "50px",
                    padding: "10px 28px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <i
                      className="fa-regular fa-calendar"
                      style={{ color: "#FFE04B" }}
                    ></i>
                    1st &amp; 2nd October 2026
                  </span>
                  <span
                    style={{
                      width: "1px",
                      height: "16px",
                      background: "rgba(255,255,255,0.25)",
                    }}
                  />
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <i
                      className="fa-regular fa-location-dot"
                      style={{ color: "#FFE04B" }}
                    ></i>
                    Vrindavan, Uttar Pradesh
                  </span>
                </div>

                <div
                  className="hero-btn mt-50 wow fadeInUp"
                  data-wow-delay="150ms"
                  data-wow-duration="600ms"
                >
                  <Link to="/delegate" className="thm-btn design-btn">
                    Register Your Ticket
                    <img src="/assets/img/icon/right-arrow.svg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* Hero Section End */}

          {/* Offer Section Start */}
          <section className="offer-section dark-bg">
            <div className="container">
              <div
                className="offer-wrap offer-wrapper"
                style={{
                  backgroundImage: "url('/assets/img/bg/offer-bg.jpg')",
                  backgroundSize: "cover",
                }}
              >
                <div className="row align-items-center g-4">
                  {/* Left Column: Event Starts Counter */}
                  <div className="col-lg-7 text-start">
                    <div className="sec-title sec-title--two mb-15">
                      <span
                        className="sub-title"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src="/assets/img/icon/sub-icon.svg"
                          alt="icon-image"
                        />
                        EVENT STARTS IN
                        <img
                          src="/assets/img/icon/sub-icon.svg"
                          alt="icon-image"
                        />
                      </span>
                    </div>
                    <Countdown />
                  </div>
                  {/* Right Column: Venue and Date Location Details */}
                  <div className="col-lg-5">
                    <div
                      className="offer-item d-flex flex-column"
                      style={{ gap: "15px" }}
                    >
                      <div className="xb-inner ul_li" style={{ margin: 0 }}>
                        <div className="xb-location">
                          <img
                            src="/assets/img/icon/location-icon.svg"
                            alt=""
                          />
                        </div>
                        <p className="xb-vanue" style={{ margin: 0 }}>
                          Venue: Shri Krishan Janmashtami Ashram, Vrindavan
                        </p>
                      </div>
                      <div className="xb-inner ul_li" style={{ margin: 0 }}>
                        <div className="xb-location">
                          <img
                            src="/assets/img/icon/calendar-icon.svg"
                            alt=""
                          />
                        </div>
                        <p className="xb-vanue" style={{ margin: 0 }}>
                          Date: 1st & 2nd October 2026
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Offer Section End */}

          <div className="dark-bg">
            {/* About Section Start */}
            <section className="about pt-125 pb-120">
              <div className="container">
                <div className="xb-about-wrap">
                  <div className="xb-about-top mb-60">
                    <div className="row mt-none-30">
                      <div className="col-lg-8 mt-30">
                        <div
                          className="sec-title sec-title--two wow xb-animetion-left"
                          data-wow-delay="0ms"
                          data-wow-duration="700ms"
                        >
                          <h2 className="title color-heading">
                            Share the vision, journey, and passion that connects
                            the entire Ayurveda fraternity.
                          </h2>
                        </div>
                      </div>
                      <div className="col-lg-4 mt-30">
                        <div className="xb-about-right">
                          <video
                            loop
                            muted
                            playsInline
                            autoPlay
                            poster="./ayurmilan-logo.jpeg"
                          >
                            <source src="./ayur-milan.mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dc-about-img-item ul_li_between">
                    {galleryImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className={`img xb-mouseenter ${activeImageIndex === idx ? "active" : ""}`}
                        onMouseEnter={() => setActiveImageIndex(idx)}
                      >
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                          <img src={imgSrc} alt="" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* About Section End */}
          </div>

          {/* Speakers Section Start */}
          <section className="team pt-125 pb-125">
            <div className="container">
              <div className="dc-team-wrapper pos-rel">
                <div className="dec-team-top ul_li_between mb-55">
                  <div
                    className="sec-title sec-title--two wow xb-animetion-left"
                    data-wow-delay="0ms"
                    data-wow-duration="700ms"
                  >
                    <span className="sub-title">
                      <img
                        src="/assets/img/icon/sub-icon.svg"
                        alt="icon-image"
                      />
                      Our Speakers
                      <img
                        src="/assets/img/icon/sub-icon.svg"
                        alt="icon-image"
                      />
                    </span>
                    <h2 className="title">Honorable Speakers</h2>
                  </div>
                  <div className="team-btn">
                    <Link to="/team" className="thm-btn design-btn">
                      View All Speakers
                      <img src="/assets/img/icon/right-arrow.svg" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="dc-team-slider swiper-container">
                  <div className="swiper-wrapper">
                    {speakers.map((spk, idx) => (
                      <div
                        className="swiper-slide"
                        key={idx}
                        style={{ height: "auto" }}
                      >
                        <div
                          style={{
                            height: "100%",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "24px",
                            background: "rgba(20, 2, 12, 0.6)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.3)",
                            transition:
                              "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            margin: "15px 5px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255, 224, 75, 0.5)";
                            e.currentTarget.style.transform =
                              "translateY(-8px) scale(1.02)";
                            e.currentTarget.style.boxShadow =
                              "0 20px 45px rgba(255, 224, 75, 0.18)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255, 255, 255, 0.12)";
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow =
                              "0 12px 35px rgba(0, 0, 0, 0.3)";
                          }}
                        >
                          {/* Image container with fixed height */}
                          <div
                            style={{
                              height: "290px",
                              width: "100%",
                              overflow: "hidden",
                              position: "relative",
                              background: "rgba(0, 0, 0, 0.2)",
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
                                e.target.style.transform = "scale(1.1)";
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
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <h3
                              style={{
                                color: "#fff",
                                fontSize: "19px",
                                marginBottom: "8px",
                                fontWeight: "800",
                                lineHeight: "1.3",
                              }}
                            >
                              <a
                                href="#!"
                                onClick={(e) => e.preventDefault()}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {spk.name}
                              </a>
                            </h3>
                            <p
                              style={{
                                color: "#FFE04B",
                                fontSize: "13px",
                                fontWeight: "600",
                                margin: 0,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                lineHeight: "1.4",
                              }}
                            >
                              {spk.desig}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="team-shape"></div>
                </div>
                <div className="swiper-pagination"></div>
                <div className="team-slide-btn">
                  <div className="swiper-button-next">
                    <i className="fa-regular fa-arrow-right"></i>
                  </div>
                  <div className="swiper-button-prev">
                    <i className="fa-regular fa-arrow-left"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Speakers Section End */}

          <div className="dark-bg">
            {/* Funfact Section Start */}
            <section className="funfact pt-130 pb-125">
              <div className="container">
                <div
                  className="dc-funfact-wrap bg_img"
                  style={{
                    backgroundImage: "url('/assets/img/bg/funfact-bg.jpg')",
                  }}
                >
                  <div className="row mt-none-50">
                    <div className="col-lg-6 mt-50">
                      <div className="funfact-heading">
                        <div className="sec-title sec-title--two">
                          <span
                            className="sub-title wow fadeInUp"
                            data-wow-delay="0ms"
                            data-wow-duration="600ms"
                          >
                            <img
                              src="/assets/img/icon/sub-icon.svg"
                              alt="icon-image"
                            />
                            AyurMilan Achievements
                            <img
                              src="/assets/img/icon/sub-icon.svg"
                              alt="icon-image"
                            />
                          </span>
                          <h2
                            className="title wow fadeInUp"
                            data-wow-delay="150ms"
                            data-wow-duration="600ms"
                          >
                            Grand Gathering of Ayurveda Fraternity!
                          </h2>
                          <p
                            className="content wow fadeInUp"
                            data-wow-delay="300ms"
                            data-wow-duration="600ms"
                          >
                            From clinical breakthroughs to interactive
                            workshops, AyurMilan 2026 brings together the key
                            stakeholders of Ayurveda to learn, collaborate, and
                            create a lasting impact.
                          </p>
                        </div>
                        <div
                          className="hero-btn mt-55 wow fadeInUp"
                          data-wow-delay="450ms"
                          data-wow-duration="600ms"
                        >
                          <Link to="/delegate" className="thm-btn design-btn">
                            Register Your Ticket
                            <img
                              src="/assets/img/icon/right-arrow.svg"
                              alt=""
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-50">
                      <div
                        className="wow xb-animetion-right"
                        data-wow-delay="600ms"
                        data-wow-duration="600ms"
                        style={{ position: "relative" }}
                      >
                        {/* Main gathering image */}
                        <div
                          style={{
                            borderRadius: "24px",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                            position: "relative",
                          }}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                            alt="Ayurveda Conference Gathering"
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          {/* gradient overlay at bottom */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "50%",
                              background:
                                "linear-gradient(to top, rgba(130,17,79,0.7) 0%, transparent 100%)",
                            }}
                          />
                          {/* badge */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: "20px",
                              left: "20px",
                              background: "rgba(255,255,255,0.12)",
                              backdropFilter: "blur(12px)",
                              border: "1px solid rgba(255,255,255,0.25)",
                              borderRadius: "12px",
                              padding: "10px 18px",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: "#FFE04B",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-users"
                                style={{ color: "#82114f", fontSize: "16px" }}
                              ></i>
                            </div>
                            <div>
                              <div
                                style={{
                                  color: "#FFE04B",
                                  fontWeight: "800",
                                  fontSize: "18px",
                                  lineHeight: 1,
                                }}
                              >
                                10,000+
                              </div>
                              <div
                                style={{
                                  color: "rgba(255,255,255,0.8)",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                }}
                              >
                                Expected Visitors
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* floating second image */}
                        <div
                          style={{
                            position: "absolute",
                            top: "-24px",
                            right: "-20px",
                            width: "160px",
                            height: "160px",
                            borderRadius: "20px",
                            overflow: "hidden",
                            border: "3px solid rgba(255,255,255,0.2)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                          }}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80"
                            alt="Ayurveda Workshop"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Funfact Section End */}
          </div>

          {/* FAQ Section Start */}
          <section
            className="faq pt-125 pb-130 bg_img"
            style={{ backgroundImage: "url('/assets/img/bg/faq-bg.jpg')" }}
          >
            <div className="container">
              <div className="sec-title sec-title--two text-center mb-60">
                <span className="sub-title">
                  <img src="/assets/img/icon/sub-icon.svg" alt="icon-image" />
                  Have Questions?
                  <img src="/assets/img/icon/sub-icon.svg" alt="icon-image" />
                </span>
                <h2 className="title">Frequently Asked Questions</h2>
              </div>
              <div className="row mt-none-30">
                <div className="col-lg-6">
                  <div
                    className="xb-faq-item wow fadeInUp"
                    data-wow-delay="0ms"
                    data-wow-duration="600ms"
                  >
                    <span className="xb-icon">
                      <img src="/assets/img/icon/question-icon.svg" alt="" /> Where is the venue?
                    </span>
                    <p className="xb-content">
                      The conference is held at Shri Krishan Janmashtami Ashram,
                      Opp Akshay Patra, Chattikara, Mathura-Vrindavan Marg,
                      Mathura, Uttar Pradesh - 281121.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="xb-faq-item wow fadeInUp"
                    data-wow-delay="150ms"
                    data-wow-duration="600ms"
                  >
                    <span className="xb-icon">
                      <img src="/assets/img/icon/question-icon.svg" alt="" /> What is included in the Delegate fee?
                    </span>
                    <p className="xb-content">
                      It includes breakfast, lunch, a delegate kit, certificate
                      of participation, and entry to all workshop and exhibition
                      stalls.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="xb-faq-item wow fadeInUp"
                    data-wow-delay="300ms"
                    data-wow-duration="600ms"
                  >
                    <span className="xb-icon">
                      <img src="/assets/img/icon/question-icon.svg" alt="" /> How much is the accommodation charge?
                    </span>
                    <p className="xb-content">
                      Accommodation is available at the ashram for 1400/-. You
                      can register for accommodation along with your delegate
                      registration.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="xb-faq-item wow fadeInUp"
                    data-wow-delay="450ms"
                    data-wow-duration="600ms"
                  >
                    <span className="xb-icon">
                      <img src="/assets/img/icon/question-icon.svg" alt="" /> Who are the organizers?
                    </span>
                    <p className="xb-content">
                      The event is organized by Agnivesh Events, led by
                      Organizing Chairman Vd. Lovem Singla, with Directors Vd.
                      Vansh Chhabra and Vd. Yadwinder Joshi serving as key
                      representatives of the organization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* FAQ Section End */}
        </main>
      </div>
    </div>
  );
}
