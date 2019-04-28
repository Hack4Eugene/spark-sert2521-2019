import React, { createElement, useEffect, useState } from 'react';
import { Person, Request } from '../state';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';
import HomepageCard from '../components/HomepageCard';
import { CircularProgress } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';

const styles = createStyles({
  hello: {
    width: 100,
  },
});

const Home = ({ people, requests, match }: HomeProps) => {
  console.log(people, requests);

  if (people.length == 0) {
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
            expanded={match.params.expanded === person.slug}
          />
        );
      })}
    </div>
  );
};

interface HomeProps
  extends WithStyles<typeof styles>,
    RouteComponentProps<{ expanded: string }> {
  people: Array<Person>;
  requests: Array<Request>;
}

export default withRouter(
  withStyles(styles)(
    connect(({ people, requests }: any) => {
      return { people: people, requests: requests };
    })(Home)
  )
);
