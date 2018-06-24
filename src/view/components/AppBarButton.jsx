import { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  buttonWrapper: {
    display: 'inline-block',
    height: '64px',
    lineHeight: '64px',
    color: 'rgba(255,255,255,0.7)',
    '&:hover': {
      height: '60px',
      borderBottom: '4px solid #fff',
      color: 'rgba(255,255,255,1)',
    }
  },
  appBarButton: {
    padding: '22px 20px',
    borderRadius: 0,
  },
});

function AppBarButton(props) {
  const { classes, value } = props;
  return (
    <div className={classes.buttonWrapper}>
      <Button color="inherit" className={classes.appBarButton}>
        {value}
      </Button>
    </div>
  );
}

export default withStyles(styles)(withTheme()(AppBarButton));