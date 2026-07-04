import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Team() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  const organizers = [
    {
      name: "Vd. Nishant Kumar Mishra",
      desig: "Co-Organizer",
      icon: "fa-user-doctor",
      img: "/assets/img/team/nishant_kumar.jpg",
    },
    {
      name: "Dr. Aditi Jain",
      desig: "Co-Organizer",
      icon: "fa-user-doctor",
      img: "/assets/img/team/aditi_jain.jpg",
    },
    {
      name: "Vd. Mehul",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/vd_mehul.jpg",
    },
    {
      name: "Vd. Vaishnavi",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/vaishnavi.jpg",
    },
    {
      name: "Vd. Ashutosh Soni",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/ashutosh_soni.jpg",
    },
    {
      name: "Dr. Anusha Gupta",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/anusha_gupta.jpg",
    },
    {
      name: "Vd. Pooja",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/vd_pooja.jpg",
    },
    {
      name: "Vd. Priyansh",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/priyansh.jpg",
    },
    {
      name: "Vd. Chirag Singla",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/chirag_singla.jpg",
    },
    {
      name: "Vd. Raman",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/vd_raman.jpg",
    },
    {
      name: "Vd. Tanvi Arora",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/tanvi_arora.jpg",
    },
    {
      name: "Vd. Arrush",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/arrush.jpg",
    },
    {
      name: "Vd. Harshita Gupta",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/harshita_gupta.jpg",
    },
    {
      name: "Vd. Shikha Malik",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/shikha_malik.jpg",
    },
    {
      name: "Vd. Sakshi Saini",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/sakshi_saini.jpg",
    },
    {
      name: "Vd. Amit Biswas",
      desig: "Core Team",
      icon: "fa-user",
      img: "/assets/img/team/amit_biswas.jpg",
    },
  ];

  const supportingHands = [
    {
      name: "Vd. Balwinder Thakur",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/balwinder_thakur.jpg",
    },
    {
      name: "Vd. Laxmikant Mishra",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/laxmikant_mishra.jpg",
    },
    {
      name: "Vd. Jaskeerat",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/jaskeerat.jpg",
    },
    {
      name: "Vd. Ashutosh",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/ashutosh.jpg",
    },
    {
      name: "Vd. Kajal Dagar",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/kajal_dagar.jpg",
    },
    {
      name: "Vd. Anmoldeep Singh",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/anmoldeep_singh.jpg",
    },
    {
      name: "Vd. Ranveer",
      desig: "Supporting Hand",
      icon: "fa-handshake-angle",
      img: "/assets/img/team/ranveer.jpg",
    },
  ];

  return (
    <div
      className="design-conference"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background Shapes */}
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ top: "150px", left: "8%", width: "40px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape-slow"
        style={{ top: "550px", right: "6%", width: "35px", opacity: 0.25 }}
        alt=""
      />
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ bottom: "220px", left: "12%", width: "30px", opacity: 0.2 }}
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
                  Organizing Committee
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
                  Our Team
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Organizers Spotlight Start */}
          <section className="pt-100 pb-100 pos-rel">
            {/* ambient glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "600px",
                height: "600px",
                background:
                  "radial-gradient(circle, rgba(165,7,102,0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <div
              className="container"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="sec-title text-center mb-70">
                <span
                  className="sub-title"
                  style={{
                    color: "#FFE04B",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  THE LEADERSHIP
                </span>
                <h2
                  className="title"
                  style={{ color: "#fff", fontSize: "44px", fontWeight: "800" }}
                >
                  Visionaries Behind AyurMilan
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    maxWidth: "600px",
                    margin: "15px auto 0",
                    fontSize: "16px",
                    lineHeight: "27px",
                  }}
                >
                  Three passionate Ayurveda professionals who turned a vision
                  into India's most anticipated Ayurveda gathering.
                </p>
              </div>

              {/* Featured organizer — Vd. Lovem Singla (Chairman) */}
              <div className="row align-items-center g-5 mb-80">
                <div className="col-lg-5">
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    {/* dot grid */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-15px",
                        left: "-15px",
                        width: "90px",
                        height: "90px",
                        backgroundImage:
                          "radial-gradient(rgba(255,224,75,0.35) 20%, transparent 20%)",
                        backgroundSize: "14px 14px",
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />
                    {/* gold ring */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-12px",
                        right: "-12px",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "2px dashed rgba(255,224,75,0.3)",
                        zIndex: 0,
                      }}
                    />
                    <div
                      style={{
                        borderRadius: "24px",
                        overflow: "hidden",
                        position: "relative",
                        zIndex: 1,
                        border: "2px solid rgba(255,224,75,0.4)",
                        boxShadow:
                          "0 25px 60px rgba(0,0,0,0.45), 0 0 40px rgba(255,224,75,0.08)",
                      }}
                    >
                      <img
                        src="./dr-lovem.png"
                        alt="Vd. Lovem Singla"
                        style={{
                          width: "100%",
                          height: "420px",
                          objectFit: "cover",
                          objectPosition: "top",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(20,0,15,0.8) 0%, transparent 55%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "20px",
                          left: "20px",
                        }}
                      >
                        <span
                          style={{
                            background: "#FFE04B",
                            color: "#82114f",
                            fontSize: "11px",
                            fontWeight: "800",
                            padding: "4px 14px",
                            borderRadius: "20px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          Organizing Chairman
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div style={{ paddingLeft: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "3px",
                          background:
                            "linear-gradient(90deg, #FFE04B, #D78633)",
                          borderRadius: "2px",
                        }}
                      />
                      <span
                        style={{
                          color: "#FFE04B",
                          fontSize: "13px",
                          fontWeight: "700",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                        }}
                      >
                        Organizing Chairman
                      </span>
                    </div>
                    <h2
                      style={{
                        color: "#fff",
                        fontSize: "42px",
                        fontWeight: "800",
                        lineHeight: 1.15,
                        marginBottom: "20px",
                      }}
                    >
                      Vd. Lovem Singla
                    </h2>
                    <p
                      style={{
                        color: "#e2e0ff",
                        fontSize: "17px",
                        lineHeight: "30px",
                        marginBottom: "16px",
                      }}
                    >
                      The driving force behind AyurMilan, Vd. Lovem Singla
                      brings a rare combination of clinical expertise and
                      organizational vision. His leadership has shaped the
                      academic framework of the event from the ground up.
                    </p>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "15px",
                        lineHeight: "27px",
                        marginBottom: "30px",
                      }}
                    >
                      With a deep commitment to elevating Ayurveda education in
                      India, he has personally curated the speaker lineup,
                      workshop modules, and the overall delegate experience for
                      AyurMilan 2026.
                    </p>
                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      {[
                        "Clinical Leadership",
                        "Academic Curation",
                        "Event Strategy",
                      ].map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            background: "rgba(255,224,75,0.08)",
                            border: "1px solid rgba(255,224,75,0.25)",
                            color: "#FFE04B",
                            fontSize: "12px",
                            fontWeight: "700",
                            padding: "6px 16px",
                            borderRadius: "30px",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Directors — Vd. Vansh & Vd. Yadwinder side by side */}
              <div className="row g-4 justify-content-center">
                {[
                  {
                    name: "Vd. Vansh Chhabra",
                    role: "Director & Co-Founder",
                    img: "./vd-vansh.jpeg",
                    bio: "Leading digital strategy and delegate outreach for India's BAMS community.",
                    tags: [
                      "Digital Strategy",
                      "Community Building",
                      "Brand Outreach",
                    ],
                    accent: "#7afcff",
                  },
                  {
                    name: "Vd. Yadwinder Joshi",
                    role: "Director & Co-Founder",
                    img: "./vd-yadvinder.jpeg",
                    bio: "Managing on-ground summit operations, exhibitor relations, and logistics.",
                    tags: ["Operations", "Exhibitor Relations", "Logistics"],
                    accent: "#ff7eb9",
                  },
                ].map((person, idx) => (
                  <div className="col-lg-5 col-md-6" key={idx}>
                    <div
                      style={{
                        borderRadius: "24px",
                        overflow: "hidden",
                        border: `1px solid rgba(255,255,255,0.12)`,
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                        transition: "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.borderColor = person.accent;
                        e.currentTarget.style.boxShadow = `0 20px 45px rgba(0, 0, 0, 0.45)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
                      }}
                    >
                      {/* Image container with fixed height */}
                      <div
                        style={{
                          height: "360px",
                          width: "100%",
                          overflow: "hidden",
                          position: "relative",
                          background: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <img
                          src={person.img}
                          alt={person.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                            transition: "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                        />
                      </div>

                      {/* Content block */}
                      <div
                        style={{
                          padding: "26px",
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: person.accent,
                              fontSize: "11px",
                              fontWeight: "700",
                              letterSpacing: "2.5px",
                              textTransform: "uppercase",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            {person.role}
                          </span>
                          <h3
                            style={{
                              color: "#fff",
                              fontSize: "24px",
                              fontWeight: "800",
                              marginBottom: "10px",
                              lineHeight: 1.2,
                            }}
                          >
                            {person.name}
                          </h3>
                          <p
                            style={{
                              color: "#b9b6d6",
                              fontSize: "14px",
                              lineHeight: "22px",
                              marginBottom: "18px",
                            }}
                          >
                            {person.bio}
                          </p>
                        </div>

                        {/* Tags */}
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            paddingTop: "16px"
                          }}
                        >
                          {person.tags.map((tag, i) => (
                            <span
                              key={i}
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "#FFE04B",
                                fontSize: "11px",
                                fontWeight: "600",
                                padding: "4px 12px",
                                borderRadius: "20px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Organizers Spotlight End */}

          {/* Organizing Committee Grid Start */}
          <section className="pb-100">
            <div className="container">
              <div className="sec-title text-center mb-60">
                <span className="sub-title" style={{ color: "#FFE04B" }}>
                  TEAM GRID
                </span>
                <h2 className="title" style={{ color: "#fff" }}>
                  Organizing Committee Directory
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    maxWidth: "700px",
                    margin: "15px auto 0",
                  }}
                >
                  Meet the coordinators, organizers, and BAMS volunteers
                  managing the logistics of AyurMilan.
                </p>
              </div>

              <div className="row g-4 justify-content-center">
                {organizers.map((org, idx) => (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                    key={idx}
                  >
                    <div
                      style={{
                        height: "100%",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.03)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                        transition: "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 224, 75, 0.45)";
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 18px 40px rgba(255, 224, 75, 0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
                      }}
                    >
                      {/* Image container with fixed height & cover fit */}
                      <div style={{ height: "260px", width: "100%", overflow: "hidden", position: "relative", background: "rgba(0,0,0,0.2)" }}>
                        {org.img ? (
                          <img
                            src={org.img}
                            alt={org.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top",
                              transition: "transform 0.5s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                          />
                        ) : (
                          <div style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(135deg, rgba(130,17,79,0.3) 0%, rgba(26,2,16,0.6) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255, 224, 75, 0.6)"
                          }}>
                            <i className={`fa-solid ${org.icon}`} style={{ fontSize: "52px" }}></i>
                          </div>
                        )}
                      </div>

                      {/* Content block */}
                      <div style={{ padding: "22px 20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                        <h3
                          style={{
                            color: "#fff",
                            fontSize: "17px",
                            marginBottom: "6px",
                            fontWeight: "800",
                            lineHeight: "1.3"
                          }}
                        >
                          {org.name}
                        </h3>
                        <p
                          style={{
                            color: "#FFE04B",
                            fontSize: "11px",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            margin: 0
                          }}
                        >
                          {org.desig}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Organizing Committee Grid End */}

          {/* Supporting Team Start */}
          <section className="pb-120">
            <div className="container">
              <div className="sec-title text-center mb-60">
                <span className="sub-title" style={{ color: "#FFE04B" }}>
                  SUPPORTING HANDS
                </span>
                <h2 className="title" style={{ color: "#fff" }}>
                  Supporting Team
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    maxWidth: "700px",
                    margin: "15px auto 0",
                  }}
                >
                  Special coordinators assisting with on-ground execution,
                  academic coordination, and visitor support.
                </p>
              </div>

              <div className="row g-4 justify-content-center">
                {supportingHands.map((sup, idx) => (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                    key={idx}
                  >
                    <div
                      style={{
                        height: "100%",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.03)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                        transition: "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 224, 75, 0.45)";
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 18px 40px rgba(255, 224, 75, 0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
                      }}
                    >
                      {/* Image container with fixed height & cover fit */}
                      <div style={{ height: "240px", width: "100%", overflow: "hidden", position: "relative", background: "rgba(0,0,0,0.2)" }}>
                        {sup.img ? (
                          <img
                            src={sup.img}
                            alt={sup.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top",
                              transition: "transform 0.5s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                          />
                        ) : (
                          <div style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(135deg, rgba(165,7,102,0.3) 0%, rgba(26,2,16,0.6) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255, 224, 75, 0.6)"
                          }}>
                            <i className={`fa-solid ${sup.icon}`} style={{ fontSize: "44px" }}></i>
                          </div>
                        )}
                      </div>

                      {/* Content block */}
                      <div style={{ padding: "20px 15px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                        <h3
                          style={{
                            color: "#fff",
                            fontSize: "16px",
                            marginBottom: "6px",
                            fontWeight: "800",
                            lineHeight: "1.3"
                          }}
                        >
                          {sup.name}
                        </h3>
                        <p
                          style={{
                            color: "#FFE04B",
                            fontSize: "11px",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            margin: 0
                          }}
                        >
                          {sup.desig}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Supporting Team End */}
        </main>
      </div>
    </div>
  );
}
