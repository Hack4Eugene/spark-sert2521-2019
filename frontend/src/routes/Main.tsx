import React, { createElement } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";

const styles = createStyles({});

const Main = ({ classes }: WithStyles<typeof styles>) => (
    <div>
    </div>
);

export default withStyles(styles)(Main);
