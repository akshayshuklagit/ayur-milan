import React from 'react';

const VerifiedList = (props) => {
  const { record } = props;
  const verified = record.params.verified === true || record.params.verified === 'true';

  if (verified) {
    return (
      <span style={{
        background: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}>
        ✓ Approved
      </span>
    );
  }

  return (
    <span style={{
      background: '#fff3cd',
      color: '#856404',
      border: '1px solid #ffeeba',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 'bold',
      display: 'inline-block',
      whiteSpace: 'nowrap'
    }}>
      ⚠ Awaiting Approval
    </span>
  );
};

export default VerifiedList;
