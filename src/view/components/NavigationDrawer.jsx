import { React, Component } from 'react';

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.screenType === 'desktop' ? 'persistent' : 'temporary'
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

  render() {
    const { pages, setRef } = this.props;
    const { type } = this.state;
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
            {pages.filter(page => page.type === 'main').map(page => (
              <a key={page.id} onClick={(event) => this.handleLinkClick(event, page.path)} className={page.active ?
                'mdc-list-item mdc-list-item--activated' : 'mdc-list-item'} href={page.path}>
                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{page.icon}</i>{page.label}
              </a>
            ))}
            <hr className="mdc-list-divider" />
            <span className="mdc-typography--subtitle1 mdc-drawer--subtitle">Account</span>
            {pages.filter(page => page.type === 'profile').map(page => (
              <a key={page.id} onClick={(event) => this.handleLinkClick(event, page.path)} className={page.active ?
                'mdc-list-item mdc-list-item--activated' : 'mdc-list-item'} href={page.path}>
                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{page.icon}</i>{page.label}
              </a>
            ))}
          </nav>
        </nav>
      </aside>
    );
  }
}

export default NavigationDrawer;
