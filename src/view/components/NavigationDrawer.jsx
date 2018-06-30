import { React, Component } from 'react';

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: window.innerWidth < 840 ? 'temporary' : 'persistent'
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const width = window.innerWidth;
    if (width < 840) {
      this.setState({
        type: 'temporary',
      });
    } else {
      this.setState({
        type: 'persistent',
      });
    }
  }

  handleLinkClick = (event, target) => {
    event.preventDefault();
    console.log(target);
  };

  render() {
    const { pages } = this.props;
    const { type } = this.state;
    const mainClass = `mdc-drawer mdc-typography mdc-drawer--${type}`;

    return (
      <aside className={mainClass}>
        <nav className="mdc-drawer__drawer">
          <header className="mdc-drawer__header">
            <div className="mdc-drawer__header-content">
              <div className="user-profile">
                <div className="user-profile-image">
                  <i className="material-icons">account_circle</i>
                </div>
                <div className="user-profile-name">Profile Name</div>
              </div>
            </div>
          </header>
          <nav id="icon-with-text-demo" className="mdc-drawer__content mdc-list">
            {pages.filter(page => page.type === 'main').map(page => (
              <a key={page.id} onClick={(event) => this.handleLinkClick(event, page.path)} className={page.active ?
                'mdc-list-item mdc-list-item--activated' : 'mdc-list-item'} href={page.path}>
                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">{page.icon}</i>{page.label}
              </a>
            ))}
            <li role="separator" className="mdc-list-divider" />
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
