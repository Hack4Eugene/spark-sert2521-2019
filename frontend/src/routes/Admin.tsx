import React, { useState, useEffect } from 'react';
import getRequests from '../utilities/getRequests';
import { CircularProgress, Paper } from '@material-ui/core';
import AdminSection from '../components/AdminSection';
import createStyles from '@material-ui/core/es/styles/createStyles';
import { connect } from 'react-redux';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { Person, Request } from '../state';

const styles = createStyles({});

const AdminPage = ({ requests }: AdminProps) => {
  const getNotFunded = () => {
    return requests.filter(x => !x.complete);
  };

  const getFunded = () => {
    return requests.filter(x => x.complete && !x.ordered && !x.delivered);
  };

  const getOrdered = () => {
    return requests.filter(x => x.complete && x.ordered && !x.delivered);
  };

  const getDelivered = () => {
    return requests.filter(x => x.complete && x.ordered && x.delivered);
  };

  if (requests.length <= 0) {
    return <CircularProgress size={100} style={{ margin: 'auto' }} />;
  }
  // return (
  //   <div>
  //     <AdminSection />
  //   </div>

  return (
    <>
      <h2>Not Funded</h2>
      {getNotFunded().map(request => {})}
      <h2>Funded</h2>
      {getFunded().map(request => {})}
      <h2>Ordered</h2>
      {getOrdered().map(request => {})}
      <h2>Delivered</h2>
      {getDelivered().map(request => {})}
    </>
  );
};

interface AdminProps extends WithStyles<typeof styles> {
  requests: Array<Request>;
}

export default withStyles(styles)(
  connect(({ requests }: any) => {
    return { requests: requests };
  })(AdminPage)
);
