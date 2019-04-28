import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import Confetti from 'react-dom-confetti';
import { useState } from 'react';

const confettiConfig = {
  angle: 270,
  spread: 360,
  startVelocity: 50,
  elementCount: 500,
  duration: 10 * 1000,
  delay: 10,
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const PaymentSuccess = ({ location, history }: any) => {
  const params: any = queryString.parse(location.search);
  const amount = ((parseFloat(params.amount) * 100) / 100).toFixed(2);

  const [confettiActive, setConfettiActive] = useState(false);

  setTimeout(() => setConfettiActive(true), 10);

  console.log(confettiActive);

  if (!params.amount || !params.to) {
    history.replace('/');
  }

  return (
    <div
      className="container"
      style={{
        textAlign: 'center',
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ margin: '0 auto' }}>
        <Confetti active={confettiActive} config={confettiConfig} />
      </div>
      <Typography variant="display4">Thank You!</Typography>
      <Typography variant="display2">
        Your <strong>${amount}</strong> donation to <strong>{params.to}</strong>{' '}
        was successful!
      </Typography>
    </div>
  );
};

export default PaymentSuccess;
