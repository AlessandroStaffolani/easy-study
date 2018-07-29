import { React, Component } from 'react';
import subjects from '../../../model/subject';

class Index extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="content mdc-typography">
        <h1 className="mdc-typography--headline3">Materie</h1>
      </div>
    )
  }
}

export default Index;