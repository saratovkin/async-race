import React from 'react';
import './winners-counter.css';

interface Props {
  count: number;
}

class WinnersCounter extends React.Component<Props, Record<string, never>> {
  render() {
    return (
      <div className="winners-counter">
        <span>Winners</span>
        <span>({this.props.count})</span>
      </div>
    );
  }
}

export default WinnersCounter;
