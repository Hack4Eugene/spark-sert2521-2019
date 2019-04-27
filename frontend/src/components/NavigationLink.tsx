import React, { createElement } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';

const NavigationItem = ({
  icon,
  text,
  linkTo,
  closeNavigation,
}: NavigationItemProps) => (
  <Link
    to={linkTo}
    style={{ textDecoration: 'none', color: 'inherit' }}
    onClick={closeNavigation ? closeNavigation : () => {}}
  >
    <ListItem button>
      <ListItemIcon>{createElement(icon)}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Link>
);

export interface NavigationItemProps {
  icon: React.ComponentType;
  text: string;
  linkTo: string;
  closeNavigation: (() => void) | null;
}

export default NavigationItem;
