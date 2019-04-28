import React, { useState, useEffect } from 'react';
import getRequests from '../utilities/getRequests';
import { CircularProgress, Paper } from '@material-ui/core';
import AdminSection from '../components/AdminSection';

const AdminPage = () => {
  const [requests, setRequests] = useState();
  const [loading, setLoading] = useState(true);
  const fetchRequests = async () => {
    const data = await getRequests();
    setRequests(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, [requests]);

  if (loading) {
    return <CircularProgress size={100} style={{ margin: 'auto' }} />;
  }
  return (
    <div>
      <AdminSection />
    </div>
  );
};

export default AdminPage;
