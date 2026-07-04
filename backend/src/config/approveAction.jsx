import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useNotice } from 'adminjs';
import { Box, Button, Text, H3 } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

const ApproveAction = (props) => {
  const { record, resource } = props;
  const navigate = useNavigate();
  const sendNotice = useNotice();
  const [loading, setLoading] = useState(false);
  const api = new ApiClient();

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
        type: 'success',
      });
      navigate(`/admin/resources/${resource.id}`);
    } catch (err) {
      console.error(err);
      sendNotice({
        message: err.message || 'Error occurred during approval.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/resources/${resource.id}`);
  };

  return (
    <Box variant="grey" style={{ padding: '40px', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      <Box style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #f0edf0'
      }}>
        <H3 style={{ color: '#1b4d3e', marginBottom: '20px', borderBottom: '2px solid #f4f2eb', paddingBottom: '10px' }}>
          Confirm Registration Approval
        </H3>
        
        <Text style={{ fontSize: '15px', color: '#555555', marginBottom: '20px', lineHeight: '1.6' }}>
          You are about to approve the delegate registration for <strong>{record.params.name}</strong>.
          This will update the ticket status to <strong>CONFIRMED (PAID)</strong> and trigger the automated email containing their entry ticket and credentials.
        </Text>

        <Box style={{
          background: '#fcfbf7',
          border: '1px solid #f0edf0',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <Text style={{ marginBottom: '8px' }}><strong>Participant Name:</strong> {record.params.name}</Text>
          <Text style={{ marginBottom: '8px' }}><strong>Email:</strong> {record.params.email}</Text>
          <Text style={{ marginBottom: '8px' }}><strong>Payable Amount:</strong> ₹{record.params.payableAmount}</Text>
          <Text style={{ marginBottom: '8px' }}><strong>UPI UTR Reference:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '15px', color: '#fd7e14' }}>{record.params.paymentReference || 'N/A'}</span></Text>
        </Box>

        <Box style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleCancel}
            disabled={loading}
            style={{
              background: '#f4f2eb',
              color: '#333',
              border: '1px solid #d4d0c5',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={loading}
            style={{
              background: '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(40,167,69,0.2)'
            }}
          >
            {loading ? 'Approving...' : 'Confirm & Approve'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ApproveAction;
