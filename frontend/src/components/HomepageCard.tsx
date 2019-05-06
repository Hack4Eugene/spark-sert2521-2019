import * as React from 'react';
import { createElement } from 'react';
import Typography from '@material-ui/core/es/Typography';
import createStyles from '@material-ui/core/es/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/es/Avatar';
import Dialog from '@material-ui/core/es/Dialog';
import Slide from '@material-ui/core/es/Slide';
import IconButton from '@material-ui/core/es/IconButton';
import Toolbar from '@material-ui/core/es/Toolbar';
import AppBar from '@material-ui/core/es/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import ItemCard from './ItemCard';
import { Request } from '../state';
import PersonDonationButton from './PersonDonationButton';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

interface state {
  fullWidth: boolean;
  open: boolean;
}

const styles = createStyles({
  homepageCard: {
    height: '40vh',
    width: '60vh',
    paddingRight: '0px',
  },

  root: {
    alignItems: 'center',
  },

  profilePicContainer: {
    height: '15vh',
    position: 'relative',
    marginTop: 7,
    marginBottom: 25,
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
    margin: 'auto',
  },

  nameContainer: {
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },

  contentContainer: {
    margin: 'auto',
  },

  loadingCircle: {
    position: 'absolute',
    margin: 'auto',
    top: '-1vh',
    left: '21vh',
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
  expanded,
}: HomepageCardProps) => {
  // const [open, setOpen] = React.useState(false);

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

  function Transition(props: any) {
    return <Slide direction="up" {...props} />;
  }

  const percentComplete = Math.min(
    totalCost > 0 ? (totalFunded / totalCost) * 100 : 0,
    100
  );

  const avatarProps =
    percentComplete >= 100
      ? {
          style: {
            outlineWidth: 100,
            outlineOffset: -100,
            outlineColor: 'rgba(25, 255, 75, 0.4)',
            outlineStyle: 'solid',
          },
        }
      : {};

  return (
    <Link to={`/s/${slug}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.root}>
        <CardContent className={classes.homepageCard}>
          <div className={classes.profilePicContainer}>
            <div className={classes.inner}>
              <Avatar
                className={classes.profilePic}
                alt={name}
                src={pic}
                imgProps={avatarProps}
              />
              <CircularProgress
                thickness={3}
                className={classes.loadingCircle}
                size="16vh"
                variant="static"
                value={percentComplete}
              />
            </div>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.nameContainer}>
              <Typography className={classes.personName}>{name}</Typography>
            </div>
            <Typography className={classes.slug}>{slug}</Typography>
          </div>
        </CardContent>
      </Card>

      <Dialog fullScreen open={expanded}>
        <AppBar>
          <Toolbar>
            <div className={classes.fullscreenNameContainer}>
              <Typography className={classes.fullscreenNameText}>
                {name}
              </Typography>
            </div>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: theme.palette.primary.contrastText,
              }}
            >
              <IconButton color="inherit" aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Link>
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
            if (req.person && req.person.slug == slug) {
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
    </Link>
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
  expanded: boolean;
}

export default withStyles(styles)(HomepageCard);
