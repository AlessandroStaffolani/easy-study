import { React, Component } from 'react';
import '../css/App.css';
import AppNavigation from './AppNavigation';
import Content from './Content';

const BREAKPOINTS = {
  tablet: 480,
  desktop: 1024,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Easy Study',
      screenType: 'desktop',
      pages: [
        {
          id: 0,
          label: 'Materie',
          path: '/subjects',
          code: 'subjects',
          type: 'main',
          icon: 'collections_bookmark',
          active: false,
        },
        {
          id: 1,
          label: 'Domande',
          path: '/questions',
          code: 'questions',
          type: 'main',
          icon: 'bookmark',
          active: false,
        },
        {
          id: 2,
          label: 'Libretto',
          path: '/booklet',
          code: 'booklet',
          type: 'main',
          icon: 'library_books',
          active: false,
        },
        {
          id: 3,
          label: 'Profilo',
          path: '/profile',
          code: 'profile',
          type: 'profile',
          icon: 'account_circle',
          active: false,
        },
        {
          id: 4,
          label: 'Log out',
          path: '/logout',
          code: 'logout',
          type: 'profile',
          icon: 'exit_to_app',
          active: false,
        },
      ],
    };

    this.updateWindowScreenType = this.updateWindowScreenType.bind(this);
  }

  componentDidMount() {
    this.updateWindowScreenType();
    window.addEventListener('resize', this.updateWindowScreenType);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowScreenType);
  }

  updateWindowScreenType() {
    const width = window.innerWidth;
    if (width > BREAKPOINTS.desktop) {
      this.setState({
        screenType: 'desktop',
      });
    } else if (width > BREAKPOINTS.tablet) {
      this.setState({
        screenType: 'tablet',
      });
    } else {
      this.setState({
        screenType: 'mobile',
      });
    }
  }

  render() {
    return (
      <div className="App">
        <AppNavigation {...this.state}>
          <Content name={this.state.name} screenType={this.state.screenType} />
        </AppNavigation>
      </div>
    );
  }
}
