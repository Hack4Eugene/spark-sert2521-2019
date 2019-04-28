import React, { createElement } from 'react';
import { AppState, Person } from '../state';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';

const styles = createStyles({
  hello: {
    width: 100,
  },
});

const Home = ({ people }: HomeProps) => {
  return (
    <div>
      {people.map(person => {
        return <div>{JSON.stringify(person)}</div>;
      })}
    </div>
  );
};

interface HomeProps extends WithStyles<typeof styles> {
  people: Array<Person>;
}

export default withStyles(styles)(
  connect(({ people }: AppState) => ({ people }))(Home)
);
