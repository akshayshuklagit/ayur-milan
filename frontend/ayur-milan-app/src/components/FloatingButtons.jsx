import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [regHovered, setRegHovered] = useState(false);
  const { pathname } = useLocation();

  // Hide on delegate page since user is already there
  const hideRegister = pathname === "/delegate";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {!hideRegister && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(150%)",
            pointerEvents: visible ? "auto" : "none",
            transition:
              "opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
          }}
        >
          {/* Sliding Tooltip */}
          <span
            style={{
              position: "absolute",
              right: "70px",
              background: "rgba(20, 2, 12, 0.95)",
              border: "1.5px solid #FFE04B",
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              opacity: regHovered ? 1 : 0,
              transform: regHovered ? "translateX(0)" : "translateX(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: "none",
            }}
          >
            Register Now
          </span>

          <Link
            to="/delegate"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #82114f 0%, #d78633 100%)",
              border: "2px solid #FFE04B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(130,17,79,0.5)",
              transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
              position: "relative",
            }}
            onMouseEnter={() => setRegHovered(true)}
            onMouseLeave={() => setRegHovered(false)}
          >
            {/* Pulsing indicator badge */}
            <span
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#4fffe0",
                border: "2px solid #82114f",
                boxShadow: "0 0 8px #4fffe0",
                animation: "dotBlink 1.5s infinite",
              }}
            />
            <i
              className="fa-solid fa-ticket"
              style={{ color: "#FFE04B", fontSize: "20px" }}
            ></i>
          </Link>
        </div>
      )}

      {/* Back to Top button */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,224,75,0.12)",
          border: "1.5px solid rgba(255,224,75,0.4)",
          color: "#FFE04B",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(12px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 0.3s ease, transform 0.3s ease, background 0.2s ease, box-shadow 0.2s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,224,75,0.22)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,224,75,0.25)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,224,75,0.12)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          e.currentTarget.style.transform = visible
            ? "translateY(0)"
            : "translateY(16px)";
        }}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}
