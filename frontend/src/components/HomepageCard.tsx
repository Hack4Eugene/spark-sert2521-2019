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
import Dialog from '@material-ui/core/es/Dialog';
import IconButton from '@material-ui/core/es/IconButton';
import Toolbar from '@material-ui/core/es/Toolbar';
import AppBar from '@material-ui/core/es/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../images/profpic.jpg';
import ItemCard from './ItemCard';

const styles = createStyles({
  homepageCard: {
    height: '23vh',
    paddingRight: '0px',
    margin: '3px',
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

  loadingContainer: {
    margin: 'auto',
  },

  profilePic: {
    width: '14vh',
    height: '14vh',
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

  fullscreenNameContainer: {
    width: '100%',
    position: 'relative',
  },

  fullscreenNameText: {
    textAlign: 'center',
    fontSize: '3vh',
    color: 'white',
    marginLeft: '-35px',
  },

  fullscreenImageContainer: {
    maxWidth: '35vh',
    margin: 'auto',
    height: '25vh',
    marginTop: '65px',
    marginBottom: '20px',
  },

  fullscreenImage: {
    width: '30vh',
    height: '30vh',
  },

  bioContainer: {
    width: '90%',
    margin: 'auto',
    maxHeight: '45vh',
    backgroundColor: '#DCDCDC',
    borderRadius: '25px',
  },

  bioText: {
    padding: '10px',
    textAlign: 'center',
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
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
        <ExpansionPanelSummary
          className={classes.homepageCard}
          onClick={event => {
            handleClickOpen();
          }}
        >
          <div className={classes.profilePicContainer}>
            <div className={classes.inner}>
              <Avatar className={classes.profilePic} alt={name} src={pic} />
              <CircularProgress
                thickness={3}
                className={classes.loadingCircle}
                size={120}
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

      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <div className={classes.fullscreenNameContainer}>
              <Typography className={classes.fullscreenNameText}>
                Sheev
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.fullscreenImageContainer}>
          <img alt={name} className={classes.fullscreenImage} src={logo} />
        </div>

        <div className={classes.bioContainer}>
          <Typography className={classes.bioText}>
            Did you ever hear the Tragedy of Darth Plagueis the wise? I thought
            not. It's not a story the Jedi would tell you. It's a Sith legend.
            Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise
            he could use the Force to influence the midichlorians to create
            life... He had such a knowledge of the dark side that he could even
            keep the ones he cared about from dying. The dark side of the Force
            is a pathway to many abilities some consider to be unnatural. He
            became so powerful... the only thing he was afraid of was losing his
            power, which eventually, of course, he did. Unfortunately, he taught
            his apprentice everything he knew, then his apprentice killed him in
            his sleep. It's ironic he could save others from death, but not
            himself.
          </Typography>
        </div>

        <div>
          <ItemCard
            itemName={'Backpack'}
            totalCost={50}
            totalFunded={25}
            pic={logo}
          />
        </div>
      </Dialog>
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
