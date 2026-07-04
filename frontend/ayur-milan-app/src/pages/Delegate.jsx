import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";

const API_BASE_URL = "http://localhost:5000/api/registrations";

const PARTICIPANT_PRICES = {
  "UG Scholars & Interns": 1599,
  "PG Scholars / Ph.D / Practitioner": 1999,
  "Other Indian Delegates": 2199,
};

const ACCOMMODATION_PRICES = {
  "Triple Sharing": 1500,
  "Double Sharing": 3000,
  "Single Room": 4500,
  None: 0,
};

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const STUDY_YEARS_DESIGNATIONS = [
  "BAMS 1st Professional",
  "BAMS 2nd Professional",
  "BAMS 3rd Professional",
  "BAMS 4th Professional",
  "Clinical Intern",
  "MD / MS Scholar",
  "Ph.D Scholar",
  "Ayurvedic Practitioner / Doctor",
  "Other / Health Professional",
];

export default function Delegate() {
  const formRef = useRef(null);

  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);

  // Multi-step form states: 1 = Form, 2 = UTR Submission, 3 = Success
  const [step, setStep] = useState(1);

  // Registration form inputs
  const [formData, setFormData] = useState({
    participantType: "UG Scholars & Interns",
    designation: "BAMS 1st Professional",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    gender: "Male",
    university: "",
    city: "",
    state: "Uttar Pradesh",
    couponCode: "",
    coordinatorName: "",
    accommodationType: "None",
  });

  const [sameAsPhone, setSameAsPhone] = useState(true);

  // Verification & API status states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [payableAmount, setPayableAmount] = useState(1599);
  const [paymentReference, setPaymentReference] = useState("");
  const [couponDetails, setCouponDetails] = useState(null);

  // Active Payment configurations
  const [paymentConfig, setPaymentConfig] = useState({
    upiId: "agniveshevents@upi",
    qrCodeUrl: "/assets/img/qr-code.png",
    qrCodeBase64: null,
  });

  // Fetch payment configuration from backend
  useEffect(() => {
    const fetchPaymentConfig = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/payment-config`);
        if (res.ok) {
          const resData = await res.json();
          if (resData && resData.data) {
            setPaymentConfig(resData.data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch payment config:", err.message);
      }
    };
    fetchPaymentConfig();
  }, []);

  // Auto-scroll to the top of the form section whenever the step changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  // Coupon states
  const [couponVerified, setCouponVerified] = useState(false);
  const [verifyingCoupon, setVerifyingCoupon] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // Live pricing variables
  const regFee = PARTICIPANT_PRICES[formData.participantType] || 0;
  const accFee = ACCOMMODATION_PRICES[formData.accommodationType] || 0;
  const initialTotal = regFee + accFee;

  // Recalculate payable amount when pricing choices or coupons change
  useEffect(() => {
    let disc = 0;
    if (couponVerified && couponDetails) {
      if (couponDetails.discountType === "PERCENT") {
        disc = Math.round(initialTotal * (couponDetails.value / 100));
      } else if (couponDetails.discountType === "FIXED") {
        disc = couponDetails.value;
      }
    }

    if (disc > initialTotal) disc = initialTotal;
    setCouponDiscount(disc);
    setPayableAmount(initialTotal - disc);
  }, [
    formData.participantType,
    formData.accommodationType,
    couponVerified,
    couponDetails,
    initialTotal,
  ]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "phone" && sameAsPhone) {
        updated.whatsapp = value;
      }
      return updated;
    });

    // Reset coupon verification if user modifies coupon code
    if (name === "couponCode") {
      setCouponVerified(false);
      setCouponDetails(null);
      setCouponDiscount(0);
      setCouponError("");
    }
  };

  // Checkbox toggle for WhatsApp
  const handleSamePhoneToggle = (e) => {
    const checked = e.target.checked;
    setSameAsPhone(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        whatsapp: prev.phone,
      }));
    }
  };

  // Scroll smoothly down to the form
  const scrollToForm = (e) => {
    if (e) e.preventDefault();
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Verify Coupon Code via Backend API
  const handleVerifyCoupon = async () => {
    if (!formData.couponCode) {
      setCouponError("Please enter a coupon code first");
      return;
    }
    setVerifyingCoupon(true);
    setCouponError("");
    try {
      const response = await fetch(`${API_BASE_URL}/verify-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: formData.couponCode }),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Invalid coupon");
      }

      setCouponVerified(true);
      setCouponDetails(resData.data);
      setCouponError("");
    } catch (err) {
      setCouponVerified(false);
      setCouponDetails(null);
      setCouponError(err.message || "Invalid coupon code");
    } finally {
      setVerifyingCoupon(false);
    }
  };

  // Submit Registration Form to Backend API and show manual QR code verification
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // Client-side validations
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.university.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.designation.trim()
    ) {
      setErrorMessage("Please fill out all required fields marked with *");
      setLoading(false);
      return;
    }

    try {
      // 1. Submit registration details
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          couponCode: couponVerified ? formData.couponCode : null,
        }),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to submit registration");
      }

      const regId = resData.data.id;
      const amount = resData.data.payableAmount;
      setRegistrationId(regId);
      setPayableAmount(amount);

      // Transitions directly to Step 2 (QR code scan + UTR entry)
      setStep(2);
    } catch (err) {
      setErrorMessage(
        err.message ||
          "Connection error. Make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Mock Payment Success Emulator removed since Razorpay was disabled

  // Submit UTR Transaction Reference Code
  const handleUTRSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!paymentReference.trim() || paymentReference.trim().length !== 12) {
      setErrorMessage(
        "Please enter a valid 12-digit UTR / Transaction Reference number",
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/submit-utr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          paymentReference,
        }),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.message || "Failed to submit payment reference",
        );
      }

      setStep(3);
    } catch (err) {
      setErrorMessage(err.message || "Failed to verify transaction code");
    } finally {
      setLoading(false);
    }
  };

  const pricing = [
    {
      category: "UG Scholars & Interns",
      early: "INR 1599/-",
      regular: "INR 1999/-",
    },
    {
      category: "PG Scholars & Ph.D",
      early: "INR 1999/-",
      regular: "INR 2599/-",
    },
    {
      category: "Practitioners & Doctors",
      early: "INR 1999/-",
      regular: "INR 2599/-",
    },
    {
      category: "Other Indian Delegates",
      early: "INR 2199/-",
      regular: "INR 2599/-",
    },
    {
      category: "Spot Registrations",
      early: "INR 2999/-",
      regular: "INR 299/-",
    },
  ];

  const inclusions = [
    "Complimentary Breakfast & Lunch on both days",
    "Official Delegate Kit & Conference Materials",
    "Certificate of Participation (Academic Credits)",
    "Entry to all 18+ Practical Training Workshops",
    "Access to Ayur Expo 2026 Brand Stalls",
    "Eligibility for Delegate Competitions",
  ];

  const attractions = [
    {
      title: "Disease & Diagnosis Challenge",
      desc: "Put your clinical thinking and diagnostic skills to the test through engaging case-based challenges designed by RAV Gurus.",
      badge: "Scientific",
    },
    {
      title: "Ayur Debate Arena",
      desc: "Present your thoughts, challenge ideas, and showcase your scriptural and scientific knowledge on impactful topics.",
      badge: "Academic",
    },
    {
      title: "Ayurveda's Got Talent",
      desc: "A dedicated stage to showcase your hidden talents, creativity, confidence, and passion beyond academics.",
      badge: "Creative",
    },
  ];

  return (
    <div
      className="design-conference"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Floating Background Shapes */}
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

      {/* Razorpay Sandboxed Checkout Popup removed */}

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
                  For Attendees
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
                  Delegate Registration
                </h2>
              </div>
            </div>
          </section>
          {/* Breadcrumb End */}

          {/* Early Bird Promo Banner Start */}
          <section className="pt-100 pb-50">
            <div className="container">
              <div
                className="early-bird-countdown-banner text-center"
                style={{
                  border: "1px solid rgba(255, 224, 75, 0.4)",
                  padding: "50px 40px",
                  borderRadius: "28px",
                  background:
                    "linear-gradient(135deg, rgba(130, 17, 79, 0.4) 0%, rgba(26, 2, 16, 0.85) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(255, 224, 75, 0.06)",
                }}
              >
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)",
                    color: "#1d0314",
                    padding: "6px 20px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    boxShadow: "0 4px 12px rgba(255, 224, 75, 0.2)",
                    display: "inline-block",
                  }}
                >
                  Early Bird Registration
                </span>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "32px",
                    fontWeight: "800",
                    marginTop: "20px",
                    marginBottom: "30px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Secure Your Ticket Before Price Increase!
                </h3>
                <Countdown />
              </div>
            </div>
          </section>
          {/* Early Bird Promo Banner End */}

          {/* Pricing Table Section Start */}
          <section className="pb-100">
            <div className="container">
              <div className="row mt-none-30">
                <div className="col-lg-7 mt-30">
                  <div className="sec-title mb-40">
                    <span className="sub-title" style={{ color: "#FFE04B" }}>
                      CONFERENCE FEES
                    </span>
                    <h2
                      className="title"
                      style={{ color: "#fff", marginBottom: "20px" }}
                    >
                      Registration Fees
                    </h2>
                    <p style={{ color: "#b9b6d6" }}>
                      Register early to secure your seat at the lowest rates.
                      Early Bird discounts are valid for registrations completed
                      before July 25, 2026.
                    </p>
                  </div>
                  <div className="xb-schedule-content-wrap">
                    <div className="table-responsive">
                      <table
                        className="table xb-schedule-content"
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Early Bird (Before July 25)</th>
                            <th>Regular (After July 25)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pricing.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: "bold" }}>
                                {item.category}
                              </td>
                              <td
                                style={{ color: "#FFE04B", fontWeight: "bold" }}
                              >
                                {item.early}
                              </td>
                              <td>{item.regular}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="col-lg-5 mt-30">
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      border: "2px solid #FFE04B",
                      height: "100%",
                      padding: "40px 30px",
                    }}
                  >
                    <h3
                      style={{
                        color: "#fff",
                        fontSize: "24px",
                        marginBottom: "25px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i
                        className="fa-solid fa-gift"
                        style={{ color: "#FFE04B" }}
                      ></i>
                      Delegate Inclusions
                    </h3>
                    <ul
                      className="list-unstyled"
                      style={{
                        color: "#b9b6d6",
                        fontSize: "15px",
                        lineHeight: "36px",
                      }}
                    >
                      {inclusions.map((inc, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src="/assets/img/icon/check-yellow-icon.svg"
                            style={{ width: "16px" }}
                            alt="check"
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: "30px", textAlign: "center" }}>
                      <button
                        onClick={scrollToForm}
                        className="thm-btn design-btn w-100"
                        style={{ cursor: "pointer", padding: "14px 20px" }}
                      >
                        Proceed to Registration
                      </button>
                    </div>

                    {/* Important Note to fill space */}
                    <div
                      style={{
                        marginTop: "25px",
                        background: "rgba(255, 224, 75, 0.04)",
                        border: "1px dashed rgba(255, 224, 75, 0.25)",
                        borderRadius: "12px",
                        padding: "16px 18px",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          color: "#FFE04B",
                          fontWeight: "bold",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <i className="fa-solid fa-circle-info"></i> Important
                        Registration Info
                      </span>
                      <span
                        style={{
                          color: "#b9b6d6",
                          fontSize: "12.5px",
                          lineHeight: "18px",
                          display: "block",
                        }}
                      >
                        Registration fees include entry to all workshop halls,
                        delegate kits, lunch and refreshments on both days.
                        Accommodations must be booked separately if required.
                      </span>
                    </div>

                    {/* Support Helpline details */}
                    <div
                      style={{
                        marginTop: "25px",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Need Assistance?
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "15px",
                        }}
                      >
                        <a
                          href="tel:+916280632669"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#b9b6d6",
                            fontSize: "13px",
                            textDecoration: "none",
                          }}
                        >
                          <i
                            className="fa-solid fa-phone"
                            style={{ color: "#FFE04B" }}
                          ></i>
                          <span>+91 62806 32669</span>
                        </a>
                        <a
                          href="mailto:ayurmilanofficial@gmail.com"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#b9b6d6",
                            fontSize: "13px",
                            textDecoration: "none",
                          }}
                        >
                          <i
                            className="fa-solid fa-envelope"
                            style={{ color: "#FFE04B" }}
                          ></i>
                          <span>ayurmilanofficial@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Pricing Table Section End */}

          {/* MERGED: Registration Form Section */}
          <section className="pb-120 dark-bg" ref={formRef} id="register">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  {/* Stepper Progress Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "40px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "25px",
                        left: "10%",
                        right: "10%",
                        height: "2px",
                        background: "rgba(255,255,255,0.1)",
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "25px",
                        left: "10%",
                        right: "10%",
                        height: "2px",
                        background: `linear-gradient(to right, #FFE04B ${step === 1 ? "0%" : step === 2 ? "50%" : "100%"}, rgba(255,255,255,0.1) ${step === 1 ? "0%" : step === 2 ? "50%" : "100%"})`,
                        zIndex: 2,
                        transition: "all 0.4s ease",
                      }}
                    />

                    {[
                      {
                        stepNum: 1,
                        label: "Fill Details",
                        icon: "fa-user-pen",
                      },
                      { stepNum: 2, label: "Pay & Verify", icon: "fa-qrcode" },
                      {
                        stepNum: 3,
                        label: "Confirmation",
                        icon: "fa-circle-check",
                      },
                    ].map((s) => {
                      const isActive = step === s.stepNum;
                      const isCompleted = step > s.stepNum;
                      return (
                        <div
                          key={s.stepNum}
                          style={{
                            zIndex: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "30%",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: isCompleted
                                ? "#FFE04B"
                                : isActive
                                  ? "#82114F"
                                  : "rgba(255,255,255,0.06)",
                              border: `2px solid ${isActive || isCompleted ? "#FFE04B" : "rgba(255,255,255,0.15)"}`,
                              color: isCompleted
                                ? "#82114F"
                                : isActive
                                  ? "#FFE04B"
                                  : "#b9b6d6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "18px",
                              fontWeight: "bold",
                              transition: "all 0.3s ease",
                              boxShadow: isActive
                                ? "0 0 20px rgba(255,224,75,0.3)"
                                : "none",
                            }}
                          >
                            {isCompleted ? (
                              <i className="fa-solid fa-check"></i>
                            ) : (
                              <i className={`fa-solid ${s.icon}`}></i>
                            )}
                          </div>
                          <span
                            style={{
                              color:
                                isActive || isCompleted ? "#FFE04B" : "#b9b6d6",
                              fontSize: "13px",
                              fontWeight: "700",
                              marginTop: "8px",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Form Container */}
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      border: "1px solid rgba(255, 224, 75, 0.2)",
                      padding: "50px 40px",
                      borderRadius: "24px",
                      background: "rgba(255, 255, 255, 0.04)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* STEP 1: Registration Form */}
                    {step === 1 && (
                      <form onSubmit={handleRegisterSubmit}>
                        <div className="text-center mb-40">
                          <h3
                            style={{
                              color: "#fff",
                              fontSize: "32px",
                              fontWeight: "700",
                            }}
                          >
                            Participant Registration Form
                          </h3>
                          <p
                            style={{
                              color: "#b9b6d6",
                              fontSize: "15px",
                              marginTop: "8px",
                            }}
                          >
                            Select category, enter details and proceed to
                            secure UPI payment.
                          </p>
                        </div>

                        {errorMessage && (
                          <div
                            style={{
                              background: "rgba(220,53,69,0.15)",
                              border: "1px solid rgba(220,53,69,0.3)",
                              color: "#ff6b6b",
                              padding: "14px 20px",
                              borderRadius: "10px",
                              marginBottom: "25px",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa-solid fa-triangle-exclamation"
                              style={{ marginRight: "8px" }}
                            ></i>{" "}
                            {errorMessage}
                          </div>
                        )}

                        <div className="row g-4">
                          {/* SECTION: Category Selections */}
                          <div className="col-12">
                            <h5
                              style={{
                                color: "#FFE04B",
                                fontSize: "16px",
                                fontWeight: "700",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                paddingBottom: "8px",
                                marginBottom: "15px",
                              }}
                            >
                              <i
                                className="fa-solid fa-tags"
                                style={{ marginRight: "8px" }}
                              ></i>{" "}
                              Ticket & Category Selections
                            </h5>
                          </div>

                          {/* Participant Type */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Participant Type *
                            </label>
                            <select
                              name="participantType"
                              value={formData.participantType}
                              onChange={handleInputChange}
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            >
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="UG Scholars & Interns"
                              >
                                UG Scholars & Interns (₹1599)
                              </option>
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="PG Scholars / Ph.D / Practitioner"
                              >
                                PG Scholars / Ph.D / Practitioner (₹1999)
                              </option>
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="Other Indian Delegates"
                              >
                                Other Indian Delegates (₹2199)
                              </option>
                            </select>
                          </div>

                          {/* Year of study/Designation */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Designation / Year of Study *
                            </label>
                            <select
                              name="designation"
                              value={formData.designation}
                              onChange={handleInputChange}
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            >
                              {STUDY_YEARS_DESIGNATIONS.map((des) => (
                                <option
                                  key={des}
                                  style={{
                                    background: "#300827",
                                    color: "#fff",
                                  }}
                                  value={des}
                                >
                                  {des}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* SECTION: Personal Details */}
                          <div className="col-12 mt-4">
                            <h5
                              style={{
                                color: "#FFE04B",
                                fontSize: "16px",
                                fontWeight: "700",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                paddingBottom: "8px",
                                marginBottom: "15px",
                              }}
                            >
                              <i
                                className="fa-solid fa-user"
                                style={{ marginRight: "8px" }}
                              ></i>{" "}
                              Personal Information
                            </h5>
                          </div>

                          {/* Name */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Full Name (As required on Certificate) *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              required
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            />
                          </div>

                          {/* Email */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="name@university.com"
                              required
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            />
                          </div>

                          {/* Gender */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Gender *
                            </label>
                            <div
                              style={{
                                display: "flex",
                                gap: "30px",
                                padding: "12px 0",
                              }}
                            >
                              {["Male", "Female"].map((gen) => (
                                <label
                                  key={gen}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    color: "#fff",
                                    cursor: "pointer",
                                    margin: 0,
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={gen}
                                    checked={formData.gender === gen}
                                    onChange={handleInputChange}
                                    style={{
                                      accentColor: "#FFE04B",
                                      width: "18px",
                                      height: "18px",
                                    }}
                                  />
                                  <span>{gen}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* SECTION: Contact Details */}
                          <div className="col-12 mt-4">
                            <h5
                              style={{
                                color: "#FFE04B",
                                fontSize: "16px",
                                fontWeight: "700",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                paddingBottom: "8px",
                                marginBottom: "15px",
                              }}
                            >
                              <i
                                className="fa-solid fa-address-book"
                                style={{ marginRight: "8px" }}
                              ></i>{" "}
                              Contact Information
                            </h5>
                          </div>

                          {/* Phone */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Primary Mobile Number *
                            </label>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <span
                                style={{
                                  padding: "14px 15px",
                                  background: "rgba(255,255,255,0.1)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  borderRadius: "10px",
                                  color: "#FFE04B",
                                  fontWeight: "bold",
                                }}
                              >
                                +91
                              </span>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile number"
                                required
                                style={{
                                  flexGrow: 1,
                                  padding: "14px 18px",
                                  background: "rgba(0,0,0,0.2)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  borderRadius: "10px",
                                  color: "#fff",
                                  outline: "none",
                                }}
                              />
                            </div>
                          </div>

                          {/* WhatsApp */}
                          <div className="col-md-6">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "8px",
                              }}
                            >
                              <label
                                style={{
                                  color: "#fff",
                                  fontWeight: "600",
                                  margin: 0,
                                  fontSize: "14px",
                                }}
                              >
                                WhatsApp Number *
                              </label>
                              <label
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  color: "#FFE04B",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                  margin: 0,
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={sameAsPhone}
                                  onChange={handleSamePhoneToggle}
                                  style={{ accentColor: "#FFE04B" }}
                                />
                                <span>Same as mobile</span>
                              </label>
                            </div>

                            <div style={{ display: "flex", gap: "8px" }}>
                              <span
                                style={{
                                  padding: "14px 15px",
                                  background: "rgba(255,255,255,0.1)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  borderRadius: "10px",
                                  color: "#FFE04B",
                                  fontWeight: "bold",
                                }}
                              >
                                +91
                              </span>
                              <input
                                type="tel"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                disabled={sameAsPhone}
                                placeholder="WhatsApp number"
                                required
                                style={{
                                  flexGrow: 1,
                                  padding: "14px 18px",
                                  background: sameAsPhone
                                    ? "rgba(255,255,255,0.02)"
                                    : "rgba(0,0,0,0.2)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  borderRadius: "10px",
                                  color: sameAsPhone ? "#aaa" : "#fff",
                                  outline: "none",
                                }}
                              />
                            </div>
                          </div>

                          {/* SECTION: Institution Details */}
                          <div className="col-12 mt-4">
                            <h5
                              style={{
                                color: "#FFE04B",
                                fontSize: "16px",
                                fontWeight: "700",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                paddingBottom: "8px",
                                marginBottom: "15px",
                              }}
                            >
                              <i
                                className="fa-solid fa-graduation-cap"
                                style={{ marginRight: "8px" }}
                              ></i>{" "}
                              Academic / Institutional Information
                            </h5>
                          </div>

                          {/* University */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              University / College / Institution *
                            </label>
                            <input
                              type="text"
                              name="university"
                              value={formData.university}
                              onChange={handleInputChange}
                              placeholder="Name of your institution"
                              required
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            />
                          </div>

                          {/* City */}
                          <div className="col-md-3">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              required
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            />
                          </div>

                          {/* State */}
                          <div className="col-md-3">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              State *
                            </label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            >
                              {INDIAN_STATES.map((st) => (
                                <option
                                  key={st}
                                  style={{
                                    background: "#300827",
                                    color: "#fff",
                                  }}
                                  value={st}
                                >
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* SECTION: Accommodation & Coupons */}
                          <div className="col-12 mt-4">
                            <h5
                              style={{
                                color: "#FFE04B",
                                fontSize: "16px",
                                fontWeight: "700",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                paddingBottom: "8px",
                                marginBottom: "15px",
                              }}
                            >
                              <i
                                className="fa-solid fa-hotel"
                                style={{ marginRight: "8px" }}
                              ></i>{" "}
                              Accommodation & Referrals
                            </h5>
                          </div>

                          {/* Accommodation Type */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Ashram Accommodation Type *
                            </label>
                            <select
                              name="accommodationType"
                              value={formData.accommodationType}
                              onChange={handleInputChange}
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            >
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="None"
                              >
                                No Accommodation (₹0)
                              </option>
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="Triple Sharing"
                              >
                                Triple Sharing (₹1500 per person)
                              </option>
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="Double Sharing"
                              >
                                Double Sharing (₹3000 per person)
                              </option>
                              <option
                                style={{ background: "#300827", color: "#fff" }}
                                value="Single Room"
                              >
                                Single Room (₹4500 per room)
                              </option>
                            </select>
                          </div>

                          {/* Coordinator Name */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Coordinator Name (If referred)
                            </label>
                            <input
                              type="text"
                              name="coordinatorName"
                              value={formData.coordinatorName}
                              onChange={handleInputChange}
                              placeholder="Enter reference coordinator name"
                              style={{
                                width: "100%",
                                padding: "14px 18px",
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                outline: "none",
                              }}
                            />
                          </div>

                          {/* Coupon Code */}
                          <div className="col-md-6">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "14px",
                              }}
                            >
                              Coupon Code
                            </label>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <input
                                type="text"
                                name="couponCode"
                                value={formData.couponCode}
                                onChange={handleInputChange}
                                placeholder="e.g. WELCOME100, AYUR10"
                                style={{
                                  flexGrow: 1,
                                  padding: "14px 18px",
                                  background: "rgba(0,0,0,0.2)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  borderRadius: "10px",
                                  color: "#fff",
                                  outline: "none",
                                  textTransform: "uppercase",
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleVerifyCoupon}
                                disabled={
                                  verifyingCoupon || !formData.couponCode
                                }
                                style={{
                                  padding: "14px 20px",
                                  background: couponVerified
                                    ? "#28a745"
                                    : "rgba(255,224,75,0.15)",
                                  border: "1px solid rgba(255,224,75,0.3)",
                                  borderRadius: "10px",
                                  color: "#FFE04B",
                                  fontWeight: "bold",
                                  transition: "all 0.3s ease",
                                  cursor: "pointer",
                                }}
                              >
                                {verifyingCoupon
                                  ? "Verifying..."
                                  : couponVerified
                                    ? "Applied ✓"
                                    : "Apply"}
                              </button>
                            </div>
                            {couponError && (
                              <span
                                style={{
                                  color: "#ff6b6b",
                                  fontSize: "12px",
                                  display: "block",
                                  marginTop: "5px",
                                }}
                              >
                                {couponError}
                              </span>
                            )}
                            {couponVerified && (
                              <span
                                style={{
                                  color: "#28a745",
                                  fontSize: "12px",
                                  display: "block",
                                  marginTop: "5px",
                                }}
                              >
                                Discount Coupon applied successfully!
                              </span>
                            )}
                          </div>

                          {/* SECTION: Payment Summary */}
                          <div className="col-12 mt-40">
                            <div
                              style={{
                                background: "rgba(0, 0, 0, 0.25)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                padding: "24px 30px",
                              }}
                            >
                              <h4
                                style={{
                                  color: "#FFE04B",
                                  fontSize: "18px",
                                  fontWeight: "700",
                                  marginBottom: "15px",
                                  borderBottom:
                                    "1px solid rgba(255, 255, 255, 0.1)",
                                  paddingBottom: "10px",
                                }}
                              >
                                <i
                                  className="fa-solid fa-receipt"
                                  style={{ marginRight: "8px" }}
                                ></i>{" "}
                                Booking Payment Summary
                              </h4>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  color: "#b9b6d6",
                                  fontSize: "15px",
                                  marginBottom: "10px",
                                }}
                              >
                                <span>
                                  Registration Pass ({formData.participantType})
                                </span>
                                <span style={{ color: "#fff" }}>₹{regFee}</span>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  color: "#b9b6d6",
                                  fontSize: "15px",
                                  marginBottom: "10px",
                                }}
                              >
                                <span>
                                  Ashram Accommodation (
                                  {formData.accommodationType})
                                </span>
                                <span style={{ color: "#fff" }}>₹{accFee}</span>
                              </div>

                              {couponDiscount > 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: "#28a745",
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <span>
                                    Coupon Discount (
                                    {formData.couponCode.toUpperCase()})
                                  </span>
                                  <span>- ₹{couponDiscount}</span>
                                </div>
                              )}

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  color: "#fff",
                                  fontSize: "20px",
                                  fontWeight: "800",
                                  borderTop:
                                    "1px dashed rgba(255, 255, 255, 0.2)",
                                  paddingTop: "15px",
                                  marginTop: "15px",
                                }}
                              >
                                <span>Total Payable Amount</span>
                                <span style={{ color: "#FFE04B" }}>
                                  ₹{payableAmount}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="col-12 text-center mt-30">
                            <button
                              type="submit"
                              disabled={loading}
                              className="thm-btn design-btn"
                              style={{
                                width: "100%",
                                maxWidth: "300px",
                                padding: "16px",
                                cursor: "pointer",
                              }}
                            >
                              {loading
                                ? "Registering..."
                                : "Register & Pay via UPI"}
                              <i
                                className="fa-solid fa-qrcode"
                                style={{ marginLeft: "8px" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* STEP 2: UTR Submission (fallback) */}
                    {step === 2 && (
                      <form onSubmit={handleUTRSubmit}>
                        <div className="text-center mb-40">
                          <h3
                            style={{
                              color: "#fff",
                              fontSize: "32px",
                              fontWeight: "700",
                            }}
                          >
                            Submit Payment Verification
                          </h3>
                          <p
                            style={{
                              color: "#b9b6d6",
                              fontSize: "15px",
                              marginTop: "8px",
                            }}
                          >
                            Scan the QR code to pay, then enter the 12-digit
                            transaction UTR number to link your booking.
                          </p>
                        </div>

                        {errorMessage && (
                          <div
                            style={{
                              background: "rgba(220,53,69,0.15)",
                              border: "1px solid rgba(220,53,69,0.3)",
                              color: "#ff6b6b",
                              padding: "14px 20px",
                              borderRadius: "10px",
                              marginBottom: "25px",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa-solid fa-triangle-exclamation"
                              style={{ marginRight: "8px" }}
                            ></i>{" "}
                            {errorMessage}
                          </div>
                        )}

                        <div className="row g-4 align-items-stretch">
                          {/* Booking info */}
                          <div className="col-md-6">
                            <div
                              style={{
                                background: "rgba(0, 0, 0, 0.25)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                padding: "24px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <h4
                                  style={{
                                    color: "#FFE04B",
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    marginBottom: "15px",
                                    borderBottom:
                                      "1px solid rgba(255,255,255,0.1)",
                                    paddingBottom: "8px",
                                  }}
                                >
                                  Registration Details
                                </h4>
                                <div
                                  style={{
                                    color: "#b9b6d6",
                                    fontSize: "14px",
                                    lineHeight: "26px",
                                  }}
                                >
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      Name:
                                    </strong>{" "}
                                    {formData.name}
                                  </p>
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      Email:
                                    </strong>{" "}
                                    {formData.email}
                                  </p>
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      Phone:
                                    </strong>{" "}
                                    +91 {formData.phone}
                                  </p>
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      State:
                                    </strong>{" "}
                                    {formData.state}
                                  </p>
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      Designation:
                                    </strong>{" "}
                                    {formData.designation}
                                  </p>
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      Category:
                                    </strong>{" "}
                                    {formData.participantType}
                                  </p>
                                  <p style={{ margin: "0 0 6px 0" }}>
                                    <strong style={{ color: "#fff" }}>
                                      Accommodation:
                                    </strong>{" "}
                                    {formData.accommodationType}
                                  </p>
                                </div>
                              </div>

                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingTop: "15px",
                                  borderTop: "1px dashed rgba(255,255,255,0.1)",
                                }}
                              >
                                <p
                                  style={{
                                    margin: "0 0 4px 0",
                                    fontSize: "13px",
                                    color: "#b9b6d6",
                                  }}
                                >
                                  Booking Reference ID
                                </p>
                                <span
                                  style={{
                                    color: "#FFE04B",
                                    fontFamily: "monospace",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    letterSpacing: "1px",
                                  }}
                                >
                                  {registrationId}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Payment Instructions QR / UPI */}
                          <div className="col-md-6">
                            <div
                              style={{
                                background: "rgba(255,224,75,0.03)",
                                border: "1px solid rgba(255,224,75,0.2)",
                                borderRadius: "16px",
                                padding: "24px",
                                textAlign: "center",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <h4
                                style={{
                                  color: "#FFE04B",
                                  fontSize: "18px",
                                  fontWeight: "700",
                                  marginBottom: "15px",
                                }}
                              >
                                Scan to Pay with Any UPI App
                              </h4>

                              {/* Vector QR Code */}
                              <div
                                style={{
                                  background: "#fff",
                                  width: "150px",
                                  height: "150px",
                                  padding: "12px",
                                  borderRadius: "12px",
                                  margin: "0 auto 15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                }}
                              >
                                <img
                                  src={
                                    (couponVerified && couponDiscount > 0)
                                      ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=${paymentConfig.upiId}&pn=AyurMilan%202026&am=${payableAmount}&cu=INR&tn=AyurMilan%20Reg%20${registrationId}`)}`
                                      : paymentConfig.qrCodeBase64
                                        ? (paymentConfig.qrCodeBase64.trim().startsWith("data:image")
                                            ? paymentConfig.qrCodeBase64.trim()
                                            : `data:image/png;base64,${paymentConfig.qrCodeBase64.trim().replace(/\s/g, "")}`)
                                        : paymentConfig.qrCodeUrl &&
                                            (paymentConfig.qrCodeUrl.startsWith("http") ||
                                              paymentConfig.qrCodeUrl.startsWith("/"))
                                          ? paymentConfig.qrCodeUrl
                                          : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=${paymentConfig.upiId}&pn=AyurMilan%202026&am=${payableAmount}&cu=INR&tn=AyurMilan%20Registration`)}`
                                  }
                                  alt="Payment QR Code"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>

                              <p
                                style={{
                                  color: "#fff",
                                  margin: "0 0 5px 0",
                                  fontSize: "15px",
                                  fontWeight: "700",
                                }}
                              >
                                UPI ID:{" "}
                                <span style={{ color: "#FFE04B" }}>
                                  {paymentConfig.upiId}
                                </span>
                              </p>
                              <span
                                style={{ color: "#b9b6d6", fontSize: "12px" }}
                              >
                                Amount to Pay:{" "}
                                <strong style={{ color: "#FFE04B" }}>
                                  ₹{payableAmount}
                                </strong>
                              </span>
                              <div style={{ marginTop: "15px" }}>
                                <a
                                  href={`upi://pay?pa=${paymentConfig.upiId}&pn=AyurMilan%202026&am=${payableAmount}&cu=INR&tn=AyurMilan%20Reg%20${registrationId}`}
                                  className="thm-btn design-btn"
                                  style={{
                                    padding: "8px 16px",
                                    fontSize: "13px",
                                    borderRadius: "8px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    textDecoration: "none",
                                    color: "#82114F",
                                    background: "#FFE04B",
                                    fontWeight: "bold",
                                    boxShadow: "0 4px 10px rgba(255,224,75,0.2)"
                                  }}
                                >
                                  <i className="fa-solid fa-mobile-screen-button"></i>
                                  Pay via UPI App
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* UTR Input */}
                          <div className="col-12 mt-4">
                            <label
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                marginBottom: "8px",
                                display: "block",
                                fontSize: "15px",
                              }}
                            >
                              Enter 12-Digit UPI Transaction Reference / UTR
                              Number *
                            </label>
                            <input
                              type="text"
                              value={paymentReference}
                              onChange={(e) =>
                                setPaymentReference(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 12),
                                )
                              }
                              placeholder="12-Digit Reference Number (e.g. 3175XXXXXXXX)"
                              maxLength="12"
                              required
                              style={{
                                width: "100%",
                                padding: "16px 20px",
                                background: "rgba(0,0,0,0.2)",
                                border: "2px solid #FFE04B",
                                borderRadius: "12px",
                                color: "#fff",
                                outline: "none",
                                fontSize: "18px",
                                letterSpacing: "4px",
                                textAlign: "center",
                                fontFamily: "monospace",
                                fontWeight: "bold",
                              }}
                            />
                            <span
                              style={{
                                color: "#b9b6d6",
                                fontSize: "11px",
                                display: "block",
                                marginTop: "6px",
                                textAlign: "center",
                              }}
                            >
                              You can find this 12-digit number in your UPI app
                              receipt (Google Pay, PhonePe, Paytm, BHIM, etc.)
                              under "Transaction ID" or "UTR".
                            </span>
                          </div>

                          {/* Confirm Button */}
                          <div
                            className="col-12 text-center mt-30"
                            style={{
                              display: "flex",
                              gap: "15px",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              style={{
                                padding: "16px 30px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "10px",
                                color: "#fff",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              <i
                                className="fa-solid fa-chevron-left"
                                style={{ marginRight: "8px" }}
                              ></i>{" "}
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={
                                loading || paymentReference.length !== 12
                              }
                              className="thm-btn design-btn"
                              style={{
                                padding: "16px 30px",
                                flexGrow: 1,
                                maxWidth: "280px",
                                cursor: "pointer",
                              }}
                            >
                              {loading
                                ? "Submitting..."
                                : "Submit Payment Proof"}
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginLeft: "8px" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* STEP 3: Success Screen */}
                    {step === 3 && (
                      <div
                        className="text-center"
                        style={{ padding: "30px 10px" }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "rgba(40,167,69,0.15)",
                            border: "2px solid #28a745",
                            color: "#28a745",
                            fontSize: "38px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 25px",
                            boxShadow: "0 0 20px rgba(40,167,69,0.2)",
                          }}
                        >
                          <i className="fa-solid fa-check"></i>
                        </div>

                        <h3
                          style={{
                            color: "#fff",
                            fontSize: "32px",
                            fontWeight: "700",
                            marginBottom: "15px",
                          }}
                        >
                          Registration Confirmed!
                        </h3>

                        <p
                          style={{
                            color: "#FFE04B",
                            fontSize: "15px",
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            background: "rgba(255,224,75,0.08)",
                            padding: "10px 20px",
                            borderRadius: "30px",
                            display: "inline-block",
                            marginBottom: "20px",
                            border: "1px solid rgba(255,224,75,0.2)",
                          }}
                        >
                          Booking Reference ID: {registrationId}
                        </p>

                        <p
                          style={{
                            color: "#b9b6d6",
                            fontSize: "16px",
                            lineHeight: "28px",
                            maxWidth: "600px",
                            margin: "0 auto 30px",
                          }}
                        >
                          Thank you for registering for{" "}
                          <strong style={{ color: "#fff" }}>
                            AyurMilan 2026
                          </strong>
                          . We have verified your transaction reference (
                          <strong style={{ color: "#fff" }}>
                            {paymentReference}
                          </strong>
                          ) and confirmed your delegate booking! A confirmation
                          email containing your entry ticket and credentials has
                          been sent to{" "}
                          <strong style={{ color: "#fff" }}>
                            {formData.email}
                          </strong>
                          .
                        </p>

                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center",
                          }}
                        >
                          <Link
                            to="/"
                            className="thm-btn design-btn"
                            style={{ padding: "12px 25px" }}
                          >
                            Go To Home
                          </Link>
                          <button
                            onClick={() => {
                              setStep(1);
                              setFormData({
                                participantType: "UG Scholars & Interns",
                                designation: "BAMS 1st Professional",
                                name: "",
                                email: "",
                                phone: "",
                                whatsapp: "",
                                gender: "Male",
                                university: "",
                                city: "",
                                state: "Uttar Pradesh",
                                couponCode: "",
                                coordinatorName: "",
                                accommodationType: "None",
                              });
                              setPaymentReference("");
                              setCouponVerified(false);
                              setSameAsPhone(true);
                            }}
                            style={{
                              padding: "12px 25px",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: "10px",
                              color: "#fff",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            New Registration
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Registration Form End */}

          {/* Summit Experience Section Start */}
          <section className="pb-120">
            <div className="container">
              <div className="row align-items-center g-5">
                {/* Left Side: Asymmetrical image collage with vector lines and glowing floating metrics */}
                <div className="col-lg-6 position-relative">
                  {/* Decorative background grid vector dots */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-30px",
                      left: "-20px",
                      width: "100px",
                      height: "100px",
                      backgroundImage:
                        "radial-gradient(rgba(255, 224, 75, 0.3) 15%, transparent 15%)",
                      backgroundSize: "15px 15px",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Decorative curved vector line shape (SVG) */}
                  <svg
                    style={{
                      position: "absolute",
                      bottom: "-40px",
                      right: "-10px",
                      width: "200px",
                      height: "200px",
                      fill: "none",
                      stroke: "rgba(255, 224, 75, 0.2)",
                      strokeWidth: 2,
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                    viewBox="0 0 100 100"
                  >
                    <path d="M10,80 Q40,30 90,80 T170,80" />
                  </svg>

                  <div
                    className="stagger-zoom-img animate-float"
                    style={{
                      borderRadius: "50px 150px 100px 80px",
                      overflow: "hidden",
                      border: "3px solid rgba(255, 224, 75, 0.4)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <img
                      src="/assets/img/about/delegate_gathering.png"
                      alt="AyurMilan Delegate Gathering"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transition: "all 0.5s ease",
                      }}
                    />
                  </div>

                  {/* Floating glassmorphic stat bubble */}
                  <div
                    className="contact-form-wrap main-contact-form"
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "-20px",
                      padding: "15px 25px",
                      border: "1px solid rgba(255, 224, 75, 0.4)",
                      borderRadius: "16px",
                      background: "rgba(130, 17, 79, 0.85)",
                      backdropFilter: "blur(10px)",
                      zIndex: 3,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#FFE04B",
                        color: "#82114F",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="fa-solid fa-users"></i>
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "#fff",
                          fontSize: "18px",
                          margin: 0,
                          fontWeight: "bold",
                        }}
                      >
                        4000+
                      </h4>
                      <p
                        style={{
                          color: "#ffe04b",
                          fontSize: "12px",
                          margin: 0,
                          fontWeight: "600",
                        }}
                      >
                        Active Attendees
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Visual Copy with custom SVG vectors */}
                <div className="col-lg-6">
                  <div className="sec-title mb-30">
                    <span className="sub-title" style={{ color: "#FFE04B" }}>
                      SUMMIT EXPERIENCE
                    </span>
                    <h2
                      className="title"
                      style={{
                        color: "#fff",
                        fontSize: "38px",
                        marginBottom: "20px",
                      }}
                    >
                      Join India's Most Inspiring Ayurvedic Assembly
                    </h2>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "16px",
                        lineHeight: "28px",
                      }}
                    >
                      AyurMilan is not just a standard academic lecture series.
                      It is a highly interactive clinical experience where the
                      future leadership of Ayurveda connects.
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "flex-start",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: "4px" }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#FFE04B"
                          strokeWidth="2"
                          fill="rgba(255, 224, 75, 0.1)"
                        />
                        <path
                          d="M8 12L11 15L16 9"
                          stroke="#FFE04B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <h4
                          style={{
                            color: "#FFE04B",
                            fontSize: "16px",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Hands-on RAV Guru Guidance
                        </h4>
                        <p
                          style={{
                            color: "#b9b6d6",
                            fontSize: "14px",
                            margin: 0,
                          }}
                        >
                          Watch live critical care preparations and receive
                          direct mentorship from certified Ayurveda Gurus.
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "flex-start",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: "4px" }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#FFE04B"
                          strokeWidth="2"
                          fill="rgba(255, 224, 75, 0.1)"
                        />
                        <path
                          d="M8 12L11 15L16 9"
                          stroke="#FFE04B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <h4
                          style={{
                            color: "#FFE04B",
                            fontSize: "16px",
                            margin: "0 0 5px 0",
                          }}
                        >
                          25+ States Representation
                        </h4>
                        <p
                          style={{
                            color: "#b9b6d6",
                            fontSize: "14px",
                            margin: 0,
                          }}
                        >
                          Network and collaborate with thousands of fellow BAMS
                          scholars and practitioners from all corners of India.
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "flex-start",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: "4px" }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#FFE04B"
                          strokeWidth="2"
                          fill="rgba(255, 224, 75, 0.1)"
                        />
                        <path
                          d="M8 12L11 15L16 9"
                          stroke="#FFE04B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <h4
                          style={{
                            color: "#FFE04B",
                            fontSize: "16px",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Peer Learning & Clinical Exposure
                        </h4>
                        <p
                          style={{
                            color: "#b9b6d6",
                            fontSize: "14px",
                            margin: 0,
                          }}
                        >
                          Bridging theoretical college curriculum with practical
                          diagnostic procedures, case histories, and herb
                          identification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Summit Experience Section End */}

          {/* Major Attractions Start */}
          <section className="pb-120">
            <div className="container">
              <div className="sec-title text-center mb-60">
                <span className="sub-title" style={{ color: "#FFE04B" }}>
                  WHAT TO EXPECT
                </span>
                <h2 className="title" style={{ color: "#fff" }}>
                  Major Attractions For Delegates
                </h2>
                <p
                  style={{
                    color: "#b9b6d6",
                    maxWidth: "700px",
                    margin: "10px auto 0",
                  }}
                >
                  Get ready for exciting clinical and creative challenges
                  designed specially to test and reward your skills.
                </p>
              </div>
              <div className="row mt-none-30">
                {attractions.map((attr, idx) => {
                  // Define category specific colors
                  let badgeBg, badgeColor, iconColor, iconBg;
                  if (attr.badge === "Scientific") {
                    badgeBg =
                      "linear-gradient(135deg, #FFE04B 0%, #D78633 100%)";
                    badgeColor = "#1a0314";
                    iconColor = "#FFE04B";
                    iconBg = "rgba(255, 224, 75, 0.12)";
                  } else if (attr.badge === "Academic") {
                    badgeBg =
                      "linear-gradient(135deg, #7afcff 0%, #00b4d8 100%)";
                    badgeColor = "#002030";
                    iconColor = "#7afcff";
                    iconBg = "rgba(122, 252, 255, 0.12)";
                  } else {
                    // Creative
                    badgeBg =
                      "linear-gradient(135deg, #ff7eb9 0%, #c31432 100%)";
                    badgeColor = "#ffffff";
                    iconColor = "#ff7eb9";
                    iconBg = "rgba(255, 126, 185, 0.12)";
                  }

                  return (
                    <div className="col-lg-4 mt-30" key={idx}>
                      <div
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          height: "100%",
                          padding: "45px 30px 35px",
                          borderRadius: "24px",
                          background: "rgba(255, 255, 255, 0.03)",
                          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          position: "relative",
                          textAlign: "center",
                          transition:
                            "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.borderColor =
                            "rgba(255, 224, 75, 0.45)";
                          e.currentTarget.style.boxShadow =
                            "0 22px 45px rgba(255, 224, 75, 0.12)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 35px rgba(0, 0, 0, 0.25)";
                        }}
                      >
                        {/* Category Badge */}
                        <span
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: badgeBg,
                            color: badgeColor,
                            padding: "4px 14px",
                            borderRadius: "30px",
                            fontSize: "11px",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                          }}
                        >
                          {attr.badge}
                        </span>

                        {/* Icon Wrapper */}
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            background: iconBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: iconColor,
                            fontSize: "26px",
                            marginBottom: "24px",
                            border: `1px solid rgba(${attr.badge === "Scientific" ? "255,224,75" : attr.badge === "Academic" ? "122,252,255" : "255,126,185"}, 0.25)`,
                          }}
                        >
                          <i
                            className={
                              idx === 0
                                ? "fa-solid fa-stethoscope"
                                : idx === 1
                                  ? "fa-solid fa-comments"
                                  : "fa-solid fa-masks-theater"
                            }
                          ></i>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            color: "#fff",
                            fontSize: "22px",
                            fontWeight: "800",
                            marginBottom: "15px",
                            lineHeight: "1.3",
                          }}
                        >
                          {attr.title}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            color: "#b9b6d6",
                            fontSize: "14.5px",
                            lineHeight: "24px",
                            margin: 0,
                          }}
                        >
                          {attr.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Major Attractions End */}

          {/* Accommodation & Contact Info Start */}
          <section className="pb-130">
            <div className="container">
              <div
                className="contact-form-wrap main-contact-form"
                style={{ border: "2px solid #FFE04B", padding: "50px" }}
              >
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <h3
                      style={{
                        color: "#fff",
                        fontSize: "26px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i
                        className="fa-solid fa-hotel"
                        style={{ color: "#FFE04B" }}
                      ></i>
                      Need Ashram Accommodation?
                    </h3>
                    <p
                      style={{
                        color: "#b9b6d6",
                        fontSize: "16px",
                        lineHeight: "26px",
                        margin: 0,
                      }}
                    >
                      Comfortable and pure satvik accommodation is available
                      directly at the ashram for only <strong>1400/-</strong>.
                      You can easily book your rooms along with your delegate
                      registration form.
                    </p>
                  </div>
                  <div
                    className="col-lg-4 text-center"
                    style={{ marginTop: "20px" }}
                  >
                    <h4
                      style={{
                        color: "#FFE04B",
                        fontSize: "14px",
                        marginBottom: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      For Booking Assistance
                    </h4>
                    <a
                      href="tel:+916280632669"
                      style={{
                        color: "#FFE04B",
                        fontSize: "22px",
                        fontWeight: "bold",
                        display: "block",
                      }}
                    >
                      +91 6280632669
                    </a>
                    <a
                      href="tel:+919697970004"
                      style={{
                        color: "#FFE04B",
                        fontSize: "22px",
                        fontWeight: "bold",
                        display: "block",
                        marginTop: "5px",
                      }}
                    >
                      +91 9697970004
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Accommodation & Contact Info End */}
        </main>
      </div>
    </div>
  );
}
