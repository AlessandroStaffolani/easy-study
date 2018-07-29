import { React, Component } from 'react';
import Fab from '../../components/FloatingButton';
import SubjectForm from './Form';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };

    this.handleNewSubjectClick = this.handleNewSubjectClick.bind(this);
  }

  handleNewSubjectClick = (event) => {
    event.preventDefault();
    this.setState({
      showForm: true
    })
  };

  render() {
    const { currentSubject } = this.props;
    return (
      <div className="content mdc-typography">
        <h1 className="mdc-typography--headline3 page-heading">{currentSubject}</h1>
        <Fab
          className="add-subject-button"
          icon={<i className="material-icons">add</i>}
          onClick={this.handleNewSubjectClick}
          label={'Add new subject'}
        />
        {this.state.showForm ? <SubjectForm title={'Create new subject'}/> : ''}
      </div>
    )
  }
}

export default Index;