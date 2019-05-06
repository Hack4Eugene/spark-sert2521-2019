import React, { createElement, useEffect, useState } from 'react';
import { Person, Request } from '../state';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';
import HomepageCard from '../components/HomepageCard';
import { CircularProgress, Typography, Grid } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';

const styles = createStyles({
  intro: {
    marginBottom: 30,
  },
  people: {
    display: 'flex',
  },
  outerGrid: {
    margin: '0 auto',
  },
  innerGrid: {
    width: 'auto',
    margin: '0 auto',
  },
});

function chunk(arr: Array<any>, len: number) {
  let chunks = [];
  let i = 0;

  while (i < arr.length) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}

const Home = ({ people, requests, match, classes }: HomeProps) => {
  const peopleArray = people.map(person => (
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
  ));

  const renderPeople = () => {
    if (people.length == 0) {
      return (
        <CircularProgress style={{ margin: 'auto' }} thickness={1} size={80} />
      );
    } else {
      const chunked = chunk(peopleArray, 2);

      return (
        <Grid
          className={classes.outerGrid}
          container
          direction="row"
          spacing={24}
        >
          {chunked.map((chunk, id) => (
            <Grid
              className={classes.innerGrid}
              container
              item
              spacing={24}
              key={id}
            >
              {chunk.map((item, id) => (
                <Grid item key={id}>
                  {item}
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <div>
      <div className={classes.intro}>
        <Typography variant="headline">Meet Your Neighbors</Typography>
        <Typography variant="subheading">
          Spark is a new program we're implementing to help specific individuals
          in the community with the items and support they need. Every month
          Carry It Forward chooses five individuals to tell you their story and
          what they need to survive and thrive. You can choose to donate items
          directly, give money towards their purchase or offer help in other
          ways. Please read their stories and help in any way you're able.
        </Typography>
      </div>
      <div className={classes.people}>{renderPeople()}</div>
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
