import { React, Component } from 'react';
import '../css/App.css';
import AppNavigation from './AppNavigation';
import Content from './Content';
import Subject from './pages/subject/Index';

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
      currentPage: '',
      pages: {
        subjects: {
          id: 0,
          label: 'Materie',
          path: '/subjects',
          type: 'main',
          icon: 'collections_bookmark',
          active: false,
        },
        questions: {
          id: 1,
          label: 'Domande',
          path: '/questions',
          type: 'main',
          icon: 'bookmark',
          active: false,
        },
        booklet: {
          id: 2,
          label: 'Libretto',
          path: '/booklet',
          type: 'main',
          icon: 'library_books',
          active: false,
        },
        profile: {
          id: 3,
          label: 'Profilo',
          path: '/profile',
          type: 'account',
          icon: 'account_circle',
          active: false,
        },
        logout: {
          id: 4,
          label: 'Log out',
          path: '/logout',
          type: 'account',
          icon: 'exit_to_app',
          active: false,
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

  handlePageClick = (event, pageKey) => {
    event.preventDefault();
    const pages = this.getDisactivedPages();
    pages[pageKey].active = true;
    this.setState({
      pages,
      currentPage: pageKey,
    });
  };

  getDisactivedPages = () => {
    const { pages } = this.state;
    Object.keys(pages).map(key => {
      pages[key].active = false;
    });
    return pages;
  };

  render() {
    const { currentPage, name, screenType } = this.state;
    let content = <Content name={name} screenType={screenType} />;
    if (currentPage === 'subjects') {
      content = <Subject />;
    }
    return (
      <div className="App">
        <AppNavigation {...this.state} handlePageClick={this.handlePageClick}>
          {content}
        </AppNavigation>
      </div>
    );
  }
}
