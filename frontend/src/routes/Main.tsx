import createStyles from '@material-ui/core/es/styles/createStyles';
import classNames from 'classnames';
import { Theme } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { createElement, useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { PersonAdd, PermIdentity, Storage } from '@material-ui/icons';
import PersonForm from './PersonForm';
import NavigationItem from '../components/NavigationLink';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Login from '../components/Login';
import Home from './Home';
import isLoggedIn from '../utilities/isLoggedIn';
import PaymentSuccess from './PaymentSuccess';
import logo from '../images/logo.png';
import { store } from '../state';
import { updateUser } from '../state/actions';
import AdminPage from './Admin';

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
      lineHeight: '50px',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    logo: {
      width: '1.3cm',
      height: '1.3cm',
      marginRight: theme.spacing.unit * 2,
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    drawer: {
      height: '100vh',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      overflow: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      overflow: 'hidden',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexFlow: 'column',
    },
    appBarSpacer: {
      ...theme.mixins.toolbar,
      flex: '0 1 auto',
    },
    appBarLinks: {
      display: 'flex',
      marginLeft: 'auto',
    },
    appBarLink: {
      textDecoration: 'none',
      marginRight: 20,
    },
  });

const Main = ({ classes }: WithStyles<typeof styles>) => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  async function checkLogin() {
    const user: any = await isLoggedIn();

    if (user) {
      console.log('found log in!', user);
      store.dispatch(
        updateUser({
          username: user.username,
          email: user.email,
        })
      );
    } else {
      console.log('not authed');
      store.dispatch(updateUser(null));
    }
  }

  checkLogin();

  const isAuthed = store.getState().user != null;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerOpened && classes.drawerPaperClose
          ),
        }}
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setDrawerOpened(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {!isAuthed ? (
            <NavigationItem
              icon={PermIdentity}
              text="Login"
              linkTo="/login"
              closeNavigation={() => setDrawerOpened(false)}
            />
          ) : (
            <NavigationItem
              icon={PermIdentity}
              text={`Account (${
                (store.getState().user || { username: '' }).username
              })`}
              linkTo="/user"
              closeNavigation={() => setDrawerOpened(false)}
            />
          )}
          <NavigationItem
            icon={PersonAdd}
            text="Person Form"
            linkTo="/personform"
            closeNavigation={() => setDrawerOpened(false)}
          />
          <NavigationItem
            icon={Storage}
            text="Admin Center"
            linkTo="/admin"
            closeNavigation={() => setDrawerOpened(false)}
          />
        </List>
      </Drawer>
      <AppBar className={classes.appBar} color="secondary">
        <Toolbar disableGutters={!drawerOpened} className={classes.toolbar}>
          <Link
            to="/"
            style={{ display: 'flex', textDecoration: 'none', marginLeft: 20 }}
          >
            <img src={logo} className={classes.logo} alt="logo" />
            <Typography
              variant="title"
              color="primary"
              component="h1"
              noWrap
              className={classes.title}
            >
              Spark!
            </Typography>
          </Link>
          <div className={classes.appBarLinks}>
            <a
              href="https://www.carryitforward.net/"
              className={classes.appBarLink}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                noWrap
                className={classes.title}
              >
                Home
              </Typography>
            </a>
            <a
              href="https://www.carryitforward.net/what-we-do-1"
              className={classes.appBarLink}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                noWrap
                className={classes.title}
              >
                About
              </Typography>
            </a>
            <a
              href="https://www.carryitforward.net/projects-1"
              className={classes.appBarLink}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                noWrap
                className={classes.title}
              >
                Projects
              </Typography>
            </a>
            <a
              href="https://www.carryitforward.net/contact-cif"
              className={classes.appBarLink}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                noWrap
                className={classes.title}
              >
                Contact
              </Typography>
            </a>
            <a
              href="https://www.carryitforward.net/take-action"
              className={classes.appBarLink}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                noWrap
                className={classes.title}
              >
                Take Action
              </Typography>
            </a>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/s/:expanded" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/personform" component={PersonForm} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/payment/success" component={PaymentSuccess} />
        </Switch>
      </main>
    </div>
  );
};

export default withStyles(styles)(Main);
