import { React, Component } from 'react';
import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import { MDCPersistentDrawer, MDCTemporaryDrawer } from '@material/drawer';
import AppBarButton from './components/AppBarButton';
import NavigationDrawer from './components/NavigationDrawer';

class AppNavigation extends Component {
  constructor(props) {
    super(props);

    this.drawer = null;

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setDrawerRef = this.setDrawerRef.bind(this);
  }

  componentDidMount() {
    this.drawer = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.screenType !== this.props.screenType) {
      this.drawer = null;
    }
  }

  setDrawerRef(drawer) {
    this.drawerDOM = drawer;
  }

  toggleDrawer = () => {
    if (this.drawer === null) {
      this.drawer = this.props.screenType === 'desktop' ? this.initPersistenDrawer() : this.initTemporaryDrawer();
    }
    this.drawer.open = !this.drawer.foundation_.isOpen();
  };

  initPersistenDrawer = () => {
    return new MDCPersistentDrawer(this.drawerDOM)
  };

  initTemporaryDrawer = () => {
    return new MDCTemporaryDrawer(this.drawerDOM);
  };

  render() {
    const { name, pages, children, screenType } = this.props;
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
          <NavigationDrawer pages={pages} screenType={screenType} setRef={this.setDrawerRef} />
          {children}
        </div>
      </div>
    );
  }
}

export default AppNavigation;