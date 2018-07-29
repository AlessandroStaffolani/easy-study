import { React, Component } from 'react';
import '../css/App.css';
import AppNavigation from './AppNavigation';
import Default from './Content';
import Subject from './pages/subject/Index';
import Booklet from './pages/booklet/Index';
import Profile from './pages/profile/Index';

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
      currentPage: 'subjects',
      currentSubject: 'cloud',
      pages: {
        home: {
          id: 0,
          label: 'Home page',
          path: '/',
          type: 'home',
          icon: 'home',
        },
        subjects: {
          id: 0,
          label: 'Materie',
          path: '/subjects',
          type: 'main',
          icon: 'collections_bookmark',
        },
        booklet: {
          id: 2,
          label: 'Libretto',
          path: '/booklet',
          type: 'main',
          icon: 'library_books',
        },
        profile: {
          id: 3,
          label: 'Profilo',
          path: '/profile',
          type: 'account',
          icon: 'account_circle',
        },
        logout: {
          id: 4,
          label: 'Log out',
          path: '/logout',
          type: 'account',
          icon: 'exit_to_app',
        }
      },
    };

    this.updateWindowScreenType = this.updateWindowScreenType.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
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

  handlePageClick = (event, pageKey, subjectName = undefined) => {
    event.preventDefault();
    this.setState({
      currentPage: pageKey,
      currentSubject: subjectName
    });
  };

  setAppContent = () => {
    switch (this.state.currentPage) {
      case 'home':
        return <Default { ...this.state }/>;
      case 'subjects':
        return <Subject { ...this.state }/>;
      case 'booklet':
        return <Booklet { ...this.state }/>;
      case 'profile':
        return <Profile { ...this.state }/>;
      case 'logout':
        return <Default { ...this.state }/>;
    }
  }

  render() {
    const { currentPage, name, screenType } = this.state;
    const content = this.setAppContent();
    return (
      <div className="App">
        <AppNavigation {...this.state} handlePageClick={this.handlePageClick}>
          {content}
        </AppNavigation>
      </div>
    );
  }
}
