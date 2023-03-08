import React from 'react';
import './cars-counter.css';

interface Props {
  onCountUpdated: () => number,
}

interface State {
}

class CarsCounter extends React.Component<Props, State> {
  render() {
    return (
      <div className="cars-counter">
        <span>Garage</span>
        <span>
          (
          {this.props.onCountUpdated()}
          )
        </span>
      </div>
    );
  }
}

export default CarsCounter;
