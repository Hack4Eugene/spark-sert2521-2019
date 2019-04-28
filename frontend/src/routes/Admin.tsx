import React from 'react';
import { CircularProgress } from '@material-ui/core';
import AdminSection from '../components/AdminSection';
import createStyles from '@material-ui/core/es/styles/createStyles';
import { connect } from 'react-redux';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { Request } from '../state';

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

  return (
    <>
      <AdminSection title="Not Funded" items={getNotFunded()} />
      <AdminSection title="Funded" items={getFunded()} />
      <AdminSection title="Ordered" items={getOrdered()} />
      <AdminSection title="Delivered" items={getDelivered()} />
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
