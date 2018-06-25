import { React, Component } from 'react';
import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import AppBarButton from './components/AppBarButton';

class ApplicationBar extends Component {

  render() {
    const { name, pages } = this.props;
    const applicationPages = [];
    pages.map(page => {
      applicationPages.push(<AppBarButton key={page.id} label={page.label} path={page.path} code={page.code} />);
    });

    return (
      <TopAppBar
        title={name}
        className="application-bar mdc-elevation--z3"
        navigationIcon={<MaterialIcon
          className="application-bar-menu-icon"
          icon="menu"
          onClick={() => console.log('click')}
        />}
        actionItems={applicationPages}
      />
    );
  }
}

export default ApplicationBar;
