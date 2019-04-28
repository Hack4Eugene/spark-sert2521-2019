import { Card } from '@material-ui/core';
import * as React from 'react';
import Typography from '@material-ui/core/es/Typography';
import CardContent from '@material-ui/core/es/CardContent';
import CardActionArea from '@material-ui/core/es/CardActionArea';
import createStyles from '@material-ui/core/es/styles/createStyles';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/es/styles/withStyles';
import LinearProgress from '@material-ui/core/es/LinearProgress';
import RequestDonationButton from './RequestDonationButton';
import { createElement } from 'react';

const styles = createStyles({
  homepageCard: {
    height: '25vh',
  },

  profilePicContainer: {
    width: 'auto',
    height: '10vh',
    float: 'left',
    marginBottom: '10vh',
    marginRight: '5%',
  },

  itemName: {
    marginTop: '-6px',
    textAlign: 'center',
    fontSize: '2.5vh',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },

  progressBar: {
    marginTop: '10px',
    minHeight: '4.5vh',
    marginRight: '5%',
  },

  linearColorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  linearBarColorPrimary: {
    backgroundColor: '#00695c',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: '2.1vh',
  },

  bottomTextContainer: {
    marginTop: '.5vh',
  },
});

const ItemCard = (props: any) => {
  const { classes } = props;
  const funded = ((parseFloat(props.totalFunded) * 100) / 100).toFixed(2);
  const cost = ((parseFloat(props.totalCost) * 100) / 100).toFixed(2);
  const percent = ((props.totalFunded / props.totalCost) * 100).toFixed(0);

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
            <Typography className={classes.itemName}>
              {props.itemName}
            </Typography>

            <LinearProgress
              className={classes.progressBar}
              value={(props.totalFunded / props.totalCost) * 100}
              variant="determinate"
            />
            <div className={classes.bottomTextContainer}>
              <Typography className={classes.bottomText} variant="h6">
                ${funded} donated of ${cost} ({percent}%)
              </Typography>
            </div>
            <RequestDonationButton id={props.id} />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default withStyles(styles)(ItemCard);
