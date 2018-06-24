import { Component } from 'react';
import '../css/App.css';
import ApplicationBar from './ApplicationBar';

export default class App extends Component {
  state = {
    name: 'Easy Study',
  };

  render() {
    return (
      <div className="App">
        <ApplicationBar name={this.state.name} />
        <h1>Welcome to {this.state.name}</h1>
        <p> A wonderfull graphics</p>
      </div>
    );
  }
}
