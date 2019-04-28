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
import Slide from '@material-ui/core/es/Slide';
import IconButton from '@material-ui/core/es/IconButton';
import Toolbar from '@material-ui/core/es/Toolbar';
import AppBar from '@material-ui/core/es/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../images/profpic.jpg';
import ItemCard from './ItemCard';
import LinearProgress from '@material-ui/core/es/LinearProgress';
import { Request } from '../state';
import RequestDonationButton from './RequestDonationButton';
import PersonDonationButton from './PersonDonationButton';

interface state {
  fullWidth: boolean;
  open: boolean;
}

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
    margin: 'auto',
    width: '30vh',
    height: '30vh',
    marginTop: '80px',
    marginBottom: '20px',
  },

  fullscreenImage: {
    width: '100%',
    height: '100%',
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

// const HomepageCard = (props: any) => {
//   const { classes } = props;

const HomepageCard = ({
  classes,
  isLoaded,
  name,
  pic,
  slug,
  totalCost,
  totalFunded,
  requests,
  bioText,
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

  const handleClick = () => {
    console.log('sdads');
  };

  function Transition(props: any) {
    return <Slide direction="up" {...props} />;
  }

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
                size="14vh"
                variant="static"
                value={totalCost > 0 ? (totalFunded / totalCost) * 100 : 0}
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
            <div className={classes.fullscreenNameContainer}>
              <Typography className={classes.fullscreenNameText}>
                {name}
              </Typography>
            </div>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.fullscreenImageContainer}>
          <img className={classes.fullscreenImage} src={pic} />
        </div>

        <PersonDonationButton slug={slug} />

        <div className={classes.bioContainer}>
          <Typography className={classes.bioText}>{bioText}</Typography>
        </div>

        <div className={classes.itemContainer}>
          {requests.map(req => {
            if (req.person.slug == slug) {
              return (
                <>
                  <ItemCard
                    itemName={req.item.name}
                    totalCost={req.totalPrice}
                    totalFunded={req.funds}
                    pic={''}
                    id={req.id}
                  />
                </>
              );
            }
          })}
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
  requests: Array<Request>;
  bioText: string;
}

export default withStyles(styles)(HomepageCard);
