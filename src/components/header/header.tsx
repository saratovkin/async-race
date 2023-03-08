import React from 'react';

import './header.css';

import Navigation from './navigation';

interface Props {
  changeView: (view: string) => void,
  view: string,
}

class Header extends React.Component<Props, Record<string, never>> {
  render() {
    return (
      <header className="header">
        <div className="header-container">
          <div className="page-title">
            <div className="page-icon" />
            <h1 className="page-name">Async Race</h1>
          </div>
          <Navigation
            view={this.props.view}
            changeView={this.props.changeView}
          />
        </div>
      </header>
    );
  }
}

export default Header;
