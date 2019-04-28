import { Card } from '@material-ui/core';
import * as React from 'react';
import Typography from '@material-ui/core/es/Typography';
import CardContent from '@material-ui/core/es/CardContent';
import CardActionArea from '@material-ui/core/es/CardActionArea';
import createStyles from '@material-ui/core/es/styles/createStyles';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import LinearProgress from '@material-ui/core/es/LinearProgress';
import CircularProgress from '@material-ui/core/es/CircularProgress';

const styles = createStyles({
  homepageCard: {
    height: '23vh',
  },

  profilePicContainer: {
    width: 'auto',
    height: '20vh',
    float: 'left',
    marginBottom: '10vh',
    marginRight: '5%',
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
    textAlign: 'center',
  },
});

// Props: <HomepageCard name={'Bill Nye'} pic={''} items={['Pants', 'Hat' ,'dfd', 'dfs']} totalCosts={[10, 50, 23, 34]} totalFunded={[5,40, 3, 3]} isLoaded={true}/>

const HomepageCard = (props: HomepageCardProps) => {
  const { classes } = props;

  // Display a loading screen if isLoaded is false
  if (!props.isLoaded) {
    return (
      <Card className={classes.homepageCard}>
        <CardContent>
          <div className={classes.loadingContainer}>
            <CircularProgress size={120} />
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
      <Card className={classes.homepageCard}>
        <CardActionArea className={classes.homepageCard}>
          <CardContent>
            <CardMedia
              className={classes.profilePicContainer}
              component="img"
              image={props.pic}
            />
            <Typography className={classes.personName}>{props.name}</Typography>
            {createItems()}
          </CardContent>
        </CardActionArea>
      </Card>
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

interface HomepageCardProps extends WithStyles<typeof styles> {
  items: Array<number>;
  isLoaded: boolean;
  totalFunded: Array<number>;
  totalCosts: Array<number>;
  pic: string;
  name: string;
}

export default withStyles(styles)(HomepageCard);
