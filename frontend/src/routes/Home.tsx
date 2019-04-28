import React, { createElement } from 'react';
import { Person, Request } from '../state';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';
import HomepageCard from '../components/HomepageCard';
import { CircularProgress } from '@material-ui/core';

const styles = createStyles({
  hello: {
    width: 100,
  },
});

const Home = ({ people, requests }: HomeProps) => {
  console.log(people, requests);
  if (people.length == 0 || requests.length == 0) {
    return <CircularProgress style={{ margin: 'auto' }} size={100} />;
  }

  return (
    <div>
      {people.map(person => {
        return (
          <HomepageCard
            key={person.id}
            isLoaded={true}
            name={person.name}
            pic={person.image}
            slug={person.slug}
            totalFunded={person.totalFunded}
            totalCost={person.totalCost}
            requests={requests}
            bioText={person.bio}
          />
        );
      })}
    </div>
  );
};

interface HomeProps extends WithStyles<typeof styles> {
  people: Array<Person>;
  requests: Array<Request>;
}

export default withStyles(styles)(
  connect(({ people, requests }: any) => {
    return { people: people, requests: requests };
  })(Home)
);
