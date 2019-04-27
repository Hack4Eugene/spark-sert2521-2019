import {Component} from "react";
import {Home} from "@material-ui/icons";
import {Card} from "@material-ui/core";
import * as React from "react";
import Typography from "@material-ui/core/es/Typography";
import CardContent from "@material-ui/core/es/CardContent";
import CardActionArea from "@material-ui/core/es/CardActionArea";
import createStyles from "@material-ui/core/es/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core/es";
import CardMedia from '@material-ui/core/CardMedia';
import logo from "../images/CIF+logo.png"
import withStyles from "@material-ui/core/es/styles/withStyles";
import {inspect} from "util";
import LinearProgress from "@material-ui/core/es/LinearProgress";

const styles = createStyles({
    homepagecard: {
        height: '23vh',
    },
    homepagecardstyles: {
        height: '23vh',
    },

    profilepicwrapper: {
        width: 'auto',
        height: '20vh',
        float: 'left',
        marginBottom: '10vh',
        marginRight: '5%',
    },

    personname: {
        marginTop: '-6px',
        textAlign: 'center',
        fontSize: '3vh',
        fontWeight: 'bold',
        lineHeight: '1.2',
        fontFamily: 'montserrat'
    },

    itemcontainer: {
        marginTop: '5px',
    },

    progressbar: {
        minHeight: '1vh',
    }
});

const HomepageCard = (props: WithStyles<typeof styles>) => {
    const {classes} = props;
    return (
        <>
            <Card className={classes.homepagecard}>
                <CardActionArea className={classes.homepagecardstyles}>
                    <CardContent>
                        <CardMedia className={classes.profilepicwrapper}
                                   component="img"
                                   image={logo}
                            // title="Contemplative Reptile"
                        />
                        <Typography className={classes.personname}>
                            Person Name
                        </Typography>
                        <div className={classes.itemcontainer}>
                            <Typography> Item Name </Typography>
                            <LinearProgress className={classes.progressbar} variant="determinate"
                                            value={50}></LinearProgress>
                        </div>
                        <div className={classes.itemcontainer}>
                            <Typography> Item Name </Typography>
                            <LinearProgress className={classes.progressbar} variant="determinate"
                                            value={50}></LinearProgress>
                        </div>
                        <div className={classes.itemcontainer}>
                            <Typography> Item Name </Typography>
                            <LinearProgress className={classes.progressbar} variant="determinate"
                                            value={50}></LinearProgress>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>

        </>
    );
}

export default withStyles(styles)(HomepageCard);