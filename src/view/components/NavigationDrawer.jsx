import { React, Component } from 'react';
import { subjects } from '../../model/subject';

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.screenType === 'desktop' ? 'persistent' : 'temporary',
      subjects: subjects,
      subjectListClass: 'subject-list',
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleSubjectClick = this.handleSubjectClick.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.screenType !== this.props.screenType) {
      this.updateWindowDimensions();
    }
  }

  updateWindowDimensions() {
    if (this.props.screenType === 'desktop') {
      this.setState({
        type: 'persistent',
      });
    } else {
      this.setState({
        type: 'temporary',
      });
    }
  }

  handleLinkClick = (event, target) => {
    event.preventDefault();
    console.log(target);
  };

  handleSubjectClick = (event) => {
    event.preventDefault();
    const { subjectListClass } = this.state;
    if (subjectListClass === 'subject-list') {
      this.setState({
        subjectListClass: 'subject-list active',
      })
    } else {
      this.setState({
        subjectListClass: 'subject-list',
      })
    }
  };

  render() {
    const { pages, setRef, handlePageClick } = this.props;
    const { type, subjects } = this.state;
    const mainClass = `mdc-drawer mdc-typography mdc-drawer--${type}`;

    return (
      <aside ref={setRef} className={mainClass}>
        <nav className="mdc-drawer__drawer">
          <header className="mdc-drawer__header">
            <div className="mdc-drawer__header-content">
              <div className="user-profile-image">
                <i className="material-icons">account_circle</i>
              </div>
              <div className="user-profile-name">Profile Name</div>
            </div>
          </header>
          <nav id="icon-with-text-demo" className="mdc-drawer__content mdc-list">
            {Object.keys(pages).map(key => {
              if (pages[key].type === 'main') {
                let page = pages[key];
                if (key === 'subjects') {
                  return (
                    <div>
                      <span key={page.id}
                            onClick={this.handleSubjectClick}
                            className={page.active ?
                        'mdc-list-item mdc-list-item--activated' : 'mdc-list-item'}>
                        <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{page.icon}</i>{page.label}
                      </span>
                      <div className={this.state.subjectListClass}>
                        <ul className="mdc-list" aria-orientation="vertical">
                          {subjects.map(subject =>
                            <a key={subject.id} onClick={(event) => handlePageClick(event, key, subject.name)} className={'mdc-list-item'} href="subjects" >
                              {subject.name}
                            </a>
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <a key={page.id} onClick={(event) => handlePageClick(event, key)} className={page.active ?
                      'mdc-list-item mdc-list-item--activated' : 'mdc-list-item'} href={page.path}>
                      <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{page.icon}</i>{page.label}
                    </a>
                  )
                }
              }
            })}
            <hr className="mdc-list-divider" />
            <span className="mdc-typography--subtitle1 mdc-drawer--subtitle">Account</span>
            {Object.keys(pages).map(key => {
              if (pages[key].type === 'account') {
                let page = pages[key];
                return (
                  <a key={page.id} onClick={(event) => handlePageClick(event, key)} className={page.active ?
                    'mdc-list-item mdc-list-item--activated' : 'mdc-list-item'} href={page.path}>
                    <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{page.icon}</i>{page.label}
                  </a>
                )
              }
            })}
          </nav>
        </nav>
      </aside>
    );
  }
}

export default NavigationDrawer;
