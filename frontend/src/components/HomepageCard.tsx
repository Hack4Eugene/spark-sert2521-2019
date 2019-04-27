import {Card} from "@material-ui/core";
import * as React from "react";
import Typography from "@material-ui/core/es/Typography";
import CardContent from "@material-ui/core/es/CardContent";
import CardActionArea from "@material-ui/core/es/CardActionArea";
import createStyles from "@material-ui/core/es/styles/createStyles";
import CardMedia from '@material-ui/core/CardMedia';
import logo from "../images/CIF+logo.png"
import withStyles from "@material-ui/core/es/styles/withStyles";
import LinearProgress from "@material-ui/core/es/LinearProgress";
import axios from "axios";


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


});


const HomepageCard = (props: any) => {
    const [personData, setPerson] = React.useState({name: '', slug: '', bio: '', funds: 0, id: 1})

    const getPersonData = async (slug: string) => {
        console.log("requesting");
        console.log(slug)
        return await axios('http://localhost:8080/api/people/' + slug).then(response => {
            setPerson(response.data.response)
        })
    }
    const {classes} = props;
    // console.log("RUN BEFORE")
    // console.log("RUN AFTER")

    React.useEffect(() => {
            getPersonData(props.slug)
        }, []
    )

    console.log(personData)

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

interface PersonData {
    name: string,
    slug: string,
    bio: string,
    fund: number,
    id: number
}

export default withStyles(styles)(HomepageCard);