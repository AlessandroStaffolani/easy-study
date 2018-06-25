import { React, Component } from 'react';
import '../css/App.css';
import ApplicationBar from './ApplicationBar';

export default class App extends Component {
  state = {
    name: 'Easy Study',
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
    return (
      <div className="App">
        <ApplicationBar name={this.state.name} pages={this.state.pages} />
        <div className="content mdc-typography">
          <h1 className="mdc-typography--headline3">Welcome to {this.state.name}</h1>
          <p className="mdc-typography--subtitle2"> A wonderfull graphics</p>
        </div>
      </div>
    );
  }
}
