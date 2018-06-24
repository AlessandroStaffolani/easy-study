import { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBarButton from './components/AppBarButton';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ApplicationBar extends Component {
  state = {
    pages: [
      {
        id: 0,
        label: 'Materie',
        path: '/subjects',
        code: 'subjects',
      },
      {
        id: 1,
        label: 'Domande',
        path: '/questions',
        code: 'questions',
      },
      {
        id: 2,
        label: 'Libretto',
        path: '/booklet',
        code: 'booklet',
      },
    ],
  };

  render() {
    const { classes, name } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="headline" color="inherit" className={[classes.flex, classes.title]}>
              {name}
            </Typography>
            {this.state.pages.map(page =>
              <AppBarButton key={page.id} path={page.path} code={page.code} value={page.label} />)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withTheme()(ApplicationBar));
