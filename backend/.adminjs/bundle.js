(function (React, adminjs, designSystem, reactRouter) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  // 1. Sleek SVG Donut Chart representing Registration Statuses
  const DonutChart = ({
    paid,
    pending,
    failed,
    total
  }) => {
    const totalVal = paid + pending + failed || 1;
    const pctPaid = paid / totalVal * 100;
    const pctPending = pending / totalVal * 100;
    const pctFailed = failed / totalVal * 100;

    // Circumference of circle with r=70: 2 * Math.PI * 70 = 439.82
    const circ = 439.82;
    const strokePaid = pctPaid / 100 * circ;
    const strokePending = pctPending / 100 * circ;
    const strokeFailed = pctFailed / 100 * circ;
    return /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        position: 'relative',
        width: '180px',
        height: '180px',
        margin: '10px 0'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "180",
      height: "180",
      viewBox: "0 0 200 200",
      style: {
        transform: 'rotate(-90deg)'
      }
    }, /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "100",
      cy: "100",
      r: "70",
      fill: "transparent",
      stroke: "#f4f2eb",
      strokeWidth: "18"
    }), paid > 0 && /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "100",
      cy: "100",
      r: "70",
      fill: "transparent",
      stroke: "#28a745",
      strokeWidth: "18",
      strokeDasharray: circ,
      strokeDashoffset: circ - strokePaid,
      strokeLinecap: "round",
      style: {
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }), pending > 0 && /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "100",
      cy: "100",
      r: "70",
      fill: "transparent",
      stroke: "#fd7e14",
      strokeWidth: "18",
      strokeDasharray: circ,
      strokeDashoffset: circ - strokePending,
      strokeLinecap: "round",
      transform: `rotate(${pctPaid / 100 * 360} 100 100)`,
      style: {
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }), failed > 0 && /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "100",
      cy: "100",
      r: "70",
      fill: "transparent",
      stroke: "#dc3545",
      strokeWidth: "18",
      strokeDasharray: circ,
      strokeDashoffset: circ - strokeFailed,
      strokeLinecap: "round",
      transform: `rotate(${(pctPaid + pctPending) / 100 * 360} 100 100)`,
      style: {
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    })), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        fontSize: '28px',
        fontWeight: '800',
        color: '#222d29',
        lineHeight: 1
      }
    }, total), /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        fontSize: '10px',
        color: '#777777',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: '4px',
        letterSpacing: '0.5px'
      }
    }, "Total"))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        marginTop: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#28a745',
        display: 'inline-block'
      }
    }), /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        color: '#555555',
        fontWeight: '500'
      }
    }, "Paid (", paid, ")")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#fd7e14',
        display: 'inline-block'
      }
    }), /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        color: '#555555',
        fontWeight: '500'
      }
    }, "Pending (", pending, ")")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#dc3545',
        display: 'inline-block'
      }
    }), /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        color: '#555555',
        fontWeight: '500'
      }
    }, "Failed (", failed, ")"))));
  };

  // 2. High-Fidelity SVG Area/Line Chart representing 7-day registration trends
  const AreaChart = ({
    trendData = []
  }) => {
    if (trendData.length === 0) {
      return /*#__PURE__*/React__default.default.createElement("p", {
        style: {
          color: '#777777',
          textAlign: 'center',
          margin: '40px 0'
        }
      }, "No trend data available.");
    }

    // Find max value to scale the Y axis
    const maxVal = Math.max(...trendData.map(d => d.count), 4);
    const width = 500;
    const height = 180;
    const paddingLeft = 32;
    const paddingRight = 15;
    const paddingTop = 20;
    const paddingBottom = 25;
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Compute absolute chart coordinates
    const points = trendData.map((d, i) => {
      const x = paddingLeft + i / (trendData.length - 1) * chartWidth;
      const y = paddingTop + chartHeight - d.count / maxVal * chartHeight;
      return {
        x,
        y,
        label: d.date,
        value: d.count
      };
    });

    // Create path strings
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
    return /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '100%',
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "100%",
      height: height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        overflow: 'visible',
        minWidth: '450px'
      }
    }, /*#__PURE__*/React__default.default.createElement("defs", null, /*#__PURE__*/React__default.default.createElement("linearGradient", {
      id: "areaGrad",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React__default.default.createElement("stop", {
      offset: "0%",
      stopColor: "#1b4d3e",
      stopOpacity: "0.25"
    }), /*#__PURE__*/React__default.default.createElement("stop", {
      offset: "100%",
      stopColor: "#1b4d3e",
      stopOpacity: "0.01"
    }))), [0, 0.25, 0.5, 0.75, 1].map(ratio => {
      const y = paddingTop + ratio * chartHeight;
      const labelVal = Math.round(maxVal * (1 - ratio));
      return /*#__PURE__*/React__default.default.createElement("g", {
        key: ratio,
        opacity: "0.6"
      }, /*#__PURE__*/React__default.default.createElement("line", {
        x1: paddingLeft,
        y1: y,
        x2: width - paddingRight,
        y2: y,
        stroke: "#e4e2eb",
        strokeWidth: "1",
        strokeDasharray: "3 3"
      }), /*#__PURE__*/React__default.default.createElement("text", {
        x: paddingLeft - 8,
        y: y + 3,
        textAnchor: "end",
        fontSize: "10",
        fill: "#888888",
        fontWeight: "600"
      }, labelVal));
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: areaPath,
      fill: "url(#areaGrad)"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: linePath,
      fill: "none",
      stroke: "#1b4d3e",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), points.map((p, idx) => /*#__PURE__*/React__default.default.createElement("g", {
      key: idx
    }, /*#__PURE__*/React__default.default.createElement("line", {
      x1: p.x,
      y1: paddingTop + chartHeight,
      x2: p.x,
      y2: paddingTop,
      stroke: "#e4e2eb",
      strokeWidth: "1",
      strokeOpacity: "0.25"
    }), /*#__PURE__*/React__default.default.createElement("circle", {
      cx: p.x,
      cy: p.y,
      r: "5",
      fill: "#ffffff",
      stroke: "#1b4d3e",
      strokeWidth: "2.5"
    }), /*#__PURE__*/React__default.default.createElement("text", {
      x: p.x,
      y: p.y - 9,
      textAnchor: "middle",
      fontSize: "10",
      fontWeight: "bold",
      fill: "#1b4d3e"
    }, p.value), /*#__PURE__*/React__default.default.createElement("text", {
      x: p.x,
      y: paddingTop + chartHeight + 16,
      textAnchor: "middle",
      fontSize: "10",
      fill: "#777777",
      fontWeight: "500"
    }, p.label)))));
  };

  // 3. Main Administrative Dashboard
  const Dashboard = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const api = new adminjs.ApiClient();
    React.useEffect(() => {
      api.getDashboard().then(response => {
        setData(response.data);
        setLoading(false);
      }).catch(err => {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics.');
        setLoading(false);
      });
    }, []);
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xl",
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          flexDirection: 'column'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "spinner",
        style: {
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1b4d3e',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          marginBottom: '15px'
        }
      }), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          color: '#1b4d3e',
          fontWeight: 'bold',
          fontSize: '18px'
        }
      }, "Loading AyurMilan Dashboard Statistics..."), /*#__PURE__*/React__default.default.createElement("style", null, `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `));
    }
    if (error) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xl",
        style: {
          color: 'red',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement("h3", null, "Error: ", error));
    }
    const {
      totalRegistrations = 0,
      paidRegistrations = 0,
      pendingRegistrations = 0,
      failedRegistrations = 0,
      totalRevenue = 0,
      pendingRevenue = 0,
      participantTypes = [],
      accommodations = [],
      recentRegistrations = [],
      totalContacts = 0,
      totalAbstracts = 0,
      totalExhibitors = 0,
      recentContacts = [],
      recentAbstracts = [],
      recentExhibitors = [],
      dailyTrend = []
    } = data || {};
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "xl",
      style: {
        backgroundColor: '#fcfbf7',
        minHeight: '100vh',
        fontFamily: "'Outfit', 'Inter', sans-serif"
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: 'linear-gradient(135deg, #1b4d3e 0%, #0d2820 100%)',
        borderRadius: '16px',
        padding: '30px 40px',
        color: '#ffffff',
        marginBottom: '30px',
        boxShadow: '0 8px 30px rgba(27, 77, 62, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        position: 'absolute',
        right: '-20px',
        bottom: '-40px',
        opacity: 0.1,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "250",
      height: "250",
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.79,16.83C9.88,17.76 12,18 14,18C21,18 20,8 20,8H17M14,16C12.18,16 10.39,15.77 8.73,15.28L15.34,8.67C15.73,8.28 15.73,7.65 15.34,7.26C14.95,6.87 14.32,6.87 13.93,7.26L7.33,13.87C6.84,12.21 6.61,10.42 6.61,8.6C6.61,6.6 6.85,4.48 7.78,2.39L5.89,1.7L4.97,3.79C2.79,8.74 3.73,14.6 7.74,18.6C9.1,19.96 10.97,20.72 13,20.89L20.89,13L21,11C21,11 19,13 17,14C15.8,14.6 14.6,15.2 14,16Z"
    }))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        maxWidth: '75%'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        backgroundColor: '#c5a059',
        color: '#1b4d3e',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        display: 'inline-block',
        marginBottom: '15px'
      }
    }, "Ayurveda Summit 2026"), /*#__PURE__*/React__default.default.createElement("h1", {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0 0 10px 0',
        fontFamily: 'serif',
        letterSpacing: '0.5px'
      }
    }, "AyurMilan Administrative Portal"), /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        margin: 0,
        fontSize: '15px',
        color: '#cef0e3',
        lineHeight: '1.5'
      }
    }, "Welcome to the command center. Monitor user registrations, confirm payments, analyze statistics, and manage system coupons for the grand summit taking place on ", /*#__PURE__*/React__default.default.createElement("strong", null, "1 \u2013 2 October 2026"), " in ", /*#__PURE__*/React__default.default.createElement("strong", null, "Vrindavan"), "."))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px 20px -10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #1b4d3e'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Total Registrants"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#222d29'
      }
    }, totalRegistrations), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, "Forms submitted")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#cef0e3',
        color: '#1b4d3e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M23 21v-2a4 4 0 0 0-3-3.87"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    }))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #28a745'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Confirmed (Paid)"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#28a745'
      }
    }, paidRegistrations), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, totalRegistrations > 0 ? Math.round(paidRegistrations / totalRegistrations * 100) : 0, "% Conversion rate")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#e2f7e6',
        color: '#28a745',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
    }), /*#__PURE__*/React__default.default.createElement("polyline", {
      points: "22 4 12 14.01 9 11.01"
    }))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #fd7e14'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Pending Review"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fd7e14'
      }
    }, pendingRegistrations), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, "Awaiting verification")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#fff0e2',
        color: '#fd7e14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React__default.default.createElement("polyline", {
      points: "12 6 12 12 16 14"
    }))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #c5a059'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Revenue Collected"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1b4d3e'
      }
    }, "\u20B9", totalRevenue.toLocaleString('en-IN')), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, "\u20B9", pendingRevenue.toLocaleString('en-IN'), " pending verification")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#fcf4e4',
        color: '#c5a059',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        fontWeight: 'bold',
        fontSize: '20px'
      }
    }, "\u20B9"))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px 10px -10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1.6',
        minWidth: '320px',
        padding: '0 10px',
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        height: '100%'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        fontWeight: 'bold',
        fontFamily: 'serif',
        letterSpacing: '0.5px'
      }
    }, "\uD83D\uDCC8 Registration Activity Trend (Last 7 Days)"), /*#__PURE__*/React__default.default.createElement(AreaChart, {
      trendData: dailyTrend
    }))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '280px',
        padding: '0 10px',
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        fontWeight: 'bold',
        fontFamily: 'serif',
        letterSpacing: '0.5px',
        alignSelf: 'flex-start'
      }
    }, "\uD83D\uDCCA Payment Status Distribution"), /*#__PURE__*/React__default.default.createElement(DonutChart, {
      paid: paidRegistrations,
      pending: pendingRegistrations,
      failed: failedRegistrations,
      total: totalRegistrations
    })))), /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '15px 0 15px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        fontWeight: 'bold',
        fontFamily: 'serif',
        letterSpacing: '0.5px'
      }
    }, "Inquiries & Submission Metrics"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px 30px -10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #007bff'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Contact Messages"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#222d29'
      }
    }, totalContacts), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, "Helpdesk messages")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#e6f2ff',
        color: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    }), /*#__PURE__*/React__default.default.createElement("polyline", {
      points: "22,6 12,13 2,6"
    }))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #6f42c1'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Scientific Papers"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#6f42c1'
      }
    }, totalAbstracts), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, "Abstracts submitted")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#f1e6ff',
        color: '#6f42c1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React__default.default.createElement("polyline", {
      points: "14 2 14 8 20 8"
    }), /*#__PURE__*/React__default.default.createElement("line", {
      x1: "16",
      y1: "13",
      x2: "8",
      y2: "13"
    }), /*#__PURE__*/React__default.default.createElement("line", {
      x1: "16",
      y1: "17",
      x2: "8",
      y2: "17"
    }))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '240px',
        margin: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0edf0',
        borderLeft: '5px solid #e83e8c'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#777777',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, "Exhibitors & Stalls"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#e83e8c'
      }
    }, totalExhibitors), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '12px',
        color: '#999999',
        marginTop: '4px'
      }
    }, "Expo bookings")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#ffe6f2',
        color: '#e83e8c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default.default.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2",
      ry: "2"
    }), /*#__PURE__*/React__default.default.createElement("line", {
      x1: "3",
      y1: "9",
      x2: "21",
      y2: "9"
    }), /*#__PURE__*/React__default.default.createElement("line", {
      x1: "9",
      y1: "21",
      x2: "9",
      y2: "9"
    })))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -15px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '2',
        minWidth: '320px',
        padding: '0 15px',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Recent Summit Registrants"), recentRegistrations.length === 0 ? /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: '#777777',
        textAlign: 'center',
        margin: '30px 0'
      }
    }, "No registrations found yet.") : /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #f4f2eb'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Name"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Participant Type"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Paid Amount"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Status"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Registered"))), /*#__PURE__*/React__default.default.createElement("tbody", null, recentRegistrations.map(reg => {
      let badgeColor = '#ffeeba';
      let badgeTextCol = '#856404';
      if (reg.paymentStatus === 'PAID') {
        badgeColor = '#d4edda';
        badgeTextCol = '#155724';
      } else if (reg.paymentStatus === 'FAILED') {
        badgeColor = '#f8d7da';
        badgeTextCol = '#721c24';
      }
      return /*#__PURE__*/React__default.default.createElement("tr", {
        key: reg.id,
        style: {
          borderBottom: '1px solid #f6f5f0'
        }
      }, /*#__PURE__*/React__default.default.createElement("td", {
        style: {
          padding: '14px 10px',
          fontWeight: '500',
          color: '#222d29'
        }
      }, reg.name, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          fontSize: '11px',
          color: '#888888',
          fontWeight: 'normal',
          marginTop: '2px'
        }
      }, reg.email)), /*#__PURE__*/React__default.default.createElement("td", {
        style: {
          padding: '14px 10px',
          fontSize: '13px',
          color: '#555555'
        }
      }, reg.participantType), /*#__PURE__*/React__default.default.createElement("td", {
        style: {
          padding: '14px 10px',
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#1b4d3e'
        }
      }, "\u20B9", reg.payableAmount), /*#__PURE__*/React__default.default.createElement("td", {
        style: {
          padding: '14px 10px'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          backgroundColor: badgeColor,
          color: badgeTextCol,
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'inline-block'
        }
      }, reg.paymentStatus === 'PAID' ? 'CONFIRMED' : reg.paymentStatus)), /*#__PURE__*/React__default.default.createElement("td", {
        style: {
          padding: '14px 10px',
          fontSize: '12px',
          color: '#888888'
        }
      }, new Date(reg.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })));
    }))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Recent Contact Messages"), recentContacts.length === 0 ? /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: '#777777',
        textAlign: 'center',
        margin: '20px 0'
      }
    }, "No messages received yet.") : /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #f4f2eb'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Sender"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Phone"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Message"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Received"))), /*#__PURE__*/React__default.default.createElement("tbody", null, recentContacts.map(contact => /*#__PURE__*/React__default.default.createElement("tr", {
      key: contact.id,
      style: {
        borderBottom: '1px solid #f6f5f0'
      }
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontWeight: '500',
        color: '#222d29'
      }
    }, contact.name, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '11px',
        color: '#888888',
        fontWeight: 'normal',
        marginTop: '2px'
      }
    }, contact.email)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '13px',
        color: '#555555'
      }
    }, contact.phone), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '13px',
        color: '#555555',
        maxWidth: '280px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, contact.message), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '12px',
        color: '#888888'
      }
    }, new Date(contact.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })))))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Recent Abstract Submissions"), recentAbstracts.length === 0 ? /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: '#777777',
        textAlign: 'center',
        margin: '20px 0'
      }
    }, "No abstracts submitted yet.") : /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #f4f2eb'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Author"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Track / Type"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Title"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Date"))), /*#__PURE__*/React__default.default.createElement("tbody", null, recentAbstracts.map(abstract => /*#__PURE__*/React__default.default.createElement("tr", {
      key: abstract.id,
      style: {
        borderBottom: '1px solid #f6f5f0'
      }
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontWeight: '500',
        color: '#222d29'
      }
    }, abstract.name, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '11px',
        color: '#888888',
        fontWeight: 'normal',
        marginTop: '2px'
      }
    }, abstract.institution)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '13px',
        color: '#555555'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", null, abstract.category), /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        fontSize: '11px',
        backgroundColor: '#e2f0d9',
        color: '#385723',
        padding: '2px 6px',
        borderRadius: '4px',
        display: 'inline-block',
        marginTop: '4px',
        fontWeight: 'bold'
      }
    }, abstract.presentationType)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '13px',
        color: '#222d29',
        fontWeight: '500',
        maxWidth: '220px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, abstract.title), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '12px',
        color: '#888888'
      }
    }, new Date(abstract.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })))))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Recent Exhibitor & Stall Bookings"), recentExhibitors.length === 0 ? /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: '#777777',
        textAlign: 'center',
        margin: '20px 0'
      }
    }, "No exhibitor bookings found.") : /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #f4f2eb'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Company"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Contact Person"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Category"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px 10px',
        color: '#555555',
        fontSize: '13px',
        textTransform: 'uppercase'
      }
    }, "Location"))), /*#__PURE__*/React__default.default.createElement("tbody", null, recentExhibitors.map(exh => /*#__PURE__*/React__default.default.createElement("tr", {
      key: exh.id,
      style: {
        borderBottom: '1px solid #f6f5f0'
      }
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontWeight: '600',
        color: '#1b4d3e'
      }
    }, exh.companyName, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '11px',
        color: '#888888',
        fontWeight: 'normal',
        marginTop: '2px'
      }
    }, exh.email)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '13px',
        color: '#222d29'
      }
    }, exh.contactName, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '11px',
        color: '#666666'
      }
    }, exh.phone)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '13px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        backgroundColor: '#fff3cd',
        color: '#856404',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block'
      }
    }, exh.category)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '14px 10px',
        fontSize: '12px',
        color: '#555555'
      }
    }, exh.city, ", ", exh.state)))))))), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        flex: '1',
        minWidth: '280px',
        padding: '0 15px',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Participant Demographics"), participantTypes.length === 0 ? /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: '#777777',
        fontSize: '13px'
      }
    }, "No demographic data yet.") : participantTypes.map(pt => {
      const percentage = totalRegistrations > 0 ? Math.round(pt._count.id / totalRegistrations * 100) : 0;
      return /*#__PURE__*/React__default.default.createElement("div", {
        key: pt.participantType,
        style: {
          marginBottom: '15px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '13px',
          marginBottom: '5px'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: '500',
          color: '#333333',
          maxWidth: '80%'
        }
      }, pt.participantType), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: 'bold',
          color: '#1b4d3e'
        }
      }, pt._count.id, " (", percentage, "%)")), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          height: '8px',
          backgroundColor: '#f0edf0',
          borderRadius: '4px',
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#1b4d3e',
          borderRadius: '4px'
        }
      })));
    })), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#1b4d3e',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Accommodation Choices"), accommodations.length === 0 ? /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: '#777777',
        fontSize: '13px'
      }
    }, "No accommodation requests yet.") : accommodations.map(acc => {
      const percentage = totalRegistrations > 0 ? Math.round(acc._count.id / totalRegistrations * 100) : 0;
      return /*#__PURE__*/React__default.default.createElement("div", {
        key: acc.accommodationType,
        style: {
          marginBottom: '15px'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '13px',
          marginBottom: '5px'
        }
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: '500',
          color: '#333333'
        }
      }, acc.accommodationType === 'None' ? 'Self-Accommodation' : acc.accommodationType), /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          fontWeight: 'bold',
          color: '#c5a059'
        }
      }, acc._count.id, " (", percentage, "%)")), /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          height: '8px',
          backgroundColor: '#f0edf0',
          borderRadius: '4px',
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#c5a059',
          borderRadius: '4px'
        }
      })));
    })), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        border: '1px solid #f0edf0'
      }
    }, /*#__PURE__*/React__default.default.createElement("h4", {
      style: {
        margin: '0 0 12px 0',
        fontSize: '15px',
        color: '#1b4d3e'
      }
    }, "\uD83D\uDCCC Summit Logistics"), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        fontSize: '13px',
        lineHeight: '1.6',
        color: '#555555'
      }
    }, /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        margin: '4px 0'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Dates:"), " 1 \u2013 2 October 2026"), /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        margin: '4px 0'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Location:"), " Shri Krishna Janmashtami Ashram, Vrindavan, UP"), /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        margin: '4px 0'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Contact Emails:"), " ayurmilanofficial@gmail.com"), /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        margin: '4px 0'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Helplines:"), " +91 6280632669, +91 9697970004"))))));
  };

  const ApproveAction = props => {
    const {
      record,
      resource
    } = props;
    const navigate = reactRouter.useNavigate();
    const sendNotice = adminjs.useNotice();
    const [loading, setLoading] = React.useState(false);
    const api = new adminjs.ApiClient();
    const handleApprove = async () => {
      setLoading(true);
      try {
        const response = await api.recordAction({
          resourceId: resource.id,
          recordId: record.id,
          actionName: 'approve',
          method: 'POST',
          data: {}
        });
        sendNotice({
          message: `Registration for ${record.params.name} has been approved successfully!`,
          type: 'success'
        });
        navigate(`/admin/resources/${resource.id}`);
      } catch (err) {
        console.error(err);
        sendNotice({
          message: err.message || 'Error occurred during approval.',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    const handleCancel = () => {
      navigate(`/admin/resources/${resource.id}`);
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "grey",
      style: {
        padding: '40px',
        minHeight: '100vh',
        fontFamily: "'Outfit', 'Inter', sans-serif"
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #f0edf0'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      style: {
        color: '#1b4d3e',
        marginBottom: '20px',
        borderBottom: '2px solid #f4f2eb',
        paddingBottom: '10px'
      }
    }, "Confirm Registration Approval"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '15px',
        color: '#555555',
        marginBottom: '20px',
        lineHeight: '1.6'
      }
    }, "You are about to approve the delegate registration for ", /*#__PURE__*/React__default.default.createElement("strong", null, record.params.name), ". This will update the ticket status to ", /*#__PURE__*/React__default.default.createElement("strong", null, "CONFIRMED (PAID)"), " and trigger the automated email containing their entry ticket and credentials."), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        background: '#fcfbf7',
        border: '1px solid #f0edf0',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Participant Name:"), " ", record.params.name), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Email:"), " ", record.params.email), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Payable Amount:"), " \u20B9", record.params.payableAmount), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "UPI UTR Reference:"), " ", /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#fd7e14'
      }
    }, record.params.paymentReference || 'N/A'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleCancel,
      disabled: loading,
      style: {
        background: '#f4f2eb',
        color: '#333',
        border: '1px solid #d4d0c5',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }
    }, "Cancel"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleApprove,
      disabled: loading,
      style: {
        background: '#28a745',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(40,167,69,0.2)'
      }
    }, loading ? 'Approving...' : 'Confirm & Approve'))));
  };

  const VerifiedList = props => {
    const {
      record
    } = props;
    const verified = record.params.verified === true || record.params.verified === 'true';
    if (verified) {
      return /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          background: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'inline-block',
          whiteSpace: 'nowrap'
        }
      }, "\u2713 Approved");
    }
    return /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        background: '#fff3cd',
        color: '#856404',
        border: '1px solid #ffeeba',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }
    }, "\u26A0 Awaiting Approval");
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.ApproveAction = ApproveAction;
  AdminJS.UserComponents.VerifiedList = VerifiedList;

})(React, AdminJS, AdminJSDesignSystem, ReactRouter);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29uZmlnL2Rhc2hib2FyZC5qc3giLCIuLi9zcmMvY29uZmlnL2FwcHJvdmVBY3Rpb24uanN4IiwiLi4vc3JjL2NvbmZpZy92ZXJpZmllZExpc3QuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG4vLyAxLiBTbGVlayBTVkcgRG9udXQgQ2hhcnQgcmVwcmVzZW50aW5nIFJlZ2lzdHJhdGlvbiBTdGF0dXNlc1xuY29uc3QgRG9udXRDaGFydCA9ICh7IHBhaWQsIHBlbmRpbmcsIGZhaWxlZCwgdG90YWwgfSkgPT4ge1xuICBjb25zdCB0b3RhbFZhbCA9IHBhaWQgKyBwZW5kaW5nICsgZmFpbGVkIHx8IDE7XG4gIGNvbnN0IHBjdFBhaWQgPSAocGFpZCAvIHRvdGFsVmFsKSAqIDEwMDtcbiAgY29uc3QgcGN0UGVuZGluZyA9IChwZW5kaW5nIC8gdG90YWxWYWwpICogMTAwO1xuICBjb25zdCBwY3RGYWlsZWQgPSAoZmFpbGVkIC8gdG90YWxWYWwpICogMTAwO1xuXG4gIC8vIENpcmN1bWZlcmVuY2Ugb2YgY2lyY2xlIHdpdGggcj03MDogMiAqIE1hdGguUEkgKiA3MCA9IDQzOS44MlxuICBjb25zdCBjaXJjID0gNDM5LjgyO1xuICBjb25zdCBzdHJva2VQYWlkID0gKHBjdFBhaWQgLyAxMDApICogY2lyYztcbiAgY29uc3Qgc3Ryb2tlUGVuZGluZyA9IChwY3RQZW5kaW5nIC8gMTAwKSAqIGNpcmM7XG4gIGNvbnN0IHN0cm9rZUZhaWxlZCA9IChwY3RGYWlsZWQgLyAxMDApICogY2lyYztcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHdpZHRoOiAnMTAwJScsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiAnMTgwcHgnLCBoZWlnaHQ6ICcxODBweCcsIG1hcmdpbjogJzEwcHggMCcgfX0+XG4gICAgICAgIDxzdmcgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiB2aWV3Qm94PVwiMCAwIDIwMCAyMDBcIiBzdHlsZT17eyB0cmFuc2Zvcm06ICdyb3RhdGUoLTkwZGVnKScgfX0+XG4gICAgICAgICAgey8qIEJhY2tncm91bmQgdHJhY2sgKi99XG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjEwMFwiIGN5PVwiMTAwXCIgcj1cIjcwXCIgZmlsbD1cInRyYW5zcGFyZW50XCIgc3Ryb2tlPVwiI2Y0ZjJlYlwiIHN0cm9rZVdpZHRoPVwiMThcIiAvPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBQYWlkIChHcmVlbikgKi99XG4gICAgICAgICAge3BhaWQgPiAwICYmIChcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMDBcIiBjeT1cIjEwMFwiIHI9XCI3MFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHN0cm9rZT1cIiMyOGE3NDVcIiBzdHJva2VXaWR0aD1cIjE4XCJcbiAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtjaXJjfVxuICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXtjaXJjIC0gc3Ryb2tlUGFpZH1cbiAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNpdGlvbjogJ2FsbCAwLjZzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSknIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFBlbmRpbmcgKE9yYW5nZSkgKi99XG4gICAgICAgICAge3BlbmRpbmcgPiAwICYmIChcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMDBcIiBjeT1cIjEwMFwiIHI9XCI3MFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHN0cm9rZT1cIiNmZDdlMTRcIiBzdHJva2VXaWR0aD1cIjE4XCJcbiAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtjaXJjfVxuICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXtjaXJjIC0gc3Ryb2tlUGVuZGluZ31cbiAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtPXtgcm90YXRlKCR7KHBjdFBhaWQgLyAxMDApICogMzYwfSAxMDAgMTAwKWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zaXRpb246ICdhbGwgMC42cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpJyB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIEZhaWxlZCAoUmVkKSAqL31cbiAgICAgICAgICB7ZmFpbGVkID4gMCAmJiAoXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTAwXCIgY3k9XCIxMDBcIiByPVwiNzBcIiBmaWxsPVwidHJhbnNwYXJlbnRcIiBzdHJva2U9XCIjZGMzNTQ1XCIgc3Ryb2tlV2lkdGg9XCIxOFwiXG4gICAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT17Y2lyY31cbiAgICAgICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17Y2lyYyAtIHN0cm9rZUZhaWxlZH1cbiAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtPXtgcm90YXRlKCR7KChwY3RQYWlkICsgcGN0UGVuZGluZykgLyAxMDApICogMzYwfSAxMDAgMTAwKWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zaXRpb246ICdhbGwgMC42cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpJyB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgey8qIENlbnRyYWwgbGFiZWwgb3ZlcmxheSAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJ1xuICAgICAgICB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzI4cHgnLCBmb250V2VpZ2h0OiAnODAwJywgY29sb3I6ICcjMjIyZDI5JywgbGluZUhlaWdodDogMSB9fT57dG90YWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAnIzc3Nzc3NycsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpblRvcDogJzRweCcsIGxldHRlclNwYWNpbmc6ICcwLjVweCcgfX0+VG90YWw8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBMZWdlbmQgQmxvY2sgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTVweCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgd2lkdGg6ICcxMDAlJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzEwcHgnLCBoZWlnaHQ6ICcxMHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZENvbG9yOiAnIzI4YTc0NScsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH19Pjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyM1NTU1NTUnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5QYWlkICh7cGFpZH0pPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAnMTBweCcsIGhlaWdodDogJzEwcHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmQ3ZTE0JywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfX0+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzU1NTU1NScsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlBlbmRpbmcgKHtwZW5kaW5nfSk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcsIGZvbnRTaXplOiAnMTJweCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6ICcxMHB4JywgaGVpZ2h0OiAnMTBweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmRDb2xvcjogJyNkYzM1NDUnLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9fT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjNTU1NTU1JywgZm9udFdlaWdodDogJzUwMCcgfX0+RmFpbGVkICh7ZmFpbGVkfSk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyAyLiBIaWdoLUZpZGVsaXR5IFNWRyBBcmVhL0xpbmUgQ2hhcnQgcmVwcmVzZW50aW5nIDctZGF5IHJlZ2lzdHJhdGlvbiB0cmVuZHNcbmNvbnN0IEFyZWFDaGFydCA9ICh7IHRyZW5kRGF0YSA9IFtdIH0pID0+IHtcbiAgaWYgKHRyZW5kRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gPHAgc3R5bGU9e3sgY29sb3I6ICcjNzc3Nzc3JywgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luOiAnNDBweCAwJyB9fT5ObyB0cmVuZCBkYXRhIGF2YWlsYWJsZS48L3A+O1xuICB9XG5cbiAgLy8gRmluZCBtYXggdmFsdWUgdG8gc2NhbGUgdGhlIFkgYXhpc1xuICBjb25zdCBtYXhWYWwgPSBNYXRoLm1heCguLi50cmVuZERhdGEubWFwKGQgPT4gZC5jb3VudCksIDQpO1xuXG4gIGNvbnN0IHdpZHRoID0gNTAwO1xuICBjb25zdCBoZWlnaHQgPSAxODA7XG4gIGNvbnN0IHBhZGRpbmdMZWZ0ID0gMzI7XG4gIGNvbnN0IHBhZGRpbmdSaWdodCA9IDE1O1xuICBjb25zdCBwYWRkaW5nVG9wID0gMjA7XG4gIGNvbnN0IHBhZGRpbmdCb3R0b20gPSAyNTtcblxuICBjb25zdCBjaGFydFdpZHRoID0gd2lkdGggLSBwYWRkaW5nTGVmdCAtIHBhZGRpbmdSaWdodDtcbiAgY29uc3QgY2hhcnRIZWlnaHQgPSBoZWlnaHQgLSBwYWRkaW5nVG9wIC0gcGFkZGluZ0JvdHRvbTtcblxuICAvLyBDb21wdXRlIGFic29sdXRlIGNoYXJ0IGNvb3JkaW5hdGVzXG4gIGNvbnN0IHBvaW50cyA9IHRyZW5kRGF0YS5tYXAoKGQsIGkpID0+IHtcbiAgICBjb25zdCB4ID0gcGFkZGluZ0xlZnQgKyAoaSAvICh0cmVuZERhdGEubGVuZ3RoIC0gMSkpICogY2hhcnRXaWR0aDtcbiAgICBjb25zdCB5ID0gcGFkZGluZ1RvcCArIGNoYXJ0SGVpZ2h0IC0gKGQuY291bnQgLyBtYXhWYWwpICogY2hhcnRIZWlnaHQ7XG4gICAgcmV0dXJuIHsgeCwgeSwgbGFiZWw6IGQuZGF0ZSwgdmFsdWU6IGQuY291bnQgfTtcbiAgfSk7XG5cbiAgLy8gQ3JlYXRlIHBhdGggc3RyaW5nc1xuICBjb25zdCBsaW5lUGF0aCA9IHBvaW50cy5tYXAoKHAsIGkpID0+IGAke2kgPT09IDAgPyAnTScgOiAnTCd9ICR7cC54fSAke3AueX1gKS5qb2luKCcgJyk7XG4gIGNvbnN0IGFyZWFQYXRoID0gYCR7bGluZVBhdGh9IEwgJHtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLnh9ICR7cGFkZGluZ1RvcCArIGNoYXJ0SGVpZ2h0fSBMICR7cG9pbnRzWzBdLnh9ICR7cGFkZGluZ1RvcCArIGNoYXJ0SGVpZ2h0fSBaYDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9IHN0eWxlPXt7IG92ZXJmbG93OiAndmlzaWJsZScsIG1pbldpZHRoOiAnNDUwcHgnIH19PlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJhcmVhR3JhZFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjMWI0ZDNlXCIgc3RvcE9wYWNpdHk9XCIwLjI1XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjMWI0ZDNlXCIgc3RvcE9wYWNpdHk9XCIwLjAxXCIgLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAgey8qIEdyaWQgbGluZXMgKGhvcml6b250YWwpICovfVxuICAgICAgICB7WzAsIDAuMjUsIDAuNSwgMC43NSwgMV0ubWFwKChyYXRpbykgPT4ge1xuICAgICAgICAgIGNvbnN0IHkgPSBwYWRkaW5nVG9wICsgcmF0aW8gKiBjaGFydEhlaWdodDtcbiAgICAgICAgICBjb25zdCBsYWJlbFZhbCA9IE1hdGgucm91bmQobWF4VmFsICogKDEgLSByYXRpbykpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZyBrZXk9e3JhdGlvfSBvcGFjaXR5PVwiMC42XCI+XG4gICAgICAgICAgICAgIDxsaW5lIHgxPXtwYWRkaW5nTGVmdH0geTE9e3l9IHgyPXt3aWR0aCAtIHBhZGRpbmdSaWdodH0geTI9e3l9IHN0cm9rZT1cIiNlNGUyZWJcIiBzdHJva2VXaWR0aD1cIjFcIiBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiAvPlxuICAgICAgICAgICAgICA8dGV4dCB4PXtwYWRkaW5nTGVmdCAtIDh9IHk9e3kgKyAzfSB0ZXh0QW5jaG9yPVwiZW5kXCIgZm9udFNpemU9XCIxMFwiIGZpbGw9XCIjODg4ODg4XCIgZm9udFdlaWdodD1cIjYwMFwiPntsYWJlbFZhbH08L3RleHQ+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG5cbiAgICAgICAgey8qIENvbG9yZWQgQXJlYSBwYXRoICovfVxuICAgICAgICA8cGF0aCBkPXthcmVhUGF0aH0gZmlsbD1cInVybCgjYXJlYUdyYWQpXCIgLz5cblxuICAgICAgICB7LyogU21vb3RoIGxpbmUgcGF0aCAqL31cbiAgICAgICAgPHBhdGggZD17bGluZVBhdGh9IGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzFiNGQzZVwiIHN0cm9rZVdpZHRoPVwiM1wiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiAvPlxuXG4gICAgICAgIHsvKiBEb3RzLCBncmlkIHZlcnRpY2FsIGxpbmVzLCB2YWx1ZXMsIGFuZCBheGlzIHRpY2tzICovfVxuICAgICAgICB7cG9pbnRzLm1hcCgocCwgaWR4KSA9PiAoXG4gICAgICAgICAgPGcga2V5PXtpZHh9PlxuICAgICAgICAgICAgPGxpbmUgeDE9e3AueH0geTE9e3BhZGRpbmdUb3AgKyBjaGFydEhlaWdodH0geDI9e3AueH0geTI9e3BhZGRpbmdUb3B9IHN0cm9rZT1cIiNlNGUyZWJcIiBzdHJva2VXaWR0aD1cIjFcIiBzdHJva2VPcGFjaXR5PVwiMC4yNVwiIC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBEcmF3IGNpcmNsZSBwb2ludCBpbmRpY2F0b3IgKi99XG4gICAgICAgICAgICA8Y2lyY2xlIGN4PXtwLnh9IGN5PXtwLnl9IHI9XCI1XCIgZmlsbD1cIiNmZmZmZmZcIiBzdHJva2U9XCIjMWI0ZDNlXCIgc3Ryb2tlV2lkdGg9XCIyLjVcIiAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogTnVtZXJpYyBjb3VudCBhYm92ZSBkb3QgKi99XG4gICAgICAgICAgICA8dGV4dCB4PXtwLnh9IHk9e3AueSAtIDl9IHRleHRBbmNob3I9XCJtaWRkbGVcIiBmb250U2l6ZT1cIjEwXCIgZm9udFdlaWdodD1cImJvbGRcIiBmaWxsPVwiIzFiNGQzZVwiPlxuICAgICAgICAgICAgICB7cC52YWx1ZX1cbiAgICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIEJvdHRvbSBYLWF4aXMgRGF0ZSBsYWJlbCAqL31cbiAgICAgICAgICAgIDx0ZXh0IHg9e3AueH0geT17cGFkZGluZ1RvcCArIGNoYXJ0SGVpZ2h0ICsgMTZ9IHRleHRBbmNob3I9XCJtaWRkbGVcIiBmb250U2l6ZT1cIjEwXCIgZmlsbD1cIiM3Nzc3NzdcIiBmb250V2VpZ2h0PVwiNTAwXCI+XG4gICAgICAgICAgICAgIHtwLmxhYmVsfVxuICAgICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgKSl9XG4gICAgICA8L3N2Zz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIDMuIE1haW4gQWRtaW5pc3RyYXRpdmUgRGFzaGJvYXJkXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXBpLmdldERhc2hib2FyZCgpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGFzaGJvYXJkIHN0YXRzOicsIGVycik7XG4gICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBkYXNoYm9hcmQgc3RhdGlzdGljcy4nKTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggcGFkZGluZz1cInhsXCIgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICc4MHZoJywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIHN0eWxlPXt7XG4gICAgICAgICAgYm9yZGVyOiAnNHB4IHNvbGlkICNmM2YzZjMnLFxuICAgICAgICAgIGJvcmRlclRvcDogJzRweCBzb2xpZCAjMWI0ZDNlJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIHdpZHRoOiAnNTBweCcsXG4gICAgICAgICAgaGVpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgYW5pbWF0aW9uOiAnc3BpbiAxcyBsaW5lYXIgaW5maW5pdGUnLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzE1cHgnXG4gICAgICAgIH19PjwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiAnIzFiNGQzZScsIGZvbnRXZWlnaHQ6ICdib2xkJywgZm9udFNpemU6ICcxOHB4JyB9fT5Mb2FkaW5nIEF5dXJNaWxhbiBEYXNoYm9hcmQgU3RhdGlzdGljcy4uLjwvZGl2PlxuICAgICAgICA8c3R5bGU+e2BcbiAgICAgICAgICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgICAgICAgICAgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBwYWRkaW5nPVwieGxcIiBzdHlsZT17eyBjb2xvcjogJ3JlZCcsIHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxoMz5FcnJvcjoge2Vycm9yfTwvaDM+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIHRvdGFsUmVnaXN0cmF0aW9ucyA9IDAsXG4gICAgcGFpZFJlZ2lzdHJhdGlvbnMgPSAwLFxuICAgIHBlbmRpbmdSZWdpc3RyYXRpb25zID0gMCxcbiAgICBmYWlsZWRSZWdpc3RyYXRpb25zID0gMCxcbiAgICB0b3RhbFJldmVudWUgPSAwLFxuICAgIHBlbmRpbmdSZXZlbnVlID0gMCxcbiAgICBwYXJ0aWNpcGFudFR5cGVzID0gW10sXG4gICAgYWNjb21tb2RhdGlvbnMgPSBbXSxcbiAgICByZWNlbnRSZWdpc3RyYXRpb25zID0gW10sXG4gICAgdG90YWxDb250YWN0cyA9IDAsXG4gICAgdG90YWxBYnN0cmFjdHMgPSAwLFxuICAgIHRvdGFsRXhoaWJpdG9ycyA9IDAsXG4gICAgcmVjZW50Q29udGFjdHMgPSBbXSxcbiAgICByZWNlbnRBYnN0cmFjdHMgPSBbXSxcbiAgICByZWNlbnRFeGhpYml0b3JzID0gW10sXG4gICAgZGFpbHlUcmVuZCA9IFtdXG4gIH0gPSBkYXRhIHx8IHt9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBwYWRkaW5nPVwieGxcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmNmYmY3JywgbWluSGVpZ2h0OiAnMTAwdmgnLCBmb250RmFtaWx5OiBcIidPdXRmaXQnLCAnSW50ZXInLCBzYW5zLXNlcmlmXCIgfX0+XG4gICAgICB7LyogSGVybyBIZWFkZXIgQ2FyZCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICMxYjRkM2UgMCUsICMwZDI4MjAgMTAwJSknLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICcxNnB4JyxcbiAgICAgICAgcGFkZGluZzogJzMwcHggNDBweCcsXG4gICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDhweCAzMHB4IHJnYmEoMjcsIDc3LCA2MiwgMC4xNSknLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICB9fT5cbiAgICAgICAgey8qIExlYWYgR3JhcGhpYyBCYWNrZ3JvdW5kIEVsZW1lbnRzICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgcmlnaHQ6ICctMjBweCcsXG4gICAgICAgICAgYm90dG9tOiAnLTQwcHgnLFxuICAgICAgICAgIG9wYWNpdHk6IDAuMSxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZSdcbiAgICAgICAgfX0+XG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjI1MFwiIGhlaWdodD1cIjI1MFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE3LDhDOCwxMCA1LjksMTYuMTcgMy44MiwyMS4zNEw1LjcxLDIyTDcuNzksMTYuODNDOS44OCwxNy43NiAxMiwxOCAxNCwxOEMyMSwxOCAyMCw4IDIwLDhIMTdNMTQsMTZDMTIuMTgsMTYgMTAuMzksMTUuNzcgOC43MywxNS4yOEwxNS4zNCw4LjY3QzE1LjczLDguMjggMTUuNzMsNy42NSAxNS4zNCw3LjI2QzE0Ljk1LDYuODcgMTQuMzIsNi44NyAxMy45Myw3LjI2TDcuMzMsMTMuODdDNi44NCwxMi4yMSA2LjYxLDEwLjQyIDYuNjEsOC42QzYuNjEsNi42IDYuODUsNC40OCA3Ljc4LDIuMzlMNS44OSwxLjdMNC45NywzLjc5QzIuNzksOC43NCAzLjczLDE0LjYgNy43NCwxOC42QzkuMSwxOS45NiAxMC45NywyMC43MiAxMywyMC44OUwyMC44OSwxM0wyMSwxMUMyMSwxMSAxOSwxMyAxNywxNEMxNS44LDE0LjYgMTQuNiwxNS4yIDE0LDE2WlwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWF4V2lkdGg6ICc3NSUnIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjYzVhMDU5JyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzFiNGQzZScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNXB4IDEycHgnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMjBweCcsXG4gICAgICAgICAgICBmb250U2l6ZTogJzExcHgnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJzFweCcsXG4gICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMTVweCdcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIEF5dXJ2ZWRhIFN1bW1pdCAyMDI2XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxoMSBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbjogJzAgMCAxMHB4IDAnLCBmb250RmFtaWx5OiAnc2VyaWYnLCBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnIH19PlxuICAgICAgICAgICAgQXl1ck1pbGFuIEFkbWluaXN0cmF0aXZlIFBvcnRhbFxuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPHAgc3R5bGU9e3sgbWFyZ2luOiAwLCBmb250U2l6ZTogJzE1cHgnLCBjb2xvcjogJyNjZWYwZTMnLCBsaW5lSGVpZ2h0OiAnMS41JyB9fT5cbiAgICAgICAgICAgIFdlbGNvbWUgdG8gdGhlIGNvbW1hbmQgY2VudGVyLiBNb25pdG9yIHVzZXIgcmVnaXN0cmF0aW9ucywgY29uZmlybSBwYXltZW50cywgYW5hbHl6ZSBzdGF0aXN0aWNzLCBhbmQgbWFuYWdlIHN5c3RlbSBjb3Vwb25zIGZvciB0aGUgZ3JhbmQgc3VtbWl0IHRha2luZyBwbGFjZSBvbiA8c3Ryb25nPjEg4oCTIDIgT2N0b2JlciAyMDI2PC9zdHJvbmc+IGluIDxzdHJvbmc+VnJpbmRhdmFuPC9zdHJvbmc+LlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gUmVnaXN0cmF0aW9ucyBTdGF0cyBDYXJkcyBSb3cgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgICAgbWFyZ2luOiAnMCAtMTBweCAyMHB4IC0xMHB4J1xuICAgICAgfX0+XG4gICAgICAgIHsvKiBUb3RhbCBSZWdpc3RyYXRpb25zICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6ICcxJywgbWluV2lkdGg6ICcyNDBweCcsIG1hcmdpbjogJzEwcHgnIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDMpJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZjBlZGYwJyxcbiAgICAgICAgICAgIGJvcmRlckxlZnQ6ICc1cHggc29saWQgIzFiNGQzZSdcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNzc3Nzc3JywgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5Cb3R0b206ICc2cHgnLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgbGV0dGVyU3BhY2luZzogJzAuNXB4JyB9fT5cbiAgICAgICAgICAgICAgICBUb3RhbCBSZWdpc3RyYW50c1xuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzI4cHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzIyMmQyOScgfX0+e3RvdGFsUmVnaXN0cmF0aW9uc308L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM5OTk5OTknLCBtYXJnaW5Ub3A6ICc0cHgnIH19PkZvcm1zIHN1Ym1pdHRlZDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDhweCcsIGhlaWdodDogJzQ4cHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjY2VmMGUzJywgY29sb3I6ICcjMWI0ZDNlJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3IDIxdi0yYTQgNCAwIDAgMC00LTRINWE0IDQgMCAwIDAtNCA0djJcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjlcIiBjeT1cIjdcIiByPVwiNFwiPjwvY2lyY2xlPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjMgMjF2LTJhNCA0IDAgMCAwLTMtMy44N1wiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE2IDMuMTNhNCA0IDAgMCAxIDAgNy43NVwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbmZpcm1lZCBUaWNrZXRzICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6ICcxJywgbWluV2lkdGg6ICcyNDBweCcsIG1hcmdpbjogJzEwcHgnIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDMpJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZjBlZGYwJyxcbiAgICAgICAgICAgIGJvcmRlckxlZnQ6ICc1cHggc29saWQgIzI4YTc0NSdcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNzc3Nzc3JywgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5Cb3R0b206ICc2cHgnLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgbGV0dGVyU3BhY2luZzogJzAuNXB4JyB9fT5cbiAgICAgICAgICAgICAgICBDb25maXJtZWQgKFBhaWQpXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMjhweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMjhhNzQ1JyB9fT57cGFpZFJlZ2lzdHJhdGlvbnN9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjOTk5OTk5JywgbWFyZ2luVG9wOiAnNHB4JyB9fT5cbiAgICAgICAgICAgICAgICB7dG90YWxSZWdpc3RyYXRpb25zID4gMCA/IE1hdGgucm91bmQoKHBhaWRSZWdpc3RyYXRpb25zIC8gdG90YWxSZWdpc3RyYXRpb25zKSAqIDEwMCkgOiAwfSUgQ29udmVyc2lvbiByYXRlXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDhweCcsIGhlaWdodDogJzQ4cHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTJmN2U2JywgY29sb3I6ICcjMjhhNzQ1JywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIyIDExLjA4VjEyYTEwIDEwIDAgMSAxLTUuOTMtOS4xNFwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMjIgNCAxMiAxNC4wMSA5IDExLjAxXCI+PC9wb2x5bGluZT5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFBlbmRpbmcgQXBwcm92YWwgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogJzEnLCBtaW5XaWR0aDogJzI0MHB4JywgbWFyZ2luOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjRweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnLFxuICAgICAgICAgICAgYm9yZGVyTGVmdDogJzVweCBzb2xpZCAjZmQ3ZTE0J1xuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM3Nzc3NzcnLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkJvdHRvbTogJzZweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnIH19PlxuICAgICAgICAgICAgICAgIFBlbmRpbmcgUmV2aWV3XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMjhweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjZmQ3ZTE0JyB9fT57cGVuZGluZ1JlZ2lzdHJhdGlvbnN9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjOTk5OTk5JywgbWFyZ2luVG9wOiAnNHB4JyB9fT5Bd2FpdGluZyB2ZXJpZmljYXRpb248L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4cHgnLCBoZWlnaHQ6ICc0OHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZENvbG9yOiAnI2ZmZjBlMicsIGNvbG9yOiAnI2ZkN2UxNCcsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiPjwvY2lyY2xlPlxuICAgICAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIxMiA2IDEyIDEyIDE2IDE0XCI+PC9wb2x5bGluZT5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRvdGFsIFJldmVudWUgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogJzEnLCBtaW5XaWR0aDogJzI0MHB4JywgbWFyZ2luOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjRweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnLFxuICAgICAgICAgICAgYm9yZGVyTGVmdDogJzVweCBzb2xpZCAjYzVhMDU5J1xuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM3Nzc3NzcnLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkJvdHRvbTogJzZweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnIH19PlxuICAgICAgICAgICAgICAgIFJldmVudWUgQ29sbGVjdGVkXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMjhweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMWI0ZDNlJyB9fT7igrl7dG90YWxSZXZlbnVlLnRvTG9jYWxlU3RyaW5nKCdlbi1JTicpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAnIzk5OTk5OScsIG1hcmdpblRvcDogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAg4oK5e3BlbmRpbmdSZXZlbnVlLnRvTG9jYWxlU3RyaW5nKCdlbi1JTicpfSBwZW5kaW5nIHZlcmlmaWNhdGlvblxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4cHgnLCBoZWlnaHQ6ICc0OHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZENvbG9yOiAnI2ZjZjRlNCcsIGNvbG9yOiAnI2M1YTA1OScsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogJ2JvbGQnLCBmb250U2l6ZTogJzIwcHgnIH19PuKCuTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVmlzdWFsIENoYXJ0cyBBbmFseXRpY3MgU2VjdGlvbiAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW46ICcwIC0xMHB4IDEwcHggLTEwcHgnIH19PlxuICAgICAgICB7LyogVHJlbmQgQXJlYSBDaGFydCBDYXJkICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6ICcxLjYnLCBtaW5XaWR0aDogJzMyMHB4JywgcGFkZGluZzogJzAgMTBweCcsIG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI1cHgnLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDMpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZjBlZGYwJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDIwcHggMCcsIGZvbnRTaXplOiAnMThweCcsIGNvbG9yOiAnIzFiNGQzZScsIGZvbnRXZWlnaHQ6ICdib2xkJywgZm9udEZhbWlseTogJ3NlcmlmJywgbGV0dGVyU3BhY2luZzogJzAuNXB4JyB9fT5cbiAgICAgICAgICAgICAg8J+TiCBSZWdpc3RyYXRpb24gQWN0aXZpdHkgVHJlbmQgKExhc3QgNyBEYXlzKVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxBcmVhQ2hhcnQgdHJlbmREYXRhPXtkYWlseVRyZW5kfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGlja2V0IFN0YXR1cyBEb251dCBDaGFydCBDYXJkICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6ICcxJywgbWluV2lkdGg6ICcyODBweCcsIHBhZGRpbmc6ICcwIDEwcHgnLCBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcyNXB4JyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE1cHggcmdiYSgwLDAsMCwwLjAzKScsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2YwZWRmMCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17eyBtYXJnaW46ICcwIDAgMjBweCAwJywgZm9udFNpemU6ICcxOHB4JywgY29sb3I6ICcjMWI0ZDNlJywgZm9udFdlaWdodDogJ2JvbGQnLCBmb250RmFtaWx5OiAnc2VyaWYnLCBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnLCBhbGlnblNlbGY6ICdmbGV4LXN0YXJ0JyB9fT5cbiAgICAgICAgICAgICAg8J+TiiBQYXltZW50IFN0YXR1cyBEaXN0cmlidXRpb25cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8RG9udXRDaGFydCBcbiAgICAgICAgICAgICAgcGFpZD17cGFpZFJlZ2lzdHJhdGlvbnN9IFxuICAgICAgICAgICAgICBwZW5kaW5nPXtwZW5kaW5nUmVnaXN0cmF0aW9uc30gXG4gICAgICAgICAgICAgIGZhaWxlZD17ZmFpbGVkUmVnaXN0cmF0aW9uc30gXG4gICAgICAgICAgICAgIHRvdGFsPXt0b3RhbFJlZ2lzdHJhdGlvbnN9IFxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFN1Ym1pc3Npb25zIFN0YXRzIEdyaWQgKi99XG4gICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMTVweCAwIDE1cHggMCcsIGZvbnRTaXplOiAnMThweCcsIGNvbG9yOiAnIzFiNGQzZScsIGZvbnRXZWlnaHQ6ICdib2xkJywgZm9udEZhbWlseTogJ3NlcmlmJywgbGV0dGVyU3BhY2luZzogJzAuNXB4JyB9fT5JbnF1aXJpZXMgJmFtcDsgU3VibWlzc2lvbiBNZXRyaWNzPC9oMz5cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4V3JhcDogJ3dyYXAnLFxuICAgICAgICBtYXJnaW46ICcwIC0xMHB4IDMwcHggLTEwcHgnXG4gICAgICB9fT5cbiAgICAgICAgey8qIENvbnRhY3Qgc3VibWlzc2lvbnMgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogJzEnLCBtaW5XaWR0aDogJzI0MHB4JywgbWFyZ2luOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjBweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnLFxuICAgICAgICAgICAgYm9yZGVyTGVmdDogJzVweCBzb2xpZCAjMDA3YmZmJ1xuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM3Nzc3NzcnLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkJvdHRvbTogJzZweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnIH19PlxuICAgICAgICAgICAgICAgIENvbnRhY3QgTWVzc2FnZXNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcyNHB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMyMjJkMjknIH19Pnt0b3RhbENvbnRhY3RzfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAnIzk5OTk5OScsIG1hcmdpblRvcDogJzRweCcgfX0+SGVscGRlc2sgbWVzc2FnZXM8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQwcHgnLCBoZWlnaHQ6ICc0MHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZENvbG9yOiAnI2U2ZjJmZicsIGNvbG9yOiAnIzAwN2JmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk00IDRoMTZjMS4xIDAgMiAuOSAyIDJ2MTJjMCAxLjEtLjkgMi0yIDJINGMtMS4xIDAtMi0uOS0yLTJWNmMwLTEuMS45LTIgMi0yelwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMjIsNiAxMiwxMyAyLDZcIj48L3BvbHlsaW5lPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWJzdHJhY3Qgc3VibWlzc2lvbnMgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogJzEnLCBtaW5XaWR0aDogJzI0MHB4JywgbWFyZ2luOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjBweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnLFxuICAgICAgICAgICAgYm9yZGVyTGVmdDogJzVweCBzb2xpZCAjNmY0MmMxJ1xuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM3Nzc3NzcnLCBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkJvdHRvbTogJzZweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnIH19PlxuICAgICAgICAgICAgICAgIFNjaWVudGlmaWMgUGFwZXJzXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMjRweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjNmY0MmMxJyB9fT57dG90YWxBYnN0cmFjdHN9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjOTk5OTk5JywgbWFyZ2luVG9wOiAnNHB4JyB9fT5BYnN0cmFjdHMgc3VibWl0dGVkPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0MHB4JywgaGVpZ2h0OiAnNDBweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmRDb2xvcjogJyNmMWU2ZmYnLCBjb2xvcjogJyM2ZjQyYzEnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjh6XCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIxNCAyIDE0IDggMjAgOFwiPjwvcG9seWxpbmU+XG4gICAgICAgICAgICAgICAgPGxpbmUgeDE9XCIxNlwiIHkxPVwiMTNcIiB4Mj1cIjhcIiB5Mj1cIjEzXCI+PC9saW5lPlxuICAgICAgICAgICAgICAgIDxsaW5lIHgxPVwiMTZcIiB5MT1cIjE3XCIgeDI9XCI4XCIgeTI9XCIxN1wiPjwvbGluZT5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEV4aGliaXRvciBzdWJtaXNzaW9ucyAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAnMScsIG1pbldpZHRoOiAnMjQwcHgnLCBtYXJnaW46ICcxMHB4JyB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcyMHB4JyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE1cHggcmdiYSgwLDAsMCwwLjAzKScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2YwZWRmMCcsXG4gICAgICAgICAgICBib3JkZXJMZWZ0OiAnNXB4IHNvbGlkICNlODNlOGMnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAnIzc3Nzc3NycsIGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luQm90dG9tOiAnNnB4JywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGxldHRlclNwYWNpbmc6ICcwLjVweCcgfX0+XG4gICAgICAgICAgICAgICAgRXhoaWJpdG9ycyAmYW1wOyBTdGFsbHNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcyNHB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyNlODNlOGMnIH19Pnt0b3RhbEV4aGliaXRvcnN9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjOTk5OTk5JywgbWFyZ2luVG9wOiAnNHB4JyB9fT5FeHBvIGJvb2tpbmdzPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0MHB4JywgaGVpZ2h0OiAnNDBweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmRDb2xvcjogJyNmZmU2ZjInLCBjb2xvcjogJyNlODNlOGMnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIzXCIgeT1cIjNcIiB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIiByeD1cIjJcIiByeT1cIjJcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPGxpbmUgeDE9XCIzXCIgeTE9XCI5XCIgeDI9XCIyMVwiIHkyPVwiOVwiPjwvbGluZT5cbiAgICAgICAgICAgICAgICA8bGluZSB4MT1cIjlcIiB5MT1cIjIxXCIgeDI9XCI5XCIgeTI9XCI5XCI+PC9saW5lPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBJbmZvcm1hdGlvbiBUYWJsZXMgUm93ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbjogJzAgLTE1cHgnIH19PlxuICAgICAgICB7LyogTGVmdCBjb2x1bW46IEFuYWx5dGljcyAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAnMicsIG1pbldpZHRoOiAnMzIwcHgnLCBwYWRkaW5nOiAnMCAxNXB4JywgbWFyZ2luQm90dG9tOiAnMzBweCcgfX0+XG4gICAgICAgICAgey8qIFJlY2VudCBSZWdpc3RyYXRpb25zIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjVweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCdcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17eyBtYXJnaW46ICcwIDAgMjBweCAwJywgZm9udFNpemU6ICcxOHB4JywgY29sb3I6ICcjMWI0ZDNlJywgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNmNGYyZWInLCBwYWRkaW5nQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgIFJlY2VudCBTdW1taXQgUmVnaXN0cmFudHNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICB7cmVjZW50UmVnaXN0cmF0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxwIHN0eWxlPXt7IGNvbG9yOiAnIzc3Nzc3NycsIHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpbjogJzMwcHggMCcgfX0+Tm8gcmVnaXN0cmF0aW9ucyBmb3VuZCB5ZXQuPC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsIHRleHRBbGlnbjogJ2xlZnQnIH19PlxuICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNmNGYyZWInIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxMHB4JywgY29sb3I6ICcjNTU1NTU1JywgZm9udFNpemU6ICcxM3B4JywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfX0+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDEwcHgnLCBjb2xvcjogJyM1NTU1NTUnLCBmb250U2l6ZTogJzEzcHgnLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5QYXJ0aWNpcGFudCBUeXBlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PlBhaWQgQW1vdW50PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PlN0YXR1czwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDEwcHgnLCBjb2xvcjogJyM1NTU1NTUnLCBmb250U2l6ZTogJzEzcHgnLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5SZWdpc3RlcmVkPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHtyZWNlbnRSZWdpc3RyYXRpb25zLm1hcCgocmVnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGJhZGdlQ29sb3IgPSAnI2ZmZWViYSc7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGJhZGdlVGV4dENvbCA9ICcjODU2NDA0JztcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnLnBheW1lbnRTdGF0dXMgPT09ICdQQUlEJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2VDb2xvciA9ICcjZDRlZGRhJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhZGdlVGV4dENvbCA9ICcjMTU1NzI0JztcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlZy5wYXltZW50U3RhdHVzID09PSAnRkFJTEVEJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2VDb2xvciA9ICcjZjhkN2RhJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhZGdlVGV4dENvbCA9ICcjNzIxYzI0JztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17cmVnLmlkfSBzdHlsZT17eyBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2Y2ZjVmMCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFdlaWdodDogJzUwMCcsIGNvbG9yOiAnIzIyMmQyOScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlZy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICcjODg4ODg4JywgZm9udFdlaWdodDogJ25vcm1hbCcsIG1hcmdpblRvcDogJzJweCcgfX0+e3JlZy5lbWFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDEwcHgnLCBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM1NTU1NTUnIH19PntyZWcucGFydGljaXBhbnRUeXBlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFNpemU6ICcxM3B4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxYjRkM2UnIH19PuKCuXtyZWcucGF5YWJsZUFtb3VudH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFkZ2VDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBiYWRnZVRleHRDb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNHB4IDEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzExcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWcucGF5bWVudFN0YXR1cyA9PT0gJ1BBSUQnID8gJ0NPTkZJUk1FRCcgOiByZWcucGF5bWVudFN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjODg4ODg4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmV3IERhdGUocmVnLmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1JTicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW51dGU6ICcyLWRpZ2l0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJlY2VudCBDb250YWN0IE1lc3NhZ2VzIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjVweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCdcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17eyBtYXJnaW46ICcwIDAgMjBweCAwJywgZm9udFNpemU6ICcxOHB4JywgY29sb3I6ICcjMWI0ZDNlJywgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNmNGYyZWInLCBwYWRkaW5nQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgIFJlY2VudCBDb250YWN0IE1lc3NhZ2VzXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAge3JlY2VudENvbnRhY3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPHAgc3R5bGU9e3sgY29sb3I6ICcjNzc3Nzc3JywgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luOiAnMjBweCAwJyB9fT5ObyBtZXNzYWdlcyByZWNlaXZlZCB5ZXQuPC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsIHRleHRBbGlnbjogJ2xlZnQnIH19PlxuICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNmNGYyZWInIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxMHB4JywgY29sb3I6ICcjNTU1NTU1JywgZm9udFNpemU6ICcxM3B4JywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfX0+U2VuZGVyPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PlBob25lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19Pk1lc3NhZ2U8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxMHB4JywgY29sb3I6ICcjNTU1NTU1JywgZm9udFNpemU6ICcxM3B4JywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfX0+UmVjZWl2ZWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAge3JlY2VudENvbnRhY3RzLm1hcCgoY29udGFjdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NvbnRhY3QuaWR9IHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZjZmNWYwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFdlaWdodDogJzUwMCcsIGNvbG9yOiAnIzIyMmQyOScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb250YWN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICcjODg4ODg4JywgZm9udFdlaWdodDogJ25vcm1hbCcsIG1hcmdpblRvcDogJzJweCcgfX0+e2NvbnRhY3QuZW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDEwcHgnLCBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyM1NTU1NTUnIH19Pntjb250YWN0LnBob25lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTBweCcsIGZvbnRTaXplOiAnMTNweCcsIGNvbG9yOiAnIzU1NTU1NScsIG1heFdpZHRoOiAnMjgwcHgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb250YWN0Lm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM4ODg4ODgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bmV3IERhdGUoY29udGFjdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tSU4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZTogJzItZGlnaXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJlY2VudCBBYnN0cmFjdCBTdWJtaXNzaW9ucyBDYXJkICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI1cHgnLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDMpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZjBlZGYwJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDIwcHggMCcsIGZvbnRTaXplOiAnMThweCcsIGNvbG9yOiAnIzFiNGQzZScsIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZjRmMmViJywgcGFkZGluZ0JvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICBSZWNlbnQgQWJzdHJhY3QgU3VibWlzc2lvbnNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICB7cmVjZW50QWJzdHJhY3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPHAgc3R5bGU9e3sgY29sb3I6ICcjNzc3Nzc3JywgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luOiAnMjBweCAwJyB9fT5ObyBhYnN0cmFjdHMgc3VibWl0dGVkIHlldC48L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgdGV4dEFsaWduOiAnbGVmdCcgfX0+XG4gICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2Y0ZjJlYicgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDEwcHgnLCBjb2xvcjogJyM1NTU1NTUnLCBmb250U2l6ZTogJzEzcHgnLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5BdXRob3I8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxMHB4JywgY29sb3I6ICcjNTU1NTU1JywgZm9udFNpemU6ICcxM3B4JywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfX0+VHJhY2sgLyBUeXBlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PlRpdGxlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PkRhdGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAge3JlY2VudEFic3RyYWN0cy5tYXAoKGFic3RyYWN0KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17YWJzdHJhY3QuaWR9IHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZjZmNWYwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFdlaWdodDogJzUwMCcsIGNvbG9yOiAnIzIyMmQyOScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHthYnN0cmFjdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzg4ODg4OCcsIGZvbnRXZWlnaHQ6ICdub3JtYWwnLCBtYXJnaW5Ub3A6ICcycHgnIH19PnthYnN0cmFjdC5pbnN0aXR1dGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTBweCcsIGZvbnRTaXplOiAnMTNweCcsIGNvbG9yOiAnIzU1NTU1NScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e2Fic3RyYWN0LmNhdGVnb3J5fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTJmMGQ5JywgY29sb3I6ICcjMzg1NzIzJywgcGFkZGluZzogJzJweCA2cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgbWFyZ2luVG9wOiAnNHB4JywgZm9udFdlaWdodDogJ2JvbGQnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthYnN0cmFjdC5wcmVzZW50YXRpb25UeXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDEwcHgnLCBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyMyMjJkMjknLCBmb250V2VpZ2h0OiAnNTAwJywgbWF4V2lkdGg6ICcyMjBweCcsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Fic3RyYWN0LnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjODg4ODg4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge25ldyBEYXRlKGFic3RyYWN0LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1JTicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmVjZW50IEV4aGliaXRvciAmIFN0YWxsIEJvb2tpbmdzIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjVweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDIwcHggMCcsIGZvbnRTaXplOiAnMThweCcsIGNvbG9yOiAnIzFiNGQzZScsIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZjRmMmViJywgcGFkZGluZ0JvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICBSZWNlbnQgRXhoaWJpdG9yICZhbXA7IFN0YWxsIEJvb2tpbmdzXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAge3JlY2VudEV4aGliaXRvcnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICA8cCBzdHlsZT17eyBjb2xvcjogJyM3Nzc3NzcnLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW46ICcyMHB4IDAnIH19Pk5vIGV4aGliaXRvciBib29raW5ncyBmb3VuZC48L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgdGV4dEFsaWduOiAnbGVmdCcgfX0+XG4gICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2Y0ZjJlYicgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDEwcHgnLCBjb2xvcjogJyM1NTU1NTUnLCBmb250U2l6ZTogJzEzcHgnLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9fT5Db21wYW55PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PkNvbnRhY3QgUGVyc29uPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PkNhdGVnb3J5PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTBweCcsIGNvbG9yOiAnIzU1NTU1NScsIGZvbnRTaXplOiAnMTNweCcsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH19PkxvY2F0aW9uPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHtyZWNlbnRFeGhpYml0b3JzLm1hcCgoZXhoKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17ZXhoLmlkfSBzdHlsZT17eyBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2Y2ZjVmMCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTBweCcsIGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyMxYjRkM2UnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXhoLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzg4ODg4OCcsIGZvbnRXZWlnaHQ6ICdub3JtYWwnLCBtYXJnaW5Ub3A6ICcycHgnIH19PntleGguZW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDEwcHgnLCBmb250U2l6ZTogJzEzcHgnLCBjb2xvcjogJyMyMjJkMjknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXhoLmNvbnRhY3ROYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzY2NjY2NicgfX0+e2V4aC5waG9uZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTBweCcsIGZvbnRTaXplOiAnMTNweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJyNmZmYzY2QnLCBjb2xvcjogJyM4NTY0MDQnLCBwYWRkaW5nOiAnM3B4IDhweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2V4aC5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMHB4JywgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNTU1NTU1JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2V4aC5jaXR5fSwge2V4aC5zdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0IGNvbHVtbjogRGlzdHJpYnV0aW9uICYgSW5mbyAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAnMScsIG1pbldpZHRoOiAnMjgwcHgnLCBwYWRkaW5nOiAnMCAxNXB4JywgbWFyZ2luQm90dG9tOiAnMzBweCcgfX0+XG4gICAgICAgICAgey8qIFBhcnRpY2lwYW50IFR5cGUgQ2hhcnQvTGlzdCBDYXJkICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI1cHgnLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDMpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZjBlZGYwJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDIwcHggMCcsIGZvbnRTaXplOiAnMThweCcsIGNvbG9yOiAnIzFiNGQzZScsIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZjRmMmViJywgcGFkZGluZ0JvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICBQYXJ0aWNpcGFudCBEZW1vZ3JhcGhpY3NcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICB7cGFydGljaXBhbnRUeXBlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxwIHN0eWxlPXt7IGNvbG9yOiAnIzc3Nzc3NycsIGZvbnRTaXplOiAnMTNweCcgfX0+Tm8gZGVtb2dyYXBoaWMgZGF0YSB5ZXQuPC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgcGFydGljaXBhbnRUeXBlcy5tYXAoKHB0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IHRvdGFsUmVnaXN0cmF0aW9ucyA+IDAgPyBNYXRoLnJvdW5kKChwdC5fY291bnQuaWQgLyB0b3RhbFJlZ2lzdHJhdGlvbnMpICogMTAwKSA6IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwdC5wYXJ0aWNpcGFudFR5cGV9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzE1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6ICcxM3B4JywgbWFyZ2luQm90dG9tOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiAnNTAwJywgY29sb3I6ICcjMzMzMzMzJywgbWF4V2lkdGg6ICc4MCUnIH19PntwdC5wYXJ0aWNpcGFudFR5cGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMWI0ZDNlJyB9fT57cHQuX2NvdW50LmlkfSAoe3BlcmNlbnRhZ2V9JSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogJzhweCcsIGJhY2tncm91bmRDb2xvcjogJyNmMGVkZjAnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogYCR7cGVyY2VudGFnZX0lYCwgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmRDb2xvcjogJyMxYjRkM2UnLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjY29tbW9kYXRpb24gQ2hvaWNlcyBDYXJkICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzI1cHgnLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTVweCByZ2JhKDAsMCwwLDAuMDMpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZjBlZGYwJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDIwcHggMCcsIGZvbnRTaXplOiAnMThweCcsIGNvbG9yOiAnIzFiNGQzZScsIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZjRmMmViJywgcGFkZGluZ0JvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICBBY2NvbW1vZGF0aW9uIENob2ljZXNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICB7YWNjb21tb2RhdGlvbnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICA8cCBzdHlsZT17eyBjb2xvcjogJyM3Nzc3NzcnLCBmb250U2l6ZTogJzEzcHgnIH19Pk5vIGFjY29tbW9kYXRpb24gcmVxdWVzdHMgeWV0LjwvcD5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIGFjY29tbW9kYXRpb25zLm1hcCgoYWNjKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IHRvdGFsUmVnaXN0cmF0aW9ucyA+IDAgPyBNYXRoLnJvdW5kKChhY2MuX2NvdW50LmlkIC8gdG90YWxSZWdpc3RyYXRpb25zKSAqIDEwMCkgOiAwO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YWNjLmFjY29tbW9kYXRpb25UeXBlfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAnMTNweCcsIG1hcmdpbkJvdHRvbTogJzVweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogJzUwMCcsIGNvbG9yOiAnIzMzMzMzMycgfX0+e2FjYy5hY2NvbW1vZGF0aW9uVHlwZSA9PT0gJ05vbmUnID8gJ1NlbGYtQWNjb21tb2RhdGlvbicgOiBhY2MuYWNjb21tb2RhdGlvblR5cGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjYzVhMDU5JyB9fT57YWNjLl9jb3VudC5pZH0gKHtwZXJjZW50YWdlfSUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6ICc4cHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZjBlZGYwJywgYm9yZGVyUmFkaXVzOiAnNHB4Jywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IGAke3BlcmNlbnRhZ2V9JWAsIGhlaWdodDogJzEwMCUnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjYzVhMDU5JywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBFdmVudCBRdWljayBJbmZvIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMjVweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNXB4IHJnYmEoMCwwLDAsMC4wMyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8aDQgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDEycHggMCcsIGZvbnRTaXplOiAnMTVweCcsIGNvbG9yOiAnIzFiNGQzZScgfX0+8J+TjCBTdW1taXQgTG9naXN0aWNzPC9oND5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgbGluZUhlaWdodDogJzEuNicsIGNvbG9yOiAnIzU1NTU1NScgfX0+XG4gICAgICAgICAgICAgIDxwIHN0eWxlPXt7IG1hcmdpbjogJzRweCAwJyB9fT48c3Ryb25nPkRhdGVzOjwvc3Ryb25nPiAxIOKAkyAyIE9jdG9iZXIgMjAyNjwvcD5cbiAgICAgICAgICAgICAgPHAgc3R5bGU9e3sgbWFyZ2luOiAnNHB4IDAnIH19PjxzdHJvbmc+TG9jYXRpb246PC9zdHJvbmc+IFNocmkgS3Jpc2huYSBKYW5tYXNodGFtaSBBc2hyYW0sIFZyaW5kYXZhbiwgVVA8L3A+XG4gICAgICAgICAgICAgIDxwIHN0eWxlPXt7IG1hcmdpbjogJzRweCAwJyB9fT48c3Ryb25nPkNvbnRhY3QgRW1haWxzOjwvc3Ryb25nPiBheXVybWlsYW5vZmZpY2lhbEBnbWFpbC5jb208L3A+XG4gICAgICAgICAgICAgIDxwIHN0eWxlPXt7IG1hcmdpbjogJzRweCAwJyB9fT48c3Ryb25nPkhlbHBsaW5lczo8L3N0cm9uZz4gKzkxIDYyODA2MzI2NjksICs5MSA5Njk3OTcwMDA0PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBUZXh0LCBIMyB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEFwcHJvdmVBY3Rpb24gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBzZW5kTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIGNvbnN0IGhhbmRsZUFwcHJvdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVjb3JkQWN0aW9uKHtcbiAgICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXG4gICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQsXG4gICAgICAgIGFjdGlvbk5hbWU6ICdhcHByb3ZlJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt9XG4gICAgICB9KTtcblxuICAgICAgc2VuZE5vdGljZSh7XG4gICAgICAgIG1lc3NhZ2U6IGBSZWdpc3RyYXRpb24gZm9yICR7cmVjb3JkLnBhcmFtcy5uYW1lfSBoYXMgYmVlbiBhcHByb3ZlZCBzdWNjZXNzZnVsbHkhYCxcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgfSk7XG4gICAgICBuYXZpZ2F0ZShgL2FkbWluL3Jlc291cmNlcy8ke3Jlc291cmNlLmlkfWApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgc2VuZE5vdGljZSh7XG4gICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8ICdFcnJvciBvY2N1cnJlZCBkdXJpbmcgYXBwcm92YWwuJyxcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xuICAgIG5hdmlnYXRlKGAvYWRtaW4vcmVzb3VyY2VzLyR7cmVzb3VyY2UuaWR9YCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHZhcmlhbnQ9XCJncmV5XCIgc3R5bGU9e3sgcGFkZGluZzogJzQwcHgnLCBtaW5IZWlnaHQ6ICcxMDB2aCcsIGZvbnRGYW1pbHk6IFwiJ091dGZpdCcsICdJbnRlcicsIHNhbnMtc2VyaWZcIiB9fT5cbiAgICAgIDxCb3ggc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDogJyNmZmZmZmYnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICcxNnB4JyxcbiAgICAgICAgcGFkZGluZzogJzMwcHgnLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDhweCAzMHB4IHJnYmEoMCwwLDAsMC4wNSknLFxuICAgICAgICBtYXhXaWR0aDogJzYwMHB4JyxcbiAgICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmMGVkZjAnXG4gICAgICB9fT5cbiAgICAgICAgPEgzIHN0eWxlPXt7IGNvbG9yOiAnIzFiNGQzZScsIG1hcmdpbkJvdHRvbTogJzIwcHgnLCBib3JkZXJCb3R0b206ICcycHggc29saWQgI2Y0ZjJlYicsIHBhZGRpbmdCb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICBDb25maXJtIFJlZ2lzdHJhdGlvbiBBcHByb3ZhbFxuICAgICAgICA8L0gzPlxuICAgICAgICBcbiAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxNXB4JywgY29sb3I6ICcjNTU1NTU1JywgbWFyZ2luQm90dG9tOiAnMjBweCcsIGxpbmVIZWlnaHQ6ICcxLjYnIH19PlxuICAgICAgICAgIFlvdSBhcmUgYWJvdXQgdG8gYXBwcm92ZSB0aGUgZGVsZWdhdGUgcmVnaXN0cmF0aW9uIGZvciA8c3Ryb25nPntyZWNvcmQucGFyYW1zLm5hbWV9PC9zdHJvbmc+LlxuICAgICAgICAgIFRoaXMgd2lsbCB1cGRhdGUgdGhlIHRpY2tldCBzdGF0dXMgdG8gPHN0cm9uZz5DT05GSVJNRUQgKFBBSUQpPC9zdHJvbmc+IGFuZCB0cmlnZ2VyIHRoZSBhdXRvbWF0ZWQgZW1haWwgY29udGFpbmluZyB0aGVpciBlbnRyeSB0aWNrZXQgYW5kIGNyZWRlbnRpYWxzLlxuICAgICAgICA8L1RleHQ+XG5cbiAgICAgICAgPEJveCBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmNmYmY3JyxcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2YwZWRmMCcsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnXG4gICAgICAgIH19PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+PHN0cm9uZz5QYXJ0aWNpcGFudCBOYW1lOjwvc3Ryb25nPiB7cmVjb3JkLnBhcmFtcy5uYW1lfTwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PjxzdHJvbmc+RW1haWw6PC9zdHJvbmc+IHtyZWNvcmQucGFyYW1zLmVtYWlsfTwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PjxzdHJvbmc+UGF5YWJsZSBBbW91bnQ6PC9zdHJvbmc+IOKCuXtyZWNvcmQucGFyYW1zLnBheWFibGVBbW91bnR9PC9UZXh0PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+PHN0cm9uZz5VUEkgVVRSIFJlZmVyZW5jZTo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRXZWlnaHQ6ICdib2xkJywgZm9udFNpemU6ICcxNXB4JywgY29sb3I6ICcjZmQ3ZTE0JyB9fT57cmVjb3JkLnBhcmFtcy5wYXltZW50UmVmZXJlbmNlIHx8ICdOL0EnfTwvc3Bhbj48L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3ggc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxNXB4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcgfX0+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2FuY2VsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y0ZjJlYicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzMzMycsXG4gICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZDRkMGM1JyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBcHByb3ZlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxMnB4IHJnYmEoNDAsMTY3LDY5LDAuMiknXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsb2FkaW5nID8gJ0FwcHJvdmluZy4uLicgOiAnQ29uZmlybSAmIEFwcHJvdmUnfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwcm92ZUFjdGlvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFZlcmlmaWVkTGlzdCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XG4gIGNvbnN0IHZlcmlmaWVkID0gcmVjb3JkLnBhcmFtcy52ZXJpZmllZCA9PT0gdHJ1ZSB8fCByZWNvcmQucGFyYW1zLnZlcmlmaWVkID09PSAndHJ1ZSc7XG5cbiAgaWYgKHZlcmlmaWVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmQ6ICcjZDRlZGRhJyxcbiAgICAgICAgY29sb3I6ICcjMTU1NzI0JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNjM2U2Y2InLFxuICAgICAgICBwYWRkaW5nOiAnNHB4IDEwcHgnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgICAgZm9udFNpemU6ICcxMXB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCdcbiAgICAgIH19PlxuICAgICAgICDinJMgQXBwcm92ZWRcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8c3BhbiBzdHlsZT17e1xuICAgICAgYmFja2dyb3VuZDogJyNmZmYzY2QnLFxuICAgICAgY29sb3I6ICcjODU2NDA0JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZmZlZWJhJyxcbiAgICAgIHBhZGRpbmc6ICc0cHggMTBweCcsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnXG4gICAgfX0+XG4gICAgICDimqAgQXdhaXRpbmcgQXBwcm92YWxcbiAgICA8L3NwYW4+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWZXJpZmllZExpc3Q7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2NvbmZpZy9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IEFwcHJvdmVBY3Rpb24gZnJvbSAnLi4vc3JjL2NvbmZpZy9hcHByb3ZlQWN0aW9uJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BcHByb3ZlQWN0aW9uID0gQXBwcm92ZUFjdGlvblxuaW1wb3J0IFZlcmlmaWVkTGlzdCBmcm9tICcuLi9zcmMvY29uZmlnL3ZlcmlmaWVkTGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVmVyaWZpZWRMaXN0ID0gVmVyaWZpZWRMaXN0Il0sIm5hbWVzIjpbIkRvbnV0Q2hhcnQiLCJwYWlkIiwicGVuZGluZyIsImZhaWxlZCIsInRvdGFsIiwidG90YWxWYWwiLCJwY3RQYWlkIiwicGN0UGVuZGluZyIsInBjdEZhaWxlZCIsImNpcmMiLCJzdHJva2VQYWlkIiwic3Ryb2tlUGVuZGluZyIsInN0cm9rZUZhaWxlZCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwid2lkdGgiLCJqdXN0aWZ5Q29udGVudCIsInBvc2l0aW9uIiwiaGVpZ2h0IiwibWFyZ2luIiwidmlld0JveCIsInRyYW5zZm9ybSIsImN4IiwiY3kiLCJyIiwiZmlsbCIsInN0cm9rZSIsInN0cm9rZVdpZHRoIiwic3Ryb2tlRGFzaGFycmF5Iiwic3Ryb2tlRGFzaG9mZnNldCIsInN0cm9rZUxpbmVjYXAiLCJ0cmFuc2l0aW9uIiwidG9wIiwibGVmdCIsInBvaW50ZXJFdmVudHMiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsImxpbmVIZWlnaHQiLCJ0ZXh0VHJhbnNmb3JtIiwibWFyZ2luVG9wIiwibGV0dGVyU3BhY2luZyIsImdhcCIsImZsZXhXcmFwIiwiYm9yZGVyUmFkaXVzIiwiYmFja2dyb3VuZENvbG9yIiwiQXJlYUNoYXJ0IiwidHJlbmREYXRhIiwibGVuZ3RoIiwidGV4dEFsaWduIiwibWF4VmFsIiwiTWF0aCIsIm1heCIsIm1hcCIsImQiLCJjb3VudCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJjaGFydFdpZHRoIiwiY2hhcnRIZWlnaHQiLCJwb2ludHMiLCJpIiwieCIsInkiLCJsYWJlbCIsImRhdGUiLCJ2YWx1ZSIsImxpbmVQYXRoIiwicCIsImpvaW4iLCJhcmVhUGF0aCIsIm92ZXJmbG93WCIsIm92ZXJmbG93IiwibWluV2lkdGgiLCJpZCIsIngxIiwieTEiLCJ4MiIsInkyIiwib2Zmc2V0Iiwic3RvcENvbG9yIiwic3RvcE9wYWNpdHkiLCJyYXRpbyIsImxhYmVsVmFsIiwicm91bmQiLCJrZXkiLCJvcGFjaXR5IiwidGV4dEFuY2hvciIsInN0cm9rZUxpbmVqb2luIiwiaWR4Iiwic3Ryb2tlT3BhY2l0eSIsIkRhc2hib2FyZCIsImRhdGEiLCJzZXREYXRhIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJhcGkiLCJBcGlDbGllbnQiLCJ1c2VFZmZlY3QiLCJnZXREYXNoYm9hcmQiLCJ0aGVuIiwicmVzcG9uc2UiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJCb3giLCJwYWRkaW5nIiwiY2xhc3NOYW1lIiwiYm9yZGVyIiwiYm9yZGVyVG9wIiwiYW5pbWF0aW9uIiwibWFyZ2luQm90dG9tIiwidG90YWxSZWdpc3RyYXRpb25zIiwicGFpZFJlZ2lzdHJhdGlvbnMiLCJwZW5kaW5nUmVnaXN0cmF0aW9ucyIsImZhaWxlZFJlZ2lzdHJhdGlvbnMiLCJ0b3RhbFJldmVudWUiLCJwZW5kaW5nUmV2ZW51ZSIsInBhcnRpY2lwYW50VHlwZXMiLCJhY2NvbW1vZGF0aW9ucyIsInJlY2VudFJlZ2lzdHJhdGlvbnMiLCJ0b3RhbENvbnRhY3RzIiwidG90YWxBYnN0cmFjdHMiLCJ0b3RhbEV4aGliaXRvcnMiLCJyZWNlbnRDb250YWN0cyIsInJlY2VudEFic3RyYWN0cyIsInJlY2VudEV4aGliaXRvcnMiLCJkYWlseVRyZW5kIiwibWluSGVpZ2h0IiwiZm9udEZhbWlseSIsImJhY2tncm91bmQiLCJib3hTaGFkb3ciLCJyaWdodCIsImJvdHRvbSIsIm1heFdpZHRoIiwiZmxleCIsImJvcmRlckxlZnQiLCJ0b0xvY2FsZVN0cmluZyIsImFsaWduU2VsZiIsInJ4IiwicnkiLCJib3JkZXJCb3R0b20iLCJib3JkZXJDb2xsYXBzZSIsInJlZyIsImJhZGdlQ29sb3IiLCJiYWRnZVRleHRDb2wiLCJwYXltZW50U3RhdHVzIiwibmFtZSIsImVtYWlsIiwicGFydGljaXBhbnRUeXBlIiwicGF5YWJsZUFtb3VudCIsIkRhdGUiLCJjcmVhdGVkQXQiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkYXkiLCJtb250aCIsImhvdXIiLCJtaW51dGUiLCJjb250YWN0IiwicGhvbmUiLCJ0ZXh0T3ZlcmZsb3ciLCJ3aGl0ZVNwYWNlIiwibWVzc2FnZSIsImFic3RyYWN0IiwiaW5zdGl0dXRpb24iLCJjYXRlZ29yeSIsInByZXNlbnRhdGlvblR5cGUiLCJ0aXRsZSIsImV4aCIsImNvbXBhbnlOYW1lIiwiY29udGFjdE5hbWUiLCJjaXR5Iiwic3RhdGUiLCJwdCIsInBlcmNlbnRhZ2UiLCJfY291bnQiLCJhY2MiLCJhY2NvbW1vZGF0aW9uVHlwZSIsIkFwcHJvdmVBY3Rpb24iLCJwcm9wcyIsInJlY29yZCIsInJlc291cmNlIiwibmF2aWdhdGUiLCJ1c2VOYXZpZ2F0ZSIsInNlbmROb3RpY2UiLCJ1c2VOb3RpY2UiLCJoYW5kbGVBcHByb3ZlIiwicmVjb3JkQWN0aW9uIiwicmVzb3VyY2VJZCIsInJlY29yZElkIiwiYWN0aW9uTmFtZSIsIm1ldGhvZCIsInBhcmFtcyIsInR5cGUiLCJoYW5kbGVDYW5jZWwiLCJ2YXJpYW50IiwiSDMiLCJUZXh0IiwicGF5bWVudFJlZmVyZW5jZSIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsImN1cnNvciIsIlZlcmlmaWVkTGlzdCIsInZlcmlmaWVkIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUE7RUFDQSxNQUFNQSxVQUFVLEdBQUdBLENB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
