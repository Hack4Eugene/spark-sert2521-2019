import { Card } from '@material-ui/core';
import * as React from 'react';
import Typography from '@material-ui/core/es/Typography';
import CardContent from '@material-ui/core/es/CardContent';
import CardActionArea from '@material-ui/core/es/CardActionArea';
import createStyles from '@material-ui/core/es/styles/createStyles';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../images/billnyedoc.png';
import withStyles from '@material-ui/core/es/styles/withStyles';
import LinearProgress from '@material-ui/core/es/LinearProgress';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import ExpansionPanel from '@material-ui/core/es/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/es/ExpansionPanelSummary';
import { createElement } from 'react';
import Avatar from '@material-ui/core/es/Avatar';

const styles = createStyles({
  homepageCard: {
    height: '23vh',
    paddingRight: '0px',
  },

  root: {
    alignItems: 'center',
  },

  profilePicContainer: {
    width: '40vw',
    height: '15vh',
    position: 'relative',
    marginTop: '7px',
  },

  personName: {
    marginTop: '-6px',
    textAlign: 'center',
    fontSize: '3vh',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },

  itemContainer: {
    marginTop: '5px',
  },

  progressBar: {
    minHeight: '1vh',
  },

  colorPrimary: {
    // backgroundColor: getColor(.5)
  },

  loadingContainer: {
    margin: 'auto',
  },

  profilePic: {
    width: '14vh',
    height: '14vh',
    // margin: 'auto',
  },

  nameContainer: {
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },

  contentContainer: {
    width: '60%',
  },

  loadingCircle: {
    position: 'absolute',
    margin: 'auto',
    top: -7,
    left: -7,
    textAlign: 'center',
  },

  inner: {
    margin: 'auto',
  },
});

// Props: <HomepageCard name={'Bill Nye'} pic={''} items={['Pants', 'Hat' ,'dfd', 'dfs']} totalCosts={[10, 50, 23, 34]} totalFunded={[5,40, 3, 3]} isLoaded={true}/>

const HomepageCard = (props: any) => {
  const { classes } = props;

  // Display a loading screen if isLoaded is false
  if (!props.isLoaded) {
    return (
      <Card className={classes.homepageCard}>
        <CardContent>
          <div className={classes.loadingContainer}>
            <CircularProgress size={140} />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generates the item divs, with a maximum of 3
  const createItems = () => {
    var itemContainers: Array<any> = [];
    for (var i in props.items) {
      if (itemContainers.length < 3) {
        itemContainers.push(
          <div className={classes.itemContainer}>
            <Typography> {props.items[i]} </Typography>
            <LinearProgress
              className={classes.progressBar}
              variant="determinate"
              value={(props.totalFunded[i] / props.totalCosts[i]) * 100}
            />
          </div>
        );
      }
    }

    return itemContainers;
  };

  return (
    <>
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary className={classes.homepageCard}>
          <div className={classes.profilePicContainer}>
            <div className={classes.inner}>
              <Avatar
                className={classes.profilePic}
                alt={props.name}
                src={logo}
              />
              <CircularProgress
                thickness={3}
                className={classes.loadingCircle}
                size={120}
                variant="determinate"
                value={100}
              />
            </div>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.nameContainer}>
              <Typography className={classes.personName}>
                {props.name}
              </Typography>
            </div>
            {createItems()}
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </>
  );
};

interface personRequestData {
  funds: number;
  itemId: number;
  ordered: boolean;
  personId: number;
  quantity: number;
  id: number;
  complete: boolean;
  item: itemData;
  person: personData;
  totalPrice: number;
}

interface itemData {
  name: string;
  price: number;
  id: number;
}

interface personData {
  bio: string;
  funds: number;
  name: string;
  slug: string;
  id: number;
}

export default withStyles(styles)(HomepageCard);
