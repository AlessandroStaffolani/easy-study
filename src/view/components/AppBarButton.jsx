import React from 'react';
import withRipple from '@material/react-ripple';

const AppBarButton = (props) => {
  const {
    label,
    className = '',
    initRipple,
    unbounded,
    path,
  } = props;

  const classes = `app-bar-button ${className}`;

  return (
    <span
      className={classes}>
      <span>
        {label}
      </span>
      <span className="app-bar-indicator" />
    </span>
  );
};

export default (AppBarButton);
