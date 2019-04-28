import React, { useState, useEffect } from 'react';
import getRequests from '../utilities/getRequests';
import { CircularProgress } from '@material-ui/core';

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
  return <div>loaded</div>;
};

export default AdminPage;
