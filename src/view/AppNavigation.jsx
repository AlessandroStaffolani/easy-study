import { React, Component } from 'react';
import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import { MDCPersistentDrawer, MDCTemporaryDrawer } from '@material/drawer';
import AppBarButton from './components/AppBarButton';
import NavigationDrawer from './components/NavigationDrawer';

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: null,
      drawerOpen: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const width = window.innerWidth;
    if (width < 840) {
      this.setState({
        drawer: this.initTemporaryDrawer(),
      });
    } else {
      this.setState({
        drawer: this.initPersistenDrawer(),
      });
    }
  }

  toggleDrawer = () => {
    const { drawer } = this.state;
    let { drawerOpen } = this.state;
    drawerOpen = !drawer.foundation_.isOpen();
    drawer.open = drawerOpen;

    this.setState({
      drawer: drawer,
      drawerOpen: drawerOpen,
    });
  };

  initPersistenDrawer = () => {
    return new MDCPersistentDrawer(document.querySelector('.mdc-drawer--persistent'))
  };

  initTemporaryDrawer = () => {
    return new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
  };

  render() {
    const { name, pages, children } = this.props;
    const applicationPages = [];
    /*pages.filter(page => page.type === 'main').map(page =>
      applicationPages.push(<AppBarButton key={page.id} label={page.label} path={page.path} code={page.code}/>));*/

    return (
      <div>
        <TopAppBar
          title={name}
          className="application-bar mdc-elevation--z3"
          navigationIcon={<MaterialIcon
            className="application-bar-menu-icon"
            icon="menu"
            onClick={() => this.toggleDrawer()}
          />}
          actionItems={applicationPages}
        />
        <div className="content-wrapper">
          <NavigationDrawer pages={pages} />
          {children}
        </div>
      </div>
    );
  }
}

export default AppNavigation;