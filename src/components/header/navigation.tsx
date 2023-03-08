import React from 'react';

import NavBtn from './nav-btn';

interface Props {
  changeView: (view: string) => void,
  view: string,
}

class Navigation extends React.Component<Props, Record<string, never>> {
  views = ['garage', 'winners'];

  render() {
    const navBtns = this.views.map((view) => {
      const isActive = this.props.view === view;
      const className: string = isActive ? 'nav-button active' : 'nav-button';
      return (
        <NavBtn
          key={view}
          view={view}
          className={className}
          changeView={this.props.changeView}
        />
      );
    });
    return (
      <div className="page-navigation">
        {navBtns}
      </div>
    );
  }
}

export default Navigation;
