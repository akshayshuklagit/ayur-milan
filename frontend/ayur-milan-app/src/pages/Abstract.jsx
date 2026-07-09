import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Abstract() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  const [activeFaq, setActiveFaq] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const emailTemplate = `Dear Scientific Committee,
AyurMilan 2026,

I am writing to submit my abstract for presentation at AyurMilan 2026. Please find the details of my submission below:

Presenter Name: [Your Name]
Registration ID: [Your AyurMilan Registration ID]
Category/Specialty: [e.g., Kayachikitsa]
Presentation Type: [Paper / Poster / Case Presentation]
Abstract Title: [Enter Title of your abstract]
Phone Number: [Your Contact Number]
Institution/College: [Name of your Institution]

I have attached the abstract in MS Word (.doc/.docx) / PDF format following the guidelines (Times New Roman, 12pt, 1.5 line spacing, 250-300 words).

Thank you for your time and consideration.

Warm regards,
[Your Name]
[Your Designation/Year]
[Your College/Hospital]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const mailtoUrl = `mailto:Ayurmilaneducation@gmail.com?subject=\${encodeURIComponent("Abstract Submission - [Your Name] - [Topic]")}&body=\${encodeURIComponent(emailTemplate)}`;

  const abstractTopics = [
    {
      category: "1. Kayachikitsa",
      icon: "fa-stethoscope",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      topics: [
        "Integrative Medicine in Modern Healthcare",
        "Role of Ayurveda in Lifestyle Disorders",
        "Gut Health and Agni Concept",
        "PMOS in Ayurvedic Perspective"
      ]
    },
    {
      category: "2. Panchakarma",
      icon: "fa-spa",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80",
      topics: [
        "Scientific Validation of Panchakarma Therapies",
        "Role of Basti in Neurological Disorders",
        "Clinical Importance of Nasya Karma"
      ]
    },
    {
      category: "3. Dravyaguna Vigyana",
      icon: "fa-leaf",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80",
      topics: [
        "Medicinal Plants with Antiviral Properties",
        "Herbal Immunomodulators in Ayurveda",
        "Drug Standardization and Safety"
      ]
    },
    {
      category: "4. Rachana Sharir",
      icon: "fa-child",
      image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=400&q=80",
      topics: [
        "Correlation of Marma Sharir with Modern Anatomy",
        "Concept of Srotas and Body Systems",
        "Embryology in Ayurveda"
      ]
    },
    {
      category: "5. Kriya Sharir",
      icon: "fa-heart-pulse",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
      topics: [
        "Tridosha Theory and Homeostasis",
        "Physiology of Agni",
        "Mind–Body Connection in Ayurveda"
      ]
    },
    {
      category: "6. Rog Nidana & Vikriti Vigyana",
      icon: "fa-microscope",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351167?w=400&q=80",
      topics: [
        "Diagnostic Approaches in Ayurveda",
        "Nadi Pariksha and Disease Assessment",
        "Disease Correlation Studies"
      ]
    },
    {
      category: "7. Shalya Tantra",
      icon: "fa-kit-medical",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&q=80",
      topics: [
        "Ksharsutra Therapy in Ano-Rectal Disorders",
        "Agnikarma in Pain Management",
        "Wound Healing through Ayurveda"
      ]
    },
    {
      category: "8. Shalakya Tantra",
      icon: "fa-eye",
      image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=400&q=80",
      topics: [
        "Ayurvedic Eye Care in the Digital Era",
        "Ayurvedic Management of Migraine",
        "Role of Nasya in Sinusitis"
      ]
    },
    {
      category: "9. Prasuti Tantra & Stri Roga",
      icon: "fa-baby-carriage",
      image: "https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9d?w=400&q=80",
      topics: [
        "Infertility Management through Ayurveda",
        "Pregnancy and Postnatal Care"
      ]
    },
    {
      category: "10. Kaumarbhritya",
      icon: "fa-baby",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&q=80",
      topics: [
        "Swarnaprashan: Clinical Perspective",
        "Child Immunity and Nutrition",
        "Pediatric Digestive Disorders"
      ]
    },
    {
      category: "11. Swasthavritta & Yoga",
      icon: "fa-om",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
      topics: [
        "Yoga and Ayurveda for Mental Wellness",
        "Dinacharya and Preventive Healthcare",
        "Digital Detox through Ayurveda"
      ]
    },
    {
      category: "12. Agad Tantra",
      icon: "fa-biohazard",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80",
      topics: [
        "Food Toxicity and Ayurveda",
        "Environmental Toxins and Health",
        "Herbal Poisoning Awareness"
      ]
    },
    {
      category: "13. Rasa Shastra & Bhaishajya Kalpana",
      icon: "fa-mortar-pestle",
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&q=80",
      topics: [
        "Nanotechnology in Rasashastra",
        "Safety of Herbo-Minerals Preparations",
        "Role of Bhavana in Drug Potentiation"
      ]
    },
    {
      category: "14. Samhita & Siddhanta",
      icon: "fa-book-open",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
      topics: [
        "Tridosha Siddhanta in Modern Context",
        "Relevance of Classical Ayurvedic Texts",
        "Dinacharya and Ritucharya Concepts"
      ]
    },
    {
      category: "15. Research & Innovation",
      icon: "fa-lightbulb",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
      topics: [
        "Artificial Intelligence and Ayurveda",
        "Evidence-Based Ayurveda",
        "Clinical Trials in Ayurvedic Medicine"
      ]
    },
    {
      category: "16. Emerging Trends in Ayurveda",
      icon: "fa-chart-line",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80",
      topics: [
        "Personalised Medicine through Prakriti Analysis",
        "Ayurveda for Fitness and Wellness",
        "Future of Ayurveda after AI Revolution"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the maximum word limit for the abstract text?",
      a: "The abstract text must be between 250 to 300 words, excluding the title, author names, and institution details.",
    },
    {
      q: "Is registration compulsory before abstract submission?",
      a: "Yes! Only abstracts submitted by registered delegates (who have completed their registration) will be reviewed by the Scientific Committee.",
    },
    {
      q: "Can I submit more than one abstract as a presenter?",
      a: "A primary presenter can submit only one abstract. However, you can be listed as a co-author on multiple submissions.",
    },
    {
      q: "What format should the abstract be submitted in?",
      a: "Abstracts must be submitted in MS Word (.doc/.docx) or PDF format directly via email to Ayurmilaneducation@gmail.com.",
    },
  ];


  return (
    <div
      className="design-conference abstract-page-body"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background Shapes */}
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ top: "160px", left: "8%", width: "45px", opacity: 0.3 }}
        alt=""
      />
      <img
        src="/assets/img/shape/line-stroke.png"
        className="floating-shape-slow"
        style={{ top: "350px", right: "5%", width: "120px", opacity: 0.15 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape"
        style={{ bottom: "200px", left: "10%", width: "30px", opacity: 0.2 }}
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
                  Research & Presentations
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
                  Abstract Submission
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Call for Abstracts Content Start */}
          <section
            className="abstract-section pt-100 pb-100"
            style={{
              backgroundImage: "url('/assets/img/bg/abstract_edu_bg.png')",
              position: "relative"
            }}
          >
            <div
              className="abstract-bg-overlay-3"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                background: "radial-gradient(circle at 50% 50%, rgba(165, 7, 102, 0.9) 0%, rgba(130, 17, 79, 0.95) 60%, rgba(26, 2, 16, 0.98) 100%)",
              }}
            />
            <div
              className="container"
              style={{ position: "relative", zIndex: 2 }}
            >
              {/* CALL FOR ABSTRACTS HEADER */}
              <div className="text-center mb-60">
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #82114f 0%, #a50766 100%)",
                  padding: "15px 40px",
                  borderRadius: "50px",
                  border: "2px solid #FFE04B",
                  boxShadow: "0 8px 25px rgba(130, 17, 79, 0.4)",
                  marginBottom: "20px"
                }}>
                  <h2 style={{ color: "#fff", fontSize: "36px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                    Call For Abstracts
                  </h2>
                </div>
                <h4 style={{ color: "#FFE04B", fontSize: "20px", fontWeight: "600", letterSpacing: "0.5px" }}>
                  Paper Presentation | Poster Presentation | Case Presentation
                </h4>
                <p style={{ fontStyle: "italic", color: "#fff", fontSize: "18px", marginTop: "20px", maxWidth: "800px", marginInline: "auto" }}>
                  "Advancing Ayurveda through Research, Clinical Excellence and Innovation"
                </p>
                <p style={{ color: "#b9b6d6", fontSize: "16px", lineHeight: "28px", maxWidth: "900px", margin: "20px auto 0" }}>
                  AyurMilan invites undergraduate students, postgraduate scholars, researchers, academicians and practitioners to submit abstracts for scientific presentations. This platform aims to encourage research culture, academic discussions and innovative ideas in the field of Ayurveda while bridging classical knowledge with modern perspectives.
                </p>
              </div>

              {/* Promotional Banner Image (home4.png) */}
              <div 
                className="text-center mb-60"
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
                  border: "2px solid rgba(255, 224, 75, 0.2)",
                  position: "relative",
                  maxWidth: "960px",
                  marginInline: "auto"
                }}
              >
                <img 
                  src="/home4.png" 
                  alt="AyurMilan Event Highlight" 
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "450px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(26, 2, 16, 0.95), transparent)",
                  padding: "30px 20px 20px",
                  textAlign: "center"
                }}>
                  <span style={{
                    background: "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                    color: "#1a0210",
                    fontWeight: "800",
                    fontSize: "12px",
                    padding: "4px 16px",
                    borderRadius: "30px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "inline-block",
                    marginBottom: "10px"
                  }}>
                    Featured Event Highlights
                  </span>
                </div>
              </div>

              {/* ELIGIBILITY & GUIDELINES */}
              <div className="row">
                {/* Eligibility Card */}
                <div className="col-lg-6 mb-4">
                  <div style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "0 0 30px 0",
                    height: "100%",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}>
                    <div style={{ background: "#82114f", padding: "15px 20px", textAlign: "center", borderBottom: "2px solid #FFE04B" }}>
                      <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", textTransform: "uppercase", margin: 0 }}>
                        <i className="fa-solid fa-user-check" style={{ marginRight: "10px", color: "#FFE04B" }}></i>
                        Eligibility
                      </h3>
                    </div>
                    <ul style={{ padding: "30px 40px 10px", margin: 0, listStyleType: "none" }}>
                      {[
                        { text: "Undergraduate Students (BAMS)", icon: "fa-graduation-cap" },
                        { text: "Postgraduate Scholars", icon: "fa-user-graduate" },
                        { text: "Researchers", icon: "fa-microscope" },
                        { text: "Faculty Members", icon: "fa-placeholder" }, // placeholder fallback
                        { text: "Practitioners", icon: "fa-user-doctor" }
                      ].map((item, idx) => {
                        let actualIcon = item.icon;
                        if (item.text.includes("Faculty")) actualIcon = "fa-chalkboard-user";
                        return (
                          <li key={idx} style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "15px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.2)" }}>
                              <i className={`fa-solid ${actualIcon}`} style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                            </div>
                            <span>{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Guidelines Card */}
                <div className="col-lg-6 mb-4">
                  <div style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "0 0 30px 0",
                    height: "100%",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}>
                    <div style={{ background: "#82114f", padding: "15px 20px", textAlign: "center", borderBottom: "2px solid #FFE04B" }}>
                      <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", textTransform: "uppercase", margin: 0 }}>
                        <i className="fa-solid fa-list-check" style={{ marginRight: "10px", color: "#FFE04B" }}></i>
                        Guidelines for Abstract Submission
                      </h3>
                    </div>
                    <ul style={{ padding: "30px 40px 10px", margin: 0, listStyleType: "none" }}>
                      {[
                        { text: "Abstract should be submitted in MS Word (.doc/.docx) or PDF format", icon: "fa-file-word" },
                        { text: "Word limit: 250–300 words", icon: "fa-calculator" },
                        { text: "Language: English", icon: "fa-language" },
                        { text: "Font: Times New Roman", icon: "fa-font" },
                        { text: "Font size: 12", icon: "fa-text-height" },
                        { text: "Line spacing: 1.5", icon: "fa-arrows-up-down" }
                      ].map((item, idx) => (
                        <li key={idx} style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "15px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.2)", marginTop: "2px" }}>
                            <i className={`fa-solid ${item.icon}`} style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                          </div>
                          <span style={{ marginTop: "4px" }}>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ABSTRACT STRUCTURE */}
              <div className="row mt-4 mb-4">
                <div className="col-12">
                  <div style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "0 0 30px 0",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}>
                    <div style={{ background: "#82114f", padding: "15px 20px", textAlign: "center", borderBottom: "2px solid #FFE04B" }}>
                      <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", textTransform: "uppercase", margin: 0 }}>
                        <i className="fa-solid fa-sitemap" style={{ marginRight: "10px", color: "#FFE04B" }}></i>
                        Abstract Structure
                      </h3>
                    </div>
                    <div className="row" style={{ padding: "30px 40px 0" }}>
                      <div className="col-md-6">
                        <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                          {[
                            { text: "Title", icon: "fa-heading" },
                            { text: "Introduction / Background", icon: "fa-book-open" },
                            { text: "Aim & Objectives", icon: "fa-bullseye" }
                          ].map((item, idx) => (
                            <li key={idx} style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "15px" }}>
                              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.2)" }}>
                                <i className={`fa-solid ${item.icon}`} style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                              </div>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                          {[
                            { text: "Methodology / Concept", icon: "fa-flask" },
                            { text: "Results / Discussion (if applicable)", icon: "fa-chart-column" },
                            { text: "Conclusion", icon: "fa-square-check" }
                          ].map((item, idx) => (
                            <li key={idx} style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "15px" }}>
                              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.2)" }}>
                                <i className={`fa-solid ${item.icon}`} style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                              </div>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SELECTION PROCESS */}
              <div className="row mt-4 mb-4">
                <div className="col-12">
                  <div style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 224, 75, 0.15)",
                    borderRadius: "24px",
                    padding: "35px",
                    textAlign: "center",
                    boxShadow: "inset 0 0 20px rgba(255, 224, 75, 0.03)"
                  }}>
                    <h3 style={{ color: "#FFE04B", fontSize: "24px", fontWeight: "700", fontStyle: "italic", marginBottom: "15px" }}>
                      Selection Process
                    </h3>
                    <p style={{ color: "#fff", fontSize: "17px", lineHeight: "30px", margin: 0, maxWidth: "850px", marginInline: "auto" }}>
                      All submitted abstracts will be reviewed by the Scientific Committee. Selected participants will receive an acceptance notification along with further presentation details.
                    </p>
                  </div>
                </div>
              </div>

              {/* ABSTRACT TOPICS SECTION */}
              <div className="row mt-5 mb-5">
                <div className="col-12">
                  <div style={{
                    textAlign: "center",
                    marginBottom: "40px"
                  }}>
                    <h3 style={{ color: "#FFE04B", fontSize: "28px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
                      Topics for Abstract Submission
                    </h3>
                    <p style={{ color: "#b9b6d6", fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}>
                      Presenters must select a topic from the 16 scientific specialties listed in the official AyurMilan brochure:
                    </p>
                  </div>
                </div>
                
              {/* Modern CSS Grid instead of Bootstrap column system */}
              <div 
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
                  columnGap: "40px",
                  rowGap: "30px",
                  marginTop: "40px",
                  marginBottom: "40px"
                }}
              >
                {abstractTopics.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      paddingBottom: "25px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      const iconContainer = e.currentTarget.querySelector(".specialty-icon-container");
                      if (iconContainer) {
                        iconContainer.style.background = "#FFE04B";
                        iconContainer.style.transform = "scale(1.1)";
                        const icon = iconContainer.querySelector("i");
                        if (icon) icon.style.color = "#1d0314";
                      }
                      const title = e.currentTarget.querySelector(".specialty-title");
                      if (title) title.style.color = "#FFE04B";
                    }}
                    onMouseLeave={(e) => {
                      const iconContainer = e.currentTarget.querySelector(".specialty-icon-container");
                      if (iconContainer) {
                        iconContainer.style.background = "rgba(255, 224, 75, 0.1)";
                        iconContainer.style.transform = "none";
                        const icon = iconContainer.querySelector("i");
                        if (icon) icon.style.color = "#FFE04B";
                      }
                      const title = e.currentTarget.querySelector(".specialty-title");
                      if (title) title.style.color = "#ffffff";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div 
                        className="specialty-icon-container"
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          background: "rgba(255, 224, 75, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1.5px solid #FFE04B",
                          flexShrink: 0,
                          transition: "all 0.3s ease"
                        }}
                      >
                        <i className={`fa-solid ${item.icon}`} style={{ color: "#FFE04B", fontSize: "16px", transition: "all 0.3s ease" }}></i>
                      </div>
                      <h4 
                        className="specialty-title"
                        style={{ color: "#ffffff", fontSize: "18px", fontWeight: "700", margin: 0, lineHeight: "1.4", transition: "color 0.3s ease" }}
                      >
                        {item.category}
                      </h4>
                    </div>
                    
                    <ul style={{ margin: 0, paddingLeft: "58px", listStyleType: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {item.topics.map((topic, tIdx) => (
                        <li key={tIdx} style={{ color: "#b9b6d6", fontSize: "14px", lineHeight: "1.5", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <i className="fa-solid fa-chevron-right" style={{ color: "#FFE04B", fontSize: "10px", marginTop: "6px", flexShrink: 0, opacity: 0.8 }}></i>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

              {/* IMPORTANT DATES & HOW TO SUBMIT */}
              <div className="row mt-4">
                {/* Important Dates */}
                <div className="col-lg-6 mb-4">
                  <div style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "0 0 30px 0",
                    height: "100%",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}>
                    <div style={{ background: "#82114f", padding: "15px 20px", textAlign: "center", borderBottom: "2px solid #FFE04B" }}>
                      <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", textTransform: "uppercase", margin: 0 }}>
                        <i className="fa-solid fa-calendar-days" style={{ marginRight: "10px", color: "#FFE04B" }}></i>
                        Important Dates
                      </h3>
                    </div>
                    <ul style={{ padding: "30px 40px 10px", margin: 0, listStyleType: "none" }}>
                      {[
                        { label: "Abstract Submission Deadline", date: "30 July 2026", icon: "fa-calendar-xmark" },
                        { label: "Acceptance Notification", date: "20 August 2026", icon: "fa-calendar-check" },
                        { label: "Final Submission Deadline", date: "26 August 2026", icon: "fa-calendar-plus" }
                      ].map((item, idx) => (
                        <li key={idx} style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px", borderBottom: "1px dashed rgba(255, 255, 255, 0.1)", paddingBottom: "12px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <i className={`fa-solid ${item.icon}`} style={{ color: "#FFE04B", opacity: 0.8 }}></i>
                            {item.label}:
                          </span>
                          <strong style={{ color: "#FFE04B", fontWeight: "700", fontSize: "17px" }}>{item.date}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* How To Submit */}
                <div className="col-lg-6 mb-4">
                  <div style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "0 0 30px 0",
                    height: "100%",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}>
                    <div style={{ background: "#82114f", padding: "15px 20px", textAlign: "center", borderBottom: "2px solid #FFE04B" }}>
                      <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", textTransform: "uppercase", margin: 0 }}>
                        <i className="fa-solid fa-paper-plane" style={{ marginRight: "10px", color: "#FFE04B" }}></i>
                        How to Submit Your File?
                      </h3>
                    </div>
                    <ul style={{ padding: "30px 40px 10px", margin: 0, listStyleType: "none" }}>
                      <li style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "18px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.3)", marginTop: "2px" }}>
                          <i className="fa-solid fa-envelope" style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                        </div>
                        <span style={{ marginTop: "4px", lineHeight: "24px" }}>
                          Email your abstract to:{" "}
                          <a href="mailto:Ayurmilaneducation@gmail.com" style={{
                            color: "#FFE04B",
                            fontWeight: "700",
                            textDecoration: "underline",
                            background: "rgba(255, 224, 75, 0.12)",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            display: "inline-block",
                            marginTop: "4px",
                            boxShadow: "0 0 12px rgba(255, 224, 75, 0.15)",
                            border: "1px solid rgba(255, 224, 75, 0.2)",
                            transition: "all 0.3s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 224, 75, 0.25)";
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 224, 75, 0.35)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 224, 75, 0.12)";
                            e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 224, 75, 0.15)";
                          }}
                          >
                            Ayurmilaneducation@gmail.com
                          </a>
                        </span>
                      </li>
                      <li style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "18px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.3)", marginTop: "2px" }}>
                          <i className="fa-solid fa-circle-xmark" style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                        </div>
                        <span style={{ marginTop: "4px", lineHeight: "24px" }}>No offline or alternative mode of submission will be entertained.</span>
                      </li>
                      <li style={{ color: "#b9b6d6", fontSize: "16px", marginBottom: "18px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255, 224, 75, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255, 224, 75, 0.3)", marginTop: "2px" }}>
                          <i className="fa-solid fa-id-card" style={{ color: "#FFE04B", fontSize: "14px" }}></i>
                        </div>
                        <span style={{ marginTop: "4px", lineHeight: "24px" }}>Author must complete registration for confirmation of participation.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SAMPLE EMAIL FORMAT */}
              <div className="row mt-5 justify-content-center">
                <div className="col-lg-10">
                  <div style={{
                    background: "rgba(26, 2, 16, 0.6)",
                    border: "2px solid rgba(255, 224, 75, 0.25)",
                    borderRadius: "24px",
                    padding: "35px",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(10px)",
                    position: "relative"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      paddingBottom: "15px",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                      gap: "10px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }}></div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }}></div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }}></div>
                        <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", marginLeft: "10px", fontWeight: "600" }}>
                          New Email - Abstract Submission Format
                        </span>
                      </div>
                      <div>
                        <button 
                          onClick={copyToClipboard}
                          style={{
                            background: copied ? "rgba(39, 201, 63, 0.2)" : "rgba(255, 224, 75, 0.1)",
                            color: copied ? "#27c93f" : "#FFE04B",
                            border: copied ? "1px solid rgba(39, 201, 63, 0.4)" : "1px solid rgba(255, 224, 75, 0.3)",
                            borderRadius: "8px",
                            padding: "6px 14px",
                            fontSize: "13px",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                          {copied ? "Copied!" : "Copy Template"}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "8px" }}>
                        <span style={{ color: "rgba(255, 255, 255, 0.4)", width: "80px", fontSize: "14px" }}>To:</span>
                        <strong style={{ color: "#FFE04B", fontSize: "14px" }}>Ayurmilaneducation@gmail.com</strong>
                      </div>
                      <div style={{ display: "flex", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "8px" }}>
                        <span style={{ color: "rgba(255, 255, 255, 0.4)", width: "80px", fontSize: "14px" }}>Subject:</span>
                        <span style={{ color: "#fff", fontSize: "14px" }}>
                          Abstract Submission - [Presenter Name] - [Category/Topic]
                        </span>
                      </div>
                      
                      <div style={{ marginTop: "10px" }}>
                        <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "13px", display: "block", marginBottom: "8px" }}>Body:</span>
                        <pre style={{
                          background: "rgba(0, 0, 0, 0.25)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          borderRadius: "12px",
                          padding: "20px",
                          color: "#d1cde8",
                          fontFamily: "'Courier New', Courier, monospace",
                          fontSize: "14px",
                          lineHeight: "1.6",
                          whiteSpace: "pre-wrap",
                          maxHeight: "350px",
                          overflowY: "auto",
                          margin: 0
                        }}>
                          {emailTemplate}
                        </pre>
                      </div>

                      <div style={{ 
                        marginTop: "20px", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "15px"
                      }}>
                        <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "13px", margin: 0, maxWidth: "100%", flex: 1 }}>
                          <i className="fa-solid fa-circle-info" style={{ color: "#FFE04B", marginRight: "6px" }}></i>
                          Ensure you attach your MS Word (.doc/.docx) or PDF abstract file before sending the email.
                        </p>
                        <a 
                          href={mailtoUrl}
                          style={{
                            background: "linear-gradient(135deg, #82114f 0%, #a50766 100%)",
                            color: "#fff",
                            border: "1px solid #FFE04B",
                            borderRadius: "30px",
                            padding: "12px 28px",
                            fontSize: "15px",
                            fontWeight: "700",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: "0 6px 20px rgba(130, 17, 79, 0.4)",
                            transition: "all 0.3s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(130, 17, 79, 0.6)";
                            e.currentTarget.style.background = "linear-gradient(135deg, #9e1460 0%, #c40a7b 100%)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(130, 17, 79, 0.4)";
                            e.currentTarget.style.background = "linear-gradient(135deg, #82114f 0%, #a50766 100%)";
                          }}
                        >
                          <i className="fa-solid fa-paper-plane"></i>
                          Draft Email Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Call for Abstracts Content End */}

          {/* Interactive FAQ Start */}
          <section
            className="abstract-section pt-100 pb-120"
            style={{ backgroundImage: "url('/assets/img/bg/footer-bg.jpg')" }}
          >
            <div
              className="abstract-bg-overlay-1"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
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
                  FAQ
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
                  Submission Queries
                </h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="xb-faq-item mb-3"
                      style={{
                        cursor: "pointer",
                        padding: "24px 30px",
                        background:
                          activeFaq === index
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderLeft:
                          activeFaq === index
                            ? "4px solid #FFE04B"
                            : "4px solid rgba(255,255,255,0.2)",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => toggleFaq(index)}
                      onMouseEnter={(e) => {
                        if (activeFaq !== index) {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 224, 75, 0.3)";
                          e.currentTarget.style.borderLeftColor =
                            "rgba(255, 224, 75, 0.6)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFaq !== index) {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.borderLeftColor =
                            "rgba(255, 255, 255, 0.2)";
                        }
                      }}
                    >
                      <h4
                        style={{
                          color: "#fff",
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: 0,
                          width: "100%",
                          fontWeight: "600",
                        }}
                      >
                        <span
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <img
                            src="/assets/img/icon/question-icon.svg"
                            style={{ width: "18px" }}
                            alt=""
                          />
                          {faq.q}
                        </span>
                        <i
                          className={`fa-solid ${activeFaq === index ? "fa-chevron-up" : "fa-chevron-down"}`}
                          style={{
                            color: "#FFE04B",
                            fontSize: "14px",
                            marginLeft: "15px",
                          }}
                        ></i>
                      </h4>
                      {activeFaq === index && (
                        <p
                          style={{
                            color: "#b9b6d6",
                            fontSize: "15px",
                            lineHeight: "24px",
                            marginTop: "18px",
                            paddingLeft: "30px",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            paddingTop: "18px",
                            animation: "fadeInUp 0.3s ease",
                          }}
                        >
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Interactive FAQ End */}
        </main>
      </div>
    </div>
  );
}
