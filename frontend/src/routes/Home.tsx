import React, { createElement } from 'react';
import { Person } from '../state';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';
import HomepageCard from '../components/HomepageCard';

const styles = createStyles({
  hello: {
    width: 100,
  },
});

const Home = ({ people }: HomeProps) => {
  return (
    <div>
      {people.map(person => {
        return (
          <HomepageCard
            key={person.id}
            isLoaded={true}
            name={person.name}
            pic=""
            slug={person.slug}
            totalFunded={person.totalFunded}
            totalCost={person.totalCost}
          />
        );
      })}
    </div>
  );
};

interface HomeProps extends WithStyles<typeof styles> {
  people: Array<Person>;
}

export default withStyles(styles)(
  connect(({ people }: any) => {
    return { people: people };
  })(Home)
);
