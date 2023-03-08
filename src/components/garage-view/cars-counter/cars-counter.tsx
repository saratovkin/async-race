import React from 'react';
import './cars-counter.css';

interface Props {
  onCountUpdated: () => number,
}


class CarsCounter extends React.Component<Props, Record<string, never>> {
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
