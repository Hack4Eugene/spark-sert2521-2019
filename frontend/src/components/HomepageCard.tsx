import {Card} from "@material-ui/core";
import * as React from "react";
import Typography from "@material-ui/core/es/Typography";
import CardContent from "@material-ui/core/es/CardContent";
import CardActionArea from "@material-ui/core/es/CardActionArea";
import createStyles from "@material-ui/core/es/styles/createStyles";
import {WithStyles} from "@material-ui/core/es";
import CardMedia from '@material-ui/core/CardMedia';
import logo from "../images/CIF+logo.png"
import withStyles from "@material-ui/core/es/styles/withStyles";
import LinearProgress from "@material-ui/core/es/LinearProgress";

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
        fontFamily: 'montserrat'
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


});

const HomepageCard = (props: WithStyles<typeof styles>) => {
    const {classes} = props;
    return (
        <>
            <Card className={classes.homepageCard}>
                <CardActionArea className={classes.homepageCard}>
                    <CardContent>
                        <CardMedia className={classes.profilePicContainer}
                                   component="img"
                                   image={logo}
                        />
                        <Typography className={classes.personName}>
                            Person Name
                        </Typography>
                        <div className={classes.itemContainer}>
                            <Typography> Item Name </Typography>
                            <LinearProgress className={classes.progressBar} variant="determinate"
                                            value={50}/>
                        </div>
                        <div className={classes.itemContainer}>
                            <Typography> Item Name </Typography>
                            <LinearProgress className={classes.progressBar} variant="determinate"
                                            value={50}/>
                        </div>
                        <div className={classes.itemContainer}>
                            <Typography> Item Name </Typography>
                            <LinearProgress
                                className={classes.progressBar} variant="determinate"
                                value={50}/>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default withStyles(styles)(HomepageCard);