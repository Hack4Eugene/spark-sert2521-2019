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
        height: '15vh',
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
        fontFamily: 'montserrat'
    },

    progressBar: {
        marginTop: '10px',
        minHeight: '4.5vh',
    },

    linearColorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    linearBarColorPrimary: {
        backgroundColor: '#00695c',
    },

    bottomText: {
        textAlign: 'center',
        fontSize: '2.1vh'
    },

    bottomTextContainer: {
        marginTop: '.5vh'
    },
});

const ItemCard = (props: WithStyles<typeof styles>) => {
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
                        <Typography className={classes.itemName}>
                            Item Name
                        </Typography>

                        <LinearProgress className={classes.progressBar} value='75' variant='determinate'/>
                        <div className={classes.bottomTextContainer}>
                            <Typography className={classes.bottomText} variant='h6'>$15/$20 (75%)</Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default withStyles(styles)(ItemCard);