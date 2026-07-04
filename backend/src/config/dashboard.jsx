import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { Box } from '@adminjs/design-system';

// 1. Sleek SVG Donut Chart representing Registration Statuses
const DonutChart = ({ paid, pending, failed, total }) => {
  const totalVal = paid + pending + failed || 1;
  const pctPaid = (paid / totalVal) * 100;
  const pctPending = (pending / totalVal) * 100;
  const pctFailed = (failed / totalVal) * 100;

  // Circumference of circle with r=70: 2 * Math.PI * 70 = 439.82
  const circ = 439.82;
  const strokePaid = (pctPaid / 100) * circ;
  const strokePending = (pctPending / 100) * circ;
  const strokeFailed = (pctFailed / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '10px 0' }}>
        <svg width="180" height="180" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle cx="100" cy="100" r="70" fill="transparent" stroke="#f4f2eb" strokeWidth="18" />
          
          {/* Paid (Green) */}
          {paid > 0 && (
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#28a745" strokeWidth="18"
              strokeDasharray={circ}
              strokeDashoffset={circ - strokePaid}
              strokeLinecap="round"
              style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          )}
          
          {/* Pending (Orange) */}
          {pending > 0 && (
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#fd7e14" strokeWidth="18"
              strokeDasharray={circ}
              strokeDashoffset={circ - strokePending}
              strokeLinecap="round"
              transform={`rotate(${(pctPaid / 100) * 360} 100 100)`}
              style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          )}

          {/* Failed (Red) */}
          {failed > 0 && (
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#dc3545" strokeWidth="18"
              strokeDasharray={circ}
              strokeDashoffset={circ - strokeFailed}
              strokeLinecap="round"
              transform={`rotate(${((pctPaid + pctPending) / 100) * 360} 100 100)`}
              style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          )}
        </svg>
        {/* Central label overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: '#222d29', lineHeight: 1 }}>{total}</span>
          <span style={{ fontSize: '10px', color: '#777777', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '0.5px' }}>Total</span>
        </div>
      </div>

      {/* Legend Block */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', width: '100%', flexWrap: 'wrap', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28a745', display: 'inline-block' }}></span>
          <span style={{ color: '#555555', fontWeight: '500' }}>Paid ({paid})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fd7e14', display: 'inline-block' }}></span>
          <span style={{ color: '#555555', fontWeight: '500' }}>Pending ({pending})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#dc3545', display: 'inline-block' }}></span>
          <span style={{ color: '#555555', fontWeight: '500' }}>Failed ({failed})</span>
        </div>
      </div>
    </div>
  );
};

// 2. High-Fidelity SVG Area/Line Chart representing 7-day registration trends
const AreaChart = ({ trendData = [] }) => {
  if (trendData.length === 0) {
    return <p style={{ color: '#777777', textAlign: 'center', margin: '40px 0' }}>No trend data available.</p>;
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
    const x = paddingLeft + (i / (trendData.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.count / maxVal) * chartHeight;
    return { x, y, label: d.date, value: d.count };
  });

  // Create path strings
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible', minWidth: '450px' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b4d3e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1b4d3e" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Grid lines (horizontal) */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingTop + ratio * chartHeight;
          const labelVal = Math.round(maxVal * (1 - ratio));
          return (
            <g key={ratio} opacity="0.6">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e4e2eb" strokeWidth="1" strokeDasharray="3 3" />
              <text x={paddingLeft - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#888888" fontWeight="600">{labelVal}</text>
            </g>
          );
        })}

        {/* Colored Area path */}
        <path d={areaPath} fill="url(#areaGrad)" />

        {/* Smooth line path */}
        <path d={linePath} fill="none" stroke="#1b4d3e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots, grid vertical lines, values, and axis ticks */}
        {points.map((p, idx) => (
          <g key={idx}>
            <line x1={p.x} y1={paddingTop + chartHeight} x2={p.x} y2={paddingTop} stroke="#e4e2eb" strokeWidth="1" strokeOpacity="0.25" />
            
            {/* Draw circle point indicator */}
            <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="#1b4d3e" strokeWidth="2.5" />
            
            {/* Numeric count above dot */}
            <text x={p.x} y={p.y - 9} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1b4d3e">
              {p.value}
            </text>
            
            {/* Bottom X-axis Date label */}
            <text x={p.x} y={paddingTop + chartHeight + 16} textAnchor="middle" fontSize="10" fill="#777777" fontWeight="500">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// 3. Main Administrative Dashboard
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = new ApiClient();

  useEffect(() => {
    api.getDashboard()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box padding="xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <div className="spinner" style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1b4d3e',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          marginBottom: '15px'
        }}></div>
        <div style={{ color: '#1b4d3e', fontWeight: 'bold', fontSize: '18px' }}>Loading AyurMilan Dashboard Statistics...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="xl" style={{ color: 'red', textAlign: 'center' }}>
        <h3>Error: {error}</h3>
      </Box>
    );
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

  return (
    <Box padding="xl" style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      {/* Hero Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1b4d3e 0%, #0d2820 100%)',
        borderRadius: '16px',
        padding: '30px 40px',
        color: '#ffffff',
        marginBottom: '30px',
        boxShadow: '0 8px 30px rgba(27, 77, 62, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Leaf Graphic Background Elements */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-40px',
          opacity: 0.1,
          pointerEvents: 'none'
        }}>
          <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.79,16.83C9.88,17.76 12,18 14,18C21,18 20,8 20,8H17M14,16C12.18,16 10.39,15.77 8.73,15.28L15.34,8.67C15.73,8.28 15.73,7.65 15.34,7.26C14.95,6.87 14.32,6.87 13.93,7.26L7.33,13.87C6.84,12.21 6.61,10.42 6.61,8.6C6.61,6.6 6.85,4.48 7.78,2.39L5.89,1.7L4.97,3.79C2.79,8.74 3.73,14.6 7.74,18.6C9.1,19.96 10.97,20.72 13,20.89L20.89,13L21,11C21,11 19,13 17,14C15.8,14.6 14.6,15.2 14,16Z" />
          </svg>
        </div>

        <div style={{ maxWidth: '75%' }}>
          <span style={{
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
          }}>
            Ayurveda Summit 2026
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', fontFamily: 'serif', letterSpacing: '0.5px' }}>
            AyurMilan Administrative Portal
          </h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#cef0e3', lineHeight: '1.5' }}>
            Welcome to the command center. Monitor user registrations, confirm payments, analyze statistics, and manage system coupons for the grand summit taking place on <strong>1 – 2 October 2026</strong> in <strong>Vrindavan</strong>.
          </p>
        </div>
      </div>

      {/* Main Registrations Stats Cards Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px 20px -10px'
      }}>
        {/* Total Registrations */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #1b4d3e'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Registrants
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#222d29' }}>{totalRegistrations}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>Forms submitted</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#cef0e3', color: '#1b4d3e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Confirmed Tickets */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #28a745'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Confirmed (Paid)
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{paidRegistrations}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>
                {totalRegistrations > 0 ? Math.round((paidRegistrations / totalRegistrations) * 100) : 0}% Conversion rate
              </div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e2f7e6', color: '#28a745', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Pending Approval */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #fd7e14'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pending Review
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fd7e14' }}>{pendingRegistrations}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>Awaiting verification</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff0e2', color: '#fd7e14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #c5a059'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Revenue Collected
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1b4d3e' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>
                ₹{pendingRevenue.toLocaleString('en-IN')} pending verification
              </div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fcf4e4', color: '#c5a059', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>₹</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Analytics Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px 10px -10px' }}>
        {/* Trend Area Chart Card */}
        <div style={{ flex: '1.6', minWidth: '320px', padding: '0 10px', marginBottom: '20px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            height: '100%'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '0.5px' }}>
              📈 Registration Activity Trend (Last 7 Days)
            </h3>
            <AreaChart trendData={dailyTrend} />
          </div>
        </div>

        {/* Ticket Status Donut Chart Card */}
        <div style={{ flex: '1', minWidth: '280px', padding: '0 10px', marginBottom: '20px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '0.5px', alignSelf: 'flex-start' }}>
              📊 Payment Status Distribution
            </h3>
            <DonutChart 
              paid={paidRegistrations} 
              pending={pendingRegistrations} 
              failed={failedRegistrations} 
              total={totalRegistrations} 
            />
          </div>
        </div>
      </div>

      {/* Submissions Stats Grid */}
      <h3 style={{ margin: '15px 0 15px 0', fontSize: '18px', color: '#1b4d3e', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '0.5px' }}>Inquiries &amp; Submission Metrics</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px 30px -10px'
      }}>
        {/* Contact submissions */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #007bff'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Contact Messages
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#222d29' }}>{totalContacts}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>Helpdesk messages</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6f2ff', color: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Abstract submissions */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #6f42c1'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Scientific Papers
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6f42c1' }}>{totalAbstracts}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>Abstracts submitted</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1e6ff', color: '#6f42c1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Exhibitor submissions */}
        <div style={{ flex: '1', minWidth: '240px', margin: '10px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0edf0',
            borderLeft: '5px solid #e83e8c'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777777', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Exhibitors &amp; Stalls
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e83e8c' }}>{totalExhibitors}</div>
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>Expo bookings</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe6f2', color: '#e83e8c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Information Tables Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px' }}>
        {/* Left column: Analytics */}
        <div style={{ flex: '2', minWidth: '320px', padding: '0 15px', marginBottom: '30px' }}>
          {/* Recent Registrations Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
              Recent Summit Registrants
            </h3>
            {recentRegistrations.length === 0 ? (
              <p style={{ color: '#777777', textAlign: 'center', margin: '30px 0' }}>No registrations found yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f4f2eb' }}>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Participant Type</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Paid Amount</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRegistrations.map((reg) => {
                      let badgeColor = '#ffeeba';
                      let badgeTextCol = '#856404';
                      if (reg.paymentStatus === 'PAID') {
                        badgeColor = '#d4edda';
                        badgeTextCol = '#155724';
                      } else if (reg.paymentStatus === 'FAILED') {
                        badgeColor = '#f8d7da';
                        badgeTextCol = '#721c24';
                      }

                      return (
                        <tr key={reg.id} style={{ borderBottom: '1px solid #f6f5f0' }}>
                          <td style={{ padding: '14px 10px', fontWeight: '500', color: '#222d29' }}>
                            {reg.name}
                            <div style={{ fontSize: '11px', color: '#888888', fontWeight: 'normal', marginTop: '2px' }}>{reg.email}</div>
                          </td>
                          <td style={{ padding: '14px 10px', fontSize: '13px', color: '#555555' }}>{reg.participantType}</td>
                          <td style={{ padding: '14px 10px', fontSize: '13px', fontWeight: 'bold', color: '#1b4d3e' }}>₹{reg.payableAmount}</td>
                          <td style={{ padding: '14px 10px' }}>
                            <span style={{
                              backgroundColor: badgeColor,
                              color: badgeTextCol,
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              display: 'inline-block'
                            }}>
                              {reg.paymentStatus === 'PAID' ? 'CONFIRMED' : reg.paymentStatus}
                            </span>
                          </td>
                          <td style={{ padding: '14px 10px', fontSize: '12px', color: '#888888' }}>
                            {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Contact Messages Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
              Recent Contact Messages
            </h3>
            {recentContacts.length === 0 ? (
              <p style={{ color: '#777777', textAlign: 'center', margin: '20px 0' }}>No messages received yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f4f2eb' }}>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Sender</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Phone</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Message</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContacts.map((contact) => (
                      <tr key={contact.id} style={{ borderBottom: '1px solid #f6f5f0' }}>
                        <td style={{ padding: '14px 10px', fontWeight: '500', color: '#222d29' }}>
                          {contact.name}
                          <div style={{ fontSize: '11px', color: '#888888', fontWeight: 'normal', marginTop: '2px' }}>{contact.email}</div>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13px', color: '#555555' }}>{contact.phone}</td>
                        <td style={{ padding: '14px 10px', fontSize: '13px', color: '#555555', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {contact.message}
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '12px', color: '#888888' }}>
                          {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Abstract Submissions Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
              Recent Abstract Submissions
            </h3>
            {recentAbstracts.length === 0 ? (
              <p style={{ color: '#777777', textAlign: 'center', margin: '20px 0' }}>No abstracts submitted yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f4f2eb' }}>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Author</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Track / Type</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Title</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAbstracts.map((abstract) => (
                      <tr key={abstract.id} style={{ borderBottom: '1px solid #f6f5f0' }}>
                        <td style={{ padding: '14px 10px', fontWeight: '500', color: '#222d29' }}>
                          {abstract.name}
                          <div style={{ fontSize: '11px', color: '#888888', fontWeight: 'normal', marginTop: '2px' }}>{abstract.institution}</div>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13px', color: '#555555' }}>
                          <div>{abstract.category}</div>
                          <span style={{ fontSize: '11px', backgroundColor: '#e2f0d9', color: '#385723', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px', fontWeight: 'bold' }}>
                            {abstract.presentationType}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13px', color: '#222d29', fontWeight: '500', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {abstract.title}
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '12px', color: '#888888' }}>
                          {new Date(abstract.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Exhibitor & Stall Bookings Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
              Recent Exhibitor &amp; Stall Bookings
            </h3>
            {recentExhibitors.length === 0 ? (
              <p style={{ color: '#777777', textAlign: 'center', margin: '20px 0' }}>No exhibitor bookings found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f4f2eb' }}>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Company</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Contact Person</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Category</th>
                      <th style={{ padding: '12px 10px', color: '#555555', fontSize: '13px', textTransform: 'uppercase' }}>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentExhibitors.map((exh) => (
                      <tr key={exh.id} style={{ borderBottom: '1px solid #f6f5f0' }}>
                        <td style={{ padding: '14px 10px', fontWeight: '600', color: '#1b4d3e' }}>
                          {exh.companyName}
                          <div style={{ fontSize: '11px', color: '#888888', fontWeight: 'normal', marginTop: '2px' }}>{exh.email}</div>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13px', color: '#222d29' }}>
                          {exh.contactName}
                          <div style={{ fontSize: '11px', color: '#666666' }}>{exh.phone}</div>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '13px' }}>
                          <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' }}>
                            {exh.category}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '12px', color: '#555555' }}>
                          {exh.city}, {exh.state}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Distribution & Info */}
        <div style={{ flex: '1', minWidth: '280px', padding: '0 15px', marginBottom: '30px' }}>
          {/* Participant Type Chart/List Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
              Participant Demographics
            </h3>
            {participantTypes.length === 0 ? (
              <p style={{ color: '#777777', fontSize: '13px' }}>No demographic data yet.</p>
            ) : (
              participantTypes.map((pt) => {
                const percentage = totalRegistrations > 0 ? Math.round((pt._count.id / totalRegistrations) * 100) : 0;
                return (
                  <div key={pt.participantType} style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                      <span style={{ fontWeight: '500', color: '#333333', maxWidth: '80%' }}>{pt.participantType}</span>
                      <span style={{ fontWeight: 'bold', color: '#1b4d3e' }}>{pt._count.id} ({percentage}%)</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#f0edf0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#1b4d3e', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Accommodation Choices Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1b4d3e', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
              Accommodation Choices
            </h3>
            {accommodations.length === 0 ? (
              <p style={{ color: '#777777', fontSize: '13px' }}>No accommodation requests yet.</p>
            ) : (
              accommodations.map((acc) => {
                const percentage = totalRegistrations > 0 ? Math.round((acc._count.id / totalRegistrations) * 100) : 0;
                return (
                  <div key={acc.accommodationType} style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                      <span style={{ fontWeight: '500', color: '#333333' }}>{acc.accommodationType === 'None' ? 'Self-Accommodation' : acc.accommodationType}</span>
                      <span style={{ fontWeight: 'bold', color: '#c5a059' }}>{acc._count.id} ({percentage}%)</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#f0edf0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#c5a059', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Event Quick Info Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #f0edf0'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1b4d3e' }}>📌 Summit Logistics</h4>
            <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#555555' }}>
              <p style={{ margin: '4px 0' }}><strong>Dates:</strong> 1 – 2 October 2026</p>
              <p style={{ margin: '4px 0' }}><strong>Location:</strong> Shri Krishna Janmashtami Ashram, Vrindavan, UP</p>
              <p style={{ margin: '4px 0' }}><strong>Contact Emails:</strong> ayurmilanofficial@gmail.com</p>
              <p style={{ margin: '4px 0' }}><strong>Helplines:</strong> +91 6280632669, +91 9697970004</p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
