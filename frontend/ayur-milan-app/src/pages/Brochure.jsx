import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

const pages = [
  '/assets/img/brochure/page_1.jpg',
  '/assets/img/brochure/page_2.jpg',
  '/assets/img/brochure/page_3.jpg',
  '/assets/img/brochure/page_4.jpg',
  '/assets/img/brochure/page_5.jpg',
  '/assets/img/brochure/page_6.jpg',
  '/assets/img/brochure/page_7.jpg',
  '/assets/img/brochure/page_8.jpg',
  '/assets/img/brochure/page_9.jpg',
  '/assets/img/brochure/page_10.jpg',
  '/assets/img/brochure/page_11.jpg',
  '/assets/img/brochure/page_12.jpg',
  '/assets/img/brochure/page_13.jpg',
  '/assets/img/brochure/page_14.jpg',
  '/assets/img/brochure/page_15.jpg',
  '/assets/img/brochure/page_16.jpg',
  '/assets/img/brochure/page_17.jpg',
  '/assets/img/brochure/page_18.jpg',
  '/assets/img/brochure/page_19.jpg',
  '/assets/img/brochure/page_20.jpg',
  '/assets/img/brochure/page_21.jpg',
];

// Forward ref wrapper for react-pageflip pages
const Page = React.forwardRef(({ src, pageNum, total }, ref) => (
  <div
    ref={ref}
    style={{ background: "#1a0210", overflow: "hidden", position: "relative" }}
  >
    <img
      src={src}
      alt={`Page ${pageNum}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
      }}
      draggable={false}
    />
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: 0,
        right: 0,
        textAlign: "center",
        color: "rgba(255,255,255,0.4)",
        fontSize: "11px",
        letterSpacing: "1px",
      }}
    >
      {pageNum} / {total}
    </div>
  </div>
));

export default function Brochure() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onFlip = useCallback((e) => setCurrentPage(e.data), []);

  const goPrev = () => bookRef.current?.pageFlip().flipPrev();
  const goNext = () => bookRef.current?.pageFlip().flipNext();

  const goToPage = (idx) => bookRef.current?.pageFlip().flip(idx);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Book dimensions — responsive
  const bookW = isMobile ? Math.min(window.innerWidth - 32, 380) : 480;
  const bookH = Math.round(bookW * 1.414); // A4 ratio

  const totalPages = pages.length;
  const progress = ((currentPage + (isMobile ? 1 : 2)) / totalPages) * 100;

  return (
    <div
      className="design-conference"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Floating shapes */}
      <img
        src="/assets/img/shape/star-shape.png"
        className="floating-shape"
        style={{ top: "160px", left: "6%", width: "38px", opacity: 0.25 }}
        alt=""
      />
      <img
        src="/assets/img/shape/cursor-shape.png"
        className="floating-shape-slow"
        style={{ top: "500px", right: "5%", width: "30px", opacity: 0.2 }}
        alt=""
      />

      <div className="body_wrap o-clip">
        <main>
          {/* Breadcrumb */}
          <section
            className="breadcrumb pos-rel bg_img"
            style={{
              backgroundImage: "url('/assets/img/bg/footer-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: isMobile ? "100px 0 80px 0" : "140px 0 120px 0",
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
                  AyurMilan 2026 Summit
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
                  Official Brochure
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "15px",
                    marginTop: "10px",
                  }}
                >
                  Flip through the pages · Use arrow keys or swipe on mobile
                </p>
              </div>
            </div>
          </section>

          {/* Flipbook Section */}
          <section className="pt-60 pb-40">
            <div className="container">
              {/* Top bar: page counter + fullscreen + download */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255,224,75,0.12)",
                      border: "1px solid rgba(255,224,75,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-book-open"
                      style={{ color: "#FFE04B", fontSize: "14px" }}
                    ></i>
                  </div>
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Page{" "}
                    <span style={{ color: "#FFE04B" }}>{currentPage + 1}</span>{" "}
                    of {totalPages}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={toggleFullscreen}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      color: "#fff",
                      padding: "8px 16px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i
                      className={`fa-solid ${isFullscreen ? "fa-compress" : "fa-expand"}`}
                    ></i>
                    {isFullscreen ? "Exit" : "Fullscreen"}
                  </button>
                  <a
                    href="/assets/ayurmilan_brochure.pdf"
                    download="AyurMilan_2026_Brochure.pdf"
                    style={{
                      background: "rgba(255,224,75,0.1)",
                      border: "1px solid rgba(255,224,75,0.3)",
                      borderRadius: "10px",
                      color: "#FFE04B",
                      padding: "8px 16px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-solid fa-download"></i>
                    Download PDF
                  </a>
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "3px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  marginBottom: "32px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #FFE04B, #D78633)",
                    borderRadius: "2px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>

              {/* Book + Nav */}
              <div
                ref={containerRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "28px",
                }}
              >
                {/* Prev / Book / Next row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "12px" : "24px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {/* Prev button */}
                  <button
                    onClick={goPrev}
                    disabled={currentPage === 0}
                    style={{
                      width: isMobile ? "40px" : "52px",
                      height: isMobile ? "40px" : "52px",
                      borderRadius: "50%",
                      background:
                        currentPage === 0
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,224,75,0.12)",
                      border: `1px solid ${currentPage === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,224,75,0.35)"}`,
                      color:
                        currentPage === 0
                          ? "rgba(255,255,255,0.25)"
                          : "#FFE04B",
                      fontSize: isMobile ? "16px" : "20px",
                      cursor: currentPage === 0 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  {/* The Flipbook */}
                  <div
                    style={{
                      boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  >
                    <HTMLFlipBook
                      ref={bookRef}
                      width={bookW}
                      height={bookH}
                      size="fixed"
                      minWidth={isMobile ? 280 : 380}
                      maxWidth={isMobile ? 420 : 520}
                      minHeight={400}
                      maxHeight={800}
                      showCover={true}
                      flippingTime={700}
                      usePortrait={isMobile}
                      startPage={0}
                      drawShadow={true}
                      autoSize={false}
                      mobileScrollSupport={true}
                      onFlip={onFlip}
                      className="brochure-flipbook"
                      style={{ margin: "0 auto" }}
                    >
                      {pages.map((src, i) => (
                        <Page
                          key={i}
                          src={src}
                          pageNum={i + 1}
                          total={totalPages}
                        />
                      ))}
                    </HTMLFlipBook>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={goNext}
                    disabled={currentPage >= totalPages - (isMobile ? 1 : 2)}
                    style={{
                      width: isMobile ? "40px" : "52px",
                      height: isMobile ? "40px" : "52px",
                      borderRadius: "50%",
                      background:
                        currentPage >= totalPages - (isMobile ? 1 : 2)
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,224,75,0.12)",
                      border: `1px solid ${currentPage >= totalPages - (isMobile ? 1 : 2) ? "rgba(255,255,255,0.1)" : "rgba(255,224,75,0.35)"}`,
                      color:
                        currentPage >= totalPages - (isMobile ? 1 : 2)
                          ? "rgba(255,255,255,0.25)"
                          : "#FFE04B",
                      fontSize: isMobile ? "16px" : "20px",
                      cursor:
                        currentPage >= totalPages - (isMobile ? 1 : 2)
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>

                {/* Hint text */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {isMobile
                    ? "Swipe or tap arrows to flip"
                    : "Click page edge · Drag · or use ← → arrow keys"}
                </p>

                {/* Page thumbnail strip */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    padding: "8px 4px",
                    maxWidth: "100%",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,224,75,0.3) transparent",
                  }}
                >
                  {pages.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      style={{
                        flexShrink: 0,
                        width: "52px",
                        height: "72px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        border: `2px solid ${currentPage === i || currentPage === i - 1 ? "#FFE04B" : "rgba(255,255,255,0.12)"}`,
                        padding: 0,
                        cursor: "pointer",
                        background: "transparent",
                        opacity:
                          currentPage === i || currentPage === i - 1 ? 1 : 0.55,
                        transition: "all 0.2s ease",
                        transform: currentPage === i ? "scale(1.1)" : "none",
                      }}
                    >
                      <img
                        src={src}
                        alt={`p${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="pb-100">
            <div className="container">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,224,75,0.06) 0%, rgba(130,17,79,0.15) 100%)",
                  border: "1px solid rgba(255,224,75,0.2)",
                  borderRadius: "28px",
                  padding: isMobile ? "40px 24px" : "60px 60px",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "30px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      color: "#FFE04B",
                      fontWeight: "700",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    READY TO JOIN?
                  </span>
                  <h3
                    style={{
                      color: "#fff",
                      fontSize: isMobile ? "24px" : "32px",
                      fontWeight: "800",
                      margin: "10px 0 12px",
                      lineHeight: "1.25",
                    }}
                  >
                    Secure Your Spot at AyurMilan 2026
                  </h3>
                  <p
                    style={{
                      color: "#b9b6d6",
                      fontSize: "15px",
                      lineHeight: "1.7",
                      margin: 0,
                    }}
                  >
                    Join 4,000+ delegates, RAV Gurus, and Ayurveda practitioners
                    at Vrindavan this October.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                    justifyContent: isMobile ? "center" : "flex-end",
                  }}
                >
                  <Link
                    to="/delegate"
                    className="thm-btn design-btn"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Register Now
                    <img src="/assets/img/icon/right-arrow.svg" alt="" />
                  </Link>
                  <Link
                    to="/exhibitors"
                    className="thm-btn"
                    style={{
                      whiteSpace: "nowrap",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "30px",
                      padding: "12px 24px",
                      color: "#fff",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fa-solid fa-store"></i>
                    Book a Stall
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
