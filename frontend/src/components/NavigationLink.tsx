import React, { createElement } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';

const NavigationItem = ({ icon, text, linkTo }: NavigationItemProps) => {
  return (
    <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem button>
        <ListItemIcon>{createElement(icon)}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export interface NavigationItemProps {
  icon: React.ComponentType;
  text: string;
  linkTo: string;
}

export default NavigationItem;
