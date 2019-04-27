import { Card } from '@material-ui/core';
import * as React from 'react';
import Typography from '@material-ui/core/es/Typography';
import CardContent from '@material-ui/core/es/CardContent';
import CardActionArea from '@material-ui/core/es/CardActionArea';
import createStyles from '@material-ui/core/es/styles/createStyles';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../images/CIF+logo.png';
import withStyles from '@material-ui/core/es/styles/withStyles';
import LinearProgress from '@material-ui/core/es/LinearProgress';
import axios from 'axios';
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

const HomepageCard = (props: any) => {
  const [personData, setPerson] = React.useState();

  // Gets all the requests for a person, given a slug
  const getPersonData = async (slug: string) => {
    console.log('requesting');
    console.log(slug);
    const response = await axios(
      'http://localhost:8080/api/people/' + slug + '/requests'
    );
    const personData: personRequestData = response.data.response;
    setPerson(personData);

    return personData;
  };

  // Assign the styles and props to classes
  const { classes } = props;

  // Get data about person every time page is refreshed
  React.useEffect(() => {
    getPersonData(props.slug);
  }, []);

  // While waiting for the data request to finish, display a loading a screen
  if (!personData) {
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

  console.log(personData);

  // Generates the item divs, with a maximum of 3
  const createItems = () => {
    var itemContainers: Array<any> = [];
    personData.map((data: personRequestData) => {
      itemContainers.push(
        <>
          <div className={classes.itemContainer}>
            <Typography> {data.item.name} </Typography>
            <LinearProgress
              className={classes.progressBar}
              variant="determinate"
              value={(data.funds / data.totalPrice) * 100}
            />
          </div>
        </>
      );
    });

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
              // TODO: Replace this with value stored in personData
              image={logo}
            />
            <Typography className={classes.personName}>
              {personData[0].person.name}
            </Typography>
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

export default withStyles(styles)(HomepageCard);
