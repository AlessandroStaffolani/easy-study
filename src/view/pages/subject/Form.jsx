import { React, Component } from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date_exam: ''
    }
  }

  render() {
    const { title } = this.props;
    return (
      <form>
        <h3 className="mdc-typography--headline5 ">{ title }</h3>
        <TextField
          label='Name'
          leadingIcon={<i className="material-icons">book</i>}
          className="subject-form-item"
          box={true}
        >
          <Input
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}/>
        </TextField>
        <TextField
          label='Date exam'
          leadingIcon={<i className="material-icons">event</i>}
          className="subject-form-item"
          box={true}
        >
          <Input
            value={this.state.date_exam}
            onChange={(e) => this.setState({date_exam: e.target.value})}/>
        </TextField>
      </form>
    )
  }
}

export default Form;