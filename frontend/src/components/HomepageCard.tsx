import { Card } from '@material-ui/core';
import * as React from 'react';
import Typography from '@material-ui/core/es/Typography';
import CardContent from '@material-ui/core/es/CardContent';
import createStyles from '@material-ui/core/es/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import ExpansionPanel from '@material-ui/core/es/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/es/ExpansionPanelSummary';
import { createElement } from 'react';
import Avatar from '@material-ui/core/es/Avatar';
import { Theme } from '@material-ui/core/es';

const styles = (theme: Theme) =>
  createStyles({
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
      fontSize: '5vh',
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
      margin: 'auto',
      width: '60%',
    },

    loadingCircle: {
      position: 'absolute',
      margin: 'auto',
      top: 0,
      left: 0,
      textAlign: 'center',
      color: theme.palette.primary.dark,
    },

    inner: {
      margin: 'auto',
    },

    slug: {
      marginTop: '1vh',
      fontSize: '4vh',
      textAlign: 'center',
      color: 'gray',
    },
  });

// Props: <HomePageCard slug={'scienceguy'} pic={''} totalFunded = {50} totalCost= {65} name={'Bill Nye'} isLoaded={true}
const HomepageCard = ({
  classes,
  isLoaded,
  name,
  pic,
  slug,
  totalCost,
  totalFunded,
}: HomepageCardProps) => {
  // Display a loading screen if isLoaded is false
  if (!isLoaded) {
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
  // const createItems = () => {
  //     var itemContainers: Array<any> = [];
  //     for (var i in props.items) {
  //         if (itemContainers.length < 3) {
  //             itemContainers.push(
  //                 <div className={classes.itemContainer}>
  //                     <Typography> {props.items[i]} </Typography>
  //                     <LinearProgress
  //                         className={classes.progressBar}
  //                         variant="determinate"
  //                         value={(props.totalFunded[i] / props.totalCosts[i]) * 100}
  //                     />
  //                 </div>
  //             );
  //         }
  //     }
  //
  //     return itemContainers;
  // };

  return (
    <>
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary className={classes.homepageCard}>
          <div className={classes.profilePicContainer}>
            <div className={classes.inner}>
              <Avatar className={classes.profilePic} alt={name} src={pic} />
              <CircularProgress
                thickness={3}
                className={classes.loadingCircle}
                size="14vh"
                variant="static"
                value={(totalFunded / totalCost) * 100}
              />
            </div>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.nameContainer}>
              <Typography className={classes.personName}>{name}</Typography>
            </div>
            <Typography className={classes.slug}>{slug}</Typography>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </>
  );
};

interface HomepageCardProps extends WithStyles<typeof styles> {
  isLoaded: boolean;
  totalFunded: number;
  totalCost: number;
  pic: string;
  name: string;
  slug: string;
}

export default withStyles(styles)(HomepageCard);
