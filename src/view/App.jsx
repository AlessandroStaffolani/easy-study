import { React, Component } from 'react';
import '../css/App.css';
import AppNavigation from './AppNavigation';
import Content from './Content';

export default class App extends Component {
  state = {
    name: 'Easy Study',
    pages: [
      {
        id: 0,
        label: 'Materie',
        path: '/subjects',
        code: 'subjects',
        type: 'main',
        icon: 'collections_bookmark',
        active: true,
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

  render() {
    return (
      <div className="App">
        <AppNavigation name={this.state.name} pages={this.state.pages}>
          <Content name={this.state.name}/>
        </AppNavigation>
      </div>
    );
  }
}
