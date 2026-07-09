import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Exhibitors() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }

    // Fetch dynamic exhibitor logos from database
    const fetchLogos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/exhibitor-logos`);
        if (response.ok) {
          const resData = await response.json();
          if (resData.data) {
            setLogos(resData.data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch exhibitor logos:", err);
      }
    };
    fetchLogos();
  }, []);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    category: "",
    country: "",
    state: "",
    city: "",
    street: "",
    zip: "",
    productCategories: [],
  });

  const [enquired, setEnquired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const productCategoryOptions = [
    "Ayurvedic, Unani & Siddha Medicines",
    "Herbal Products, Extracts & Ingredients",
    "Natural & Organic Products",
    "Agro, Dairy, Tea, & Spices Products",
    "Honeybee, Coconut & Banana Products",
    "Sanitizers, Soaps, Gel, Rub & Floor Cleaners",
    "Yoga Mats, Apparels and Accessories",
    "Meditation Products and Astro Product",
    "Medicine Manufacturing Machines",
    "Health & Wellness Supplements",
    "Physiotherapy Machines & Equipment",
    "Medicine Packaging, Wrapping, Labelling",
    "Khadi Clothes, Herbal and Organic Apparels",
    "Jute, Bamboo, Coir & Moonj Products",
    "Fitness Equipment, Gadgets & Accessories",
    "Acupressure, Acupuncture",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id || e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (val) => {
    setFormData((prev) => ({
      ...prev,
      productCategories: prev.productCategories.includes(val)
        ? prev.productCategories.filter((v) => v !== val)
        : [...prev.productCategories, val],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/submit-exhibitor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.message || "Failed to submit exhibitor enquiry",
        );
      }

      setEnquired(true);
    } catch (err) {
      setErrorMessage(
        err.message || "Connection error. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const sectors = [
    { label: "Ayurvedic Manufacturers & Pharma", icon: "fa-flask" },
    { label: "Herbal Drug & Raw Material Suppliers", icon: "fa-seedling" },
    { label: "Nutraceutical & Dietary Supplements", icon: "fa-capsules" },
    { label: "Herbal Skincare & Cosmetics", icon: "fa-spa" },
    { label: "Organic Food & Health Drinks", icon: "fa-leaf" },
    { label: "Essential Oils & Aromatherapy", icon: "fa-droplet" },
    { label: "Hospitals, Clinics & Wellness Centers", icon: "fa-hospital" },
    { label: "Panchakarma & Pharmacy Machinery", icon: "fa-gear" },
    { label: "Health Tech & Digital Ayurveda", icon: "fa-microchip" },
    { label: "Agriculture, Organic & Herbal Growers", icon: "fa-tractor" },
  ];

  const labelStyle = {
    display: "block",
    color: "#1d0314",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  };
  const inputStyle = {
    width: "100%",
    background: "#f8f9fa",
    border: "1.5px solid rgba(0,0,0,0.15)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#1d0314",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
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
        style={{ top: "160px", right: "10%", width: "45px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape-slow"
        style={{ top: "550px", left: "7%", width: "30px", opacity: 0.25 }}
        alt=""
      />
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ bottom: "250px", right: "12%", width: "35px", opacity: 0.2 }}
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
                  Brand Showcase & Expo
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
                  Ayur Expo 2026
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Key Expo Stats Start */}
          <section className="pt-100 pb-80">
            <div className="container">
              <div className="row align-items-center g-5">
                {/* Left Side: Brand Showcase Copy & Circular Stats */}
                <div className="col-lg-6 position-relative">
                  {/* Vector Dot Grid */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-25px",
                      left: "-25px",
                      width: "120px",
                      height: "120px",
                      backgroundImage:
                        "radial-gradient(rgba(255, 224, 75, 0.25) 15%, transparent 15%)",
                      backgroundSize: "15px 15px",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    className="sec-title mb-40"
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    <span
                      className="sub-title"
                      style={{ color: "#FFE04B", fontWeight: "bold" }}
                    >
                      EXPO HIGHLIGHTS
                    </span>
                    <h2
                      style={{
                        color: "#fff",
                        fontSize: "38px",
                        margin: "15px 0 20px 0",
                        lineHeight: "1.2",
                      }}
                    >
                      Showcase Your Brand to the Ayurveda Community
                    </h2>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "16px",
                        lineHeight: "28px",
                      }}
                    >
                      Present your products, wellness services, and
                      academic/clinical innovations directly to thousands of
                      highly engaged Ayurveda students, doctors, RAV Gurus,
                      entrepreneurs, and health enthusiasts.
                    </p>
                  </div>

                  {/* Circular Vector Funfact Stats */}
                  {/* Frosted Glass Metrics Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      padding: "24px 20px",
                      position: "relative",
                      zIndex: 2,
                      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
                      marginTop: "30px",
                    }}
                  >
                    {/* Active Visitors */}
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "32px",
                          fontWeight: "900",
                          margin: "0 0 4px 0",
                          background:
                            "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1,
                        }}
                      >
                        10,000+
                      </h3>
                      <p
                        style={{
                          color: "#b9b6d6",
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          margin: 0,
                        }}
                      >
                        Active Visitors
                      </p>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        width: "1px",
                        height: "40px",
                        background: "rgba(255, 255, 255, 0.12)",
                      }}
                    />

                    {/* Delegates */}
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "32px",
                          fontWeight: "900",
                          margin: "0 0 4px 0",
                          background:
                            "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1,
                        }}
                      >
                        4,000+
                      </h3>
                      <p
                        style={{
                          color: "#b9b6d6",
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          margin: 0,
                        }}
                      >
                        Delegates
                      </p>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        width: "1px",
                        height: "40px",
                        background: "rgba(255, 255, 255, 0.12)",
                      }}
                    />

                    {/* Exhibitors */}
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "32px",
                          fontWeight: "900",
                          margin: "0 0 4px 0",
                          background:
                            "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1,
                        }}
                      >
                        100+
                      </h3>
                      <p
                        style={{
                          color: "#b9b6d6",
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          margin: 0,
                        }}
                      >
                        Exhibitors
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Skewed perspective card with premium expo stall image and decorative gold borders */}
                <div className="col-lg-6 position-relative text-center">
                  {/* Decorative background circle vectors */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "380px",
                      height: "380px",
                      borderRadius: "50%",
                      border: "2px dashed rgba(255, 224, 75, 0.15)",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(1.2)",
                      width: "380px",
                      height: "380px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255, 224, 75, 0.1)",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Skewed Perspective visual container */}
                  <div
                    className="stagger-zoom-img"
                    style={{
                      transform:
                        "perspective(800px) rotateY(-8deg) rotateX(5deg)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: "3px solid rgba(255, 224, 75, 0.4)",
                      boxShadow: "20px 20px 40px rgba(0,0,0,0.4)",
                      position: "relative",
                      zIndex: 2,
                      maxWidth: "460px",
                      margin: "0 auto",
                      transition: "transform 0.5s ease, border-color 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1.02)";
                      e.currentTarget.style.borderColor = "#FFE04B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "perspective(800px) rotateY(-8deg) rotateX(5deg)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 224, 75, 0.4)";
                    }}
                  >
                    <img
                      src="./expo-stall.png"
                      alt="AyurMilan Expo Stall Booth"
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
          </section>
          {/* Key Expo Stats End */}

          {/* Stall Packages Section Start */}
          <section
            className="pb-100"
            id="stall-packages"
            style={{ position: "relative" }}
          >
            {/* Background Glow */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(130, 17, 79, 0.25) 0%, transparent 70%)",
                filter: "blur(80px)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            <div
              className="container"
              style={{ position: "relative", zIndex: 2 }}
            >
              <div className="sec-title text-center mb-60">
                <span
                  className="sub-title"
                  style={{
                    color: "#FFE04B",
                    fontWeight: "bold",
                    fontSize: "14px",
                    letterSpacing: "2px",
                  }}
                >
                  CHOOSE YOUR EXHIBITION SPACE
                </span>
                <h2
                  className="title"
                  style={{
                    color: "#fff",
                    fontSize: "42px",
                    fontWeight: "800",
                    marginTop: "10px",
                  }}
                >
                  Stall Booking Packages
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    fontSize: "16px",
                    maxWidth: "600px",
                    margin: "15px auto 0",
                  }}
                >
                  Select the perfect space dimension and visibility level to
                  maximize your brand reach at Ayur Expo 2026.
                </p>
              </div>

              <div className="row g-5 justify-content-center">
                {/* Standard Stall */}
                <div className="col-lg-5 col-md-6">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      height: "100%",
                      padding: "45px 35px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.25)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 45px rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 40px rgba(0,0,0,0.2)";
                    }}
                  >
                    <div>
                      {/* Top Header Row */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "25px",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#b9b6d6",
                            padding: "6px 16px",
                            borderRadius: "30px",
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          Standard Tier
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#FFE04B",
                          }}
                        >
                          <i
                            className="fa-solid fa-maximize"
                            style={{ fontSize: "13px" }}
                          ></i>
                          <span style={{ fontSize: "14px", fontWeight: "700" }}>
                            2m &times; 2m
                          </span>
                        </div>
                      </div>

                      {/* Package Name */}
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: "28px",
                          fontWeight: "800",
                          marginBottom: "15px",
                        }}
                      >
                        Standard Stall
                      </h3>
                      <p
                        style={{
                          color: "#b9b6d6",
                          fontSize: "14px",
                          lineHeight: "24px",
                          marginBottom: "30px",
                        }}
                      >
                        A cost-effective space package perfect for startups, raw
                        material suppliers, and niche brands looking to
                        establish on-ground presence.
                      </p>

                      {/* Inclusions */}
                      <h4
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "800",
                          marginBottom: "20px",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "14px",
                            background: "#FFE04B",
                            borderRadius: "2px",
                          }}
                        />
                        Standard Inclusions
                      </h4>

                      <ul
                        className="list-unstyled"
                        style={{
                          color: "#b9b6d6",
                          fontSize: "14.5px",
                          lineHeight: "24px",
                          marginBottom: "40px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {[
                          {
                            text: "1 Table & 2 Chairs set up",
                            icon: "fa-chair",
                          },
                          {
                            text: "Basic Electricity power socket connection",
                            icon: "fa-bolt",
                          },
                          {
                            text: "Dedicated Fascia Branding Space",
                            icon: "fa-rectangle-ad",
                          },
                          {
                            text: "Complimentary pass for 2 representatives",
                            icon: "fa-id-card",
                          },
                        ].map((inc, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.04)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFE04B",
                                fontSize: "13px",
                                flexShrink: 0,
                              }}
                            >
                              <i className={`fa-solid ${inc.icon}`}></i>
                            </div>
                            <span>{inc.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <a
                        href="#stall-enquiry"
                        className="thm-btn design-btn w-100 text-center"
                        style={{
                          justifyContent: "center",
                          padding: "16px 20px",
                          borderRadius: "12px",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("stall-enquiry")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Enquire Standard Stall
                        <img
                          src="/assets/img/icon/right-arrow.svg"
                          alt=""
                          style={{ marginLeft: "10px" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Platinum Stall */}
                <div className="col-lg-5 col-md-6">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      height: "100%",
                      padding: "45px 35px",
                      border: "2px solid #FFE04B",
                      background:
                        "linear-gradient(145deg, rgba(130, 17, 79, 0.15) 0%, rgba(26, 2, 16, 0.7) 100%)",
                      borderRadius: "28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      boxShadow: "0 20px 50px rgba(255, 224, 75, 0.08)",
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor = "#FFE04B";
                      e.currentTarget.style.boxShadow =
                        "0 25px 55px rgba(255, 224, 75, 0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor = "#FFE04B";
                      e.currentTarget.style.boxShadow =
                        "0 20px 50px rgba(255, 224, 75, 0.08)";
                    }}
                  >
                    {/* Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-15px",
                        right: "35px",
                        background:
                          "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                        color: "#82114f",
                        padding: "6px 20px",
                        borderRadius: "30px",
                        fontSize: "11px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        boxShadow: "0 5px 15px rgba(255,224,75,0.3)",
                      }}
                    >
                      HIGH VISIBILITY
                    </div>

                    <div>
                      {/* Top Header Row */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "25px",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(255, 224, 75, 0.12)",
                            border: "1px solid #FFE04B",
                            color: "#FFE04B",
                            padding: "6px 16px",
                            borderRadius: "30px",
                            fontSize: "12px",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          Platinum Tier
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#FFE04B",
                          }}
                        >
                          <i
                            className="fa-solid fa-maximize"
                            style={{ fontSize: "13px" }}
                          ></i>
                          <span style={{ fontSize: "14px", fontWeight: "800" }}>
                            3m &times; 2m
                          </span>
                        </div>
                      </div>

                      {/* Package Name */}
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: "28px",
                          fontWeight: "800",
                          marginBottom: "15px",
                        }}
                      >
                        Platinum Stall
                      </h3>
                      <p
                        style={{
                          color: "#b9b6d6",
                          fontSize: "14px",
                          lineHeight: "24px",
                          marginBottom: "30px",
                        }}
                      >
                        Designed for industry leaders and wellness brands
                        demanding prime traffic placement, maximum crowd
                        visibility, and more space.
                      </p>

                      {/* Inclusions */}
                      <h4
                        style={{
                          color: "#FFE04B",
                          fontSize: "14px",
                          fontWeight: "800",
                          marginBottom: "20px",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "14px",
                            background: "#FFE04B",
                            borderRadius: "2px",
                          }}
                        />
                        Platinum Inclusions
                      </h4>

                      <ul
                        className="list-unstyled"
                        style={{
                          color: "#b9b6d6",
                          fontSize: "14.5px",
                          lineHeight: "24px",
                          marginBottom: "40px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {[
                          {
                            text: "Premium Venue Placement (High Footfall)",
                            icon: "fa-crown",
                            highlight: true,
                          },
                          {
                            text: "Maximum Brand Visibility layout",
                            icon: "fa-bullseye",
                            highlight: true,
                          },
                          {
                            text: "1 Table & 2 Chairs + Power sockets",
                            icon: "fa-chair",
                          },
                          {
                            text: "Large Fascia Branding Board space",
                            icon: "fa-rectangle-ad",
                          },
                          {
                            text: "Complimentary pass for 3 representatives",
                            icon: "fa-id-card",
                          },
                        ].map((inc, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                background: inc.highlight
                                  ? "rgba(255, 224, 75, 0.15)"
                                  : "rgba(255,255,255,0.04)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFE04B",
                                fontSize: "13px",
                                flexShrink: 0,
                                border: inc.highlight
                                  ? "1px solid rgba(255,224,75,0.3)"
                                  : "none",
                              }}
                            >
                              <i className={`fa-solid ${inc.icon}`}></i>
                            </div>
                            <span
                              style={
                                inc.highlight
                                  ? { color: "#fff", fontWeight: "700" }
                                  : {}
                              }
                            >
                              {inc.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <a
                        href="#stall-enquiry"
                        className="thm-btn design-btn w-100 text-center"
                        style={{
                          justifyContent: "center",
                          padding: "16px 20px",
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                          color: "#82114f",
                          borderColor: "#FFE04B",
                          fontWeight: "800",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("stall-enquiry")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Book Platinum Stall
                        <img
                          src="/assets/img/icon/right-arrow.svg"
                          alt=""
                          style={{
                            marginLeft: "10px",
                            filter:
                              "brightness(0) saturate(100%) invert(13%) sepia(87%) saturate(2256%) hue-rotate(304deg) brightness(82%) contrast(100%)",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Stall Packages Section End */}

          {/* Booking Status Progress Bars Start */}
          <section className="pb-100">
            <div className="container">
              <div className="sec-title text-center mb-60">
                <span className="sub-title" style={{ color: "#FFE04B" }}>
                  STALL AVAILABILITY
                </span>
                <h2 className="title" style={{ color: "#fff" }}>
                  Exhibition Booking Capacity
                </h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      padding: "30px 40px",
                    }}
                  >
                    <div className="mb-4">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        <span>Platinum Stalls (3m &times; 2m)</span>
                        <span style={{ color: "#FFE04B", fontWeight: "bold" }}>
                          85% Booked
                        </span>
                      </div>
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        <span>Standard Stalls (2m &times; 2m)</span>
                        <span style={{ color: "#FFE04B", fontWeight: "bold" }}>
                          74% Booked
                        </span>
                      </div>
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{ width: "74%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Booking Status Progress Bars End */}

          {/* Ayur Expo Achievements Start */}
          <section className="pb-100">
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
                        <span className="sub-title">
                          <img
                            src="/assets/img/icon/sub-icon.svg"
                            alt="icon-image"
                          />
                          Ayur Expo Achievements
                          <img
                            src="/assets/img/icon/sub-icon.svg"
                            alt="icon-image"
                          />
                        </span>
                        <h2 className="title">
                          India's Largest Ayurveda Brand Showcase!
                        </h2>
                        <p className="content">
                          Ayur Expo 2026 brings together the most influential
                          Ayurveda brands, manufacturers, and wellness
                          innovators under one roof — giving your brand direct
                          access to thousands of engaged practitioners,
                          students, and health enthusiasts.
                        </p>
                      </div>
                      <div className="hero-btn mt-55">
                        <a
                          href="#stall-enquiry"
                          className="thm-btn design-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById("stall-enquiry")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Book Your Stall
                          <img src="/assets/img/icon/right-arrow.svg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-50">
                    <div style={{ position: "relative" }}>
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
                          src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80"
                          alt="Ayur Expo Brand Exhibition"
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
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
                              className="fa-solid fa-store"
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
                              100+
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
                              Brand Exhibitors
                            </div>
                          </div>
                        </div>
                      </div>
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
                          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80"
                          alt="Expo Gathering"
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

                <div
                  className="row g-4 mt-60 justify-content-center"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  {[
                    {
                      num: "100",
                      suffix: "+",
                      text: "Brand Exhibitors",
                      desc: "Ayurveda companies & startups",
                      icon: "fa-store",
                      color: "#FFE04B",
                    },
                    {
                      num: "10000",
                      suffix: "+",
                      text: "Expo Visitors",
                      desc: "On-ground footfall expected",
                      icon: "fa-users-viewfinder",
                      color: "#ff7eb9",
                    },
                    {
                      num: "2",
                      suffix: " Days",
                      text: "Live Showcase",
                      desc: "Oct 1st & 2nd, 2026",
                      icon: "fa-calendar-days",
                      color: "#7afcff",
                    },
                    {
                      num: "4000",
                      suffix: "+",
                      text: "Delegates",
                      desc: "Targeted B2B audience",
                      icon: "fa-user-graduate",
                      color: "#c4ff7a",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="col-lg-3 col-sm-6">
                      <div
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "24px",
                          padding: "30px 20px",
                          textAlign: "center",
                          backdropFilter: "blur(12px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,224,75,0.5)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 35px rgba(255,224,75,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.15)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 30px rgba(0,0,0,0.25)";
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.03)",
                            border: `1.5px solid ${item.color}`,
                            boxShadow: `0 0 15px ${item.color}40`,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: item.color,
                            fontSize: "24px",
                            marginBottom: "20px",
                          }}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                        </div>
                        <h3
                          style={{
                            fontSize: "44px",
                            fontWeight: "800",
                            margin: "0 0 5px 0",
                            letterSpacing: "-1px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              background:
                                "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {item.num}
                          </span>
                          <span
                            style={{
                              color: "#FFE04B",
                              marginLeft: "2px",
                              fontSize: "28px",
                            }}
                          >
                            {item.suffix}
                          </span>
                        </h3>
                        <span
                          style={{
                            display: "block",
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: "700",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                          }}
                        >
                          {item.text}
                        </span>
                        <span
                          style={{
                            display: "block",
                            color: "#b9b6d6",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Ayur Expo Achievements End */}

          {/* Exhibitor Enquiry Form Start */}
          <section className="pb-120" id="stall-enquiry">
            <div className="container">
              {/* Section Header */}
              <div className="text-center mb-60">
                <span
                  style={{
                    color: "#FFE04B",
                    fontWeight: "700",
                    fontSize: "13px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  REGISTER YOUR BRAND
                </span>
                <h2
                  style={{
                    color: "#fff",
                    fontSize: "38px",
                    fontWeight: "800",
                    margin: "12px 0 14px 0",
                    lineHeight: "1.2",
                  }}
                >
                  Exhibitor Enquiry Form
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    fontSize: "16px",
                    maxWidth: "560px",
                    margin: "0 auto",
                  }}
                >
                  Fill in your details and our stall booking team will get back
                  to you within 24 hours.
                </p>
              </div>

              <div
                className="row g-0"
                style={{
                  borderRadius: "28px",
                  overflow: "hidden",
                  border: "2px solid #FFE04B",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                }}
              >
                {/* Left Image Panel */}
                <div
                  className="col-lg-4 d-none d-lg-block"
                  style={{ position: "relative", minHeight: "700px" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&q=80"
                    alt="Ayur Expo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Dark overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(160deg, rgba(130,17,79,0.75) 0%, rgba(30,10,40,0.88) 100%)",
                    }}
                  />
                  {/* Content over image */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "40px 32px",
                    }}
                  >
                    <div>
                      <img
                        src="/ayurmilan-logo1.png"
                        alt="AyurMilan"
                        style={{ height: "52px", marginBottom: "28px" }}
                      />
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: "22px",
                          fontWeight: "800",
                          lineHeight: "1.35",
                          marginBottom: "14px",
                        }}
                      >
                        Showcase Your Brand at India's Largest Ayurveda Expo
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "14px",
                          lineHeight: "1.7",
                        }}
                      >
                        Join 100+ exhibitors and connect with 10,000+ visitors,
                        practitioners, and delegates at Ayur Expo 2026.
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      {[
                        { icon: "fa-calendar-days", text: "Oct 1–2, 2026" },
                        {
                          icon: "fa-location-dot",
                          text: "Shri Krishan Janmashtami Ashram, Vrindavan",
                        },
                        { icon: "fa-users", text: "10,000+ Expected Visitors" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              background: "rgba(255,224,75,0.15)",
                              border: "1px solid rgba(255,224,75,0.3)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <i
                              className={`fa-solid ${item.icon}`}
                              style={{ color: "#FFE04B", fontSize: "13px" }}
                            ></i>
                          </div>
                          <span
                            style={{
                              color: "rgba(255,255,255,0.85)",
                              fontSize: "13px",
                              lineHeight: "1.5",
                              paddingTop: "6px",
                            }}
                          >
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Form Panel */}
                <div className="col-lg-8 col-12">
                  {enquired ? (
                    <div
                      style={{
                        background: "#ffffff",
                        padding: "60px 50px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          background: "rgba(130,17,79,0.1)",
                          border: "2px solid #82114f",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "32px",
                          color: "#82114f",
                          marginBottom: "24px",
                        }}
                      >
                        <i className="fa-solid fa-paper-plane"></i>
                      </div>
                      <h3
                        style={{
                          color: "#1d0314",
                          fontSize: "28px",
                          fontWeight: "800",
                          marginBottom: "14px",
                        }}
                      >
                        Enquiry Received!
                      </h3>
                      <p
                        style={{
                          color: "#555555",
                          fontSize: "15px",
                          lineHeight: "26px",
                          maxWidth: "460px",
                          marginBottom: "32px",
                        }}
                      >
                        Thank you,{" "}
                        <strong style={{ color: "#1d0314" }}>
                          {formData.contactName}
                        </strong>{" "}
                        from{" "}
                        <strong style={{ color: "#1d0314" }}>
                          {formData.companyName}
                        </strong>
                        . Our team will reach you at{" "}
                        <strong style={{ color: "#82114F" }}>
                          {formData.email}
                        </strong>{" "}
                        or{" "}
                        <strong style={{ color: "#82114F" }}>
                          {formData.phone}
                        </strong>{" "}
                        within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setEnquired(false);
                          setFormData({
                            companyName: "",
                            contactName: "",
                            email: "",
                            phone: "",
                            category: "",
                            country: "",
                            state: "",
                            city: "",
                            street: "",
                            zip: "",
                            productCategories: [],
                          });
                        }}
                        className="thm-btn design-btn"
                      >
                        Submit Another Enquiry{" "}
                        <img src="/assets/img/icon/right-arrow.svg" alt="" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="exhibitor-form-wrapper"
                      style={{
                        background: "#ffffff",
                        padding: "48px 50px",
                      }}
                    >
                      <form onSubmit={handleSubmit}>
                        {/* Row 1: Company & Contact Person */}
                        <div className="row g-4 mb-4">
                          <div className="col-md-6">
                            <label style={labelStyle}>
                              Company Name{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="companyName"
                              type="text"
                              placeholder="Enter Your Company Name"
                              value={formData.companyName}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label style={labelStyle}>
                              Contact Person Name{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="contactName"
                              type="text"
                              placeholder="Enter Contact Person Name"
                              value={formData.contactName}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>

                        {/* Row 2: Email & Phone */}
                        <div className="row g-4 mb-4">
                          <div className="col-md-6">
                            <label style={labelStyle}>
                              Enter Your Email{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter Your Email"
                              value={formData.email}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label style={labelStyle}>
                              Phone Number{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              placeholder="Enter Mobile Number (e.g. +91 99999 99999)"
                              value={formData.phone}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>

                        {/* Row 3: Category & Country */}
                        <div className="row g-4 mb-4">
                          <div className="col-md-6">
                            <label style={labelStyle}>
                              Category{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <select
                              id="category"
                              value={formData.category}
                              onChange={handleChange}
                              style={{ ...inputStyle, appearance: "none" }}
                              required
                            >
                              <option value="" style={{ color: "#000" }}>
                                Select Category
                              </option>
                              <option
                                value="Title Sponsor"
                                style={{ color: "#000" }}
                              >
                                Title Sponsor
                              </option>
                              <option
                                value="Co Powered By"
                                style={{ color: "#000" }}
                              >
                                Co Powered By
                              </option>
                              <option
                                value="Powered By"
                                style={{ color: "#000" }}
                              >
                                Powered By
                              </option>
                              <option
                                value="Platinum Sponsor"
                                style={{ color: "#000" }}
                              >
                                Platinum Sponsor
                              </option>
                              <option
                                value="Gold Sponsor"
                                style={{ color: "#000" }}
                              >
                                Gold Sponsor
                              </option>
                              <option
                                value="Associate Sponsor"
                                style={{ color: "#000" }}
                              >
                                Associate Sponsor
                              </option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label style={labelStyle}>
                              Country{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="country"
                              type="text"
                              placeholder="Enter Your Country Name"
                              value={formData.country}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>

                        {/* Row 4: Street Address */}
                        <div className="row g-4 mb-4">
                          <div className="col-12">
                            <label style={labelStyle}>
                              Street Address{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="street"
                              type="text"
                              placeholder="Enter Your Street Name & Address"
                              value={formData.street}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>

                        {/* Row 5: City, State, Zip */}
                        <div className="row g-4 mb-4">
                          <div className="col-md-4 col-sm-6">
                            <label style={labelStyle}>
                              City <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="city"
                              type="text"
                              placeholder="Enter City Name"
                              value={formData.city}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <label style={labelStyle}>
                              State <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="state"
                              type="text"
                              placeholder="Enter State Name"
                              value={formData.state}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-4 col-12">
                            <label style={labelStyle}>
                              Zip Code{" "}
                              <span style={{ color: "#FFE04B" }}>*</span>
                            </label>
                            <input
                              id="zip"
                              type="text"
                              placeholder="Enter Zip Code"
                              value={formData.zip}
                              onChange={handleChange}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>

                        {/* Product Categories */}
                        <div
                          className="mb-4"
                          style={{
                            background: "#f8f9fa",
                            border: "1.5px solid rgba(0,0,0,0.1)",
                            padding: "24px",
                            borderRadius: "16px",
                          }}
                        >
                          <label
                            style={{
                              ...labelStyle,
                              marginBottom: "16px",
                              display: "block",
                              fontSize: "15px",
                              color: "#82114F",
                            }}
                          >
                            Your Product Categories
                          </label>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {productCategoryOptions.map((opt, i) => {
                              const isSelected =
                                formData.productCategories.includes(opt);
                              return (
                                <button
                                  type="button"
                                  key={i}
                                  onClick={() => handleCheckbox(opt)}
                                  style={{
                                    padding: "8px 14px",
                                    borderRadius: "20px",
                                    border: isSelected
                                      ? "1.5px solid #82114F"
                                      : "1.5px solid rgba(0,0,0,0.15)",
                                    background: isSelected
                                      ? "rgba(130, 17, 79, 0.08)"
                                      : "#ffffff",
                                    color: isSelected ? "#82114F" : "#555555",
                                    fontSize: "12.5px",
                                    fontWeight: isSelected ? "700" : "500",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  {isSelected && (
                                    <i
                                      className="fa-solid fa-check"
                                      style={{
                                        color: "#82114F",
                                        fontSize: "10px",
                                      }}
                                    ></i>
                                  )}
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {errorMessage && (
                          <div
                            style={{
                              color: "#ff6b6b",
                              background: "rgba(255,107,107,0.1)",
                              padding: "10px 15px",
                              borderRadius: "8px",
                              marginBottom: "15px",
                              fontSize: "14px",
                              fontWeight: "bold",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            ⚠️ {errorMessage}
                          </div>
                        )}
                        {/* Submit */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "30px",
                          }}
                        >
                          <button
                            type="submit"
                            className="thm-btn design-btn"
                            style={{
                              minWidth: "200px",
                              justifyContent: "center",
                            }}
                            disabled={loading}
                          >
                            {loading ? "Submitting..." : "Submit Enquiry"}
                            <img
                              src="/assets/img/icon/right-arrow.svg"
                              alt=""
                            />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* Exhibitor Enquiry Form End */}

          {/* Brand Showcase Logos Section */}
          {logos.length > 0 && (
            <section className="pb-100 pt-50">
              <div className="container">
                <div className="sec-title text-center mb-60">
                  <span
                    className="sub-title"
                    style={{ color: "#FFE04B", fontWeight: "bold" }}
                  >
                    OUR SPONSORS & EXHIBITORS
                  </span>
                  <h2
                    className="title"
                    style={{ color: "#fff", fontSize: "38px", fontWeight: "800" }}
                  >
                    Featured Brands & Partners
                  </h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {logos.map((logo, idx) => (
                    <div
                      key={logo.id || idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        padding: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "110px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,224,75,0.4)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      {logo.logoBase64 ? (
                        <img
                          src={logo.logoBase64}
                          alt={logo.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : logo.logoUrl ? (
                        <img
                          src={logo.logoUrl}
                          alt={logo.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {logo.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
