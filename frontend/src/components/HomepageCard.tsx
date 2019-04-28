import { Card } from '@material-ui/core';
import * as React from 'react';
import Typography from '@material-ui/core/es/Typography';
import CardContent from '@material-ui/core/es/CardContent';
import createStyles from '@material-ui/core/es/styles/createStyles';
import withStyles from '@material-ui/core/es/styles/withStyles';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import ExpansionPanel from '@material-ui/core/es/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/es/ExpansionPanelSummary';
import { createElement } from 'react';
import Avatar from '@material-ui/core/es/Avatar';
import ExpansionPanelDetails from '@material-ui/core/es/ExpansionPanelDetails';
import logo from '../images/billnyedoc.png';

const styles = createStyles({
  homepageCard: {
    height: '23vh',
    paddingRight: '0px',
    marginTop: '1vh',
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
    top: -7,
    left: -7,
    textAlign: 'center',
    color: '#388e3c',
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

  expand: {
    maxHeight: '80vh',
    minHeight: '40vh',
    padding: '10px',
  },

  bioContainer: {
    width: '100%',
    borderRadius: '25px',
    backgroundColor: '#DCDCDC',
    padding: '10px',
  },

  bioText: {
    padding: '-25px',
    width: '100%',
    fontFamily: 'Montserrat',
    fontSize: '3vh',
  },
});

// Props: <HomePageCard slug={'scienceguy'} pic={''} totalFunded = {50} totalCost= {65} name={'Bill Nye'} isLoaded={true}
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
              <Avatar
                className={classes.profilePic}
                alt={props.name}
                src={logo}
              />
              <CircularProgress
                thickness={3}
                className={classes.loadingCircle}
                size={120}
                variant="static"
                value={(props.totalFunded / props.totalCost) * 100}
              />
            </div>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.nameContainer}>
              <Typography className={classes.personName}>
                {props.name}
              </Typography>
            </div>
            <Typography className={classes.slug}>{props.slug}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expand}>
          <div className={classes.bioContainer}>
            <Typography className={classes.bioText}>
              Did you ever hear the Tragedy of Darth Plagueis the wise? I
              thought not. It's not a story the Jedi would tell you. It's a Sith
              legend. Darth Plagueis was a Dark Lord of the Sith, so powerful
              and so wise he could use the Force to influence the midichlorians
              to create life... He had such a knowledge of the dark side that he
              could even keep the ones he cared about from dying. The dark side
              of the Force is a pathway to many abilities some consider to be
              unnatural. He became so powerful... the only thing he was afraid
              of was losing his power, which eventually, of course, he did.
              Unfortunately, he taught his apprentice everything he knew, then
              his apprentice killed him in his sleep. It's ironic he could save
              others from death, but not himself.
            </Typography>
          </div>
        </ExpansionPanelDetails>
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
