import React from 'react';
import './winners-counter.css';

interface Props {
  count: number,
}

interface State {

}

class WinnersCounter extends React.Component<Props, State> {
  render() {
    return (
      <div className="winners-counter">
        <span>Winners</span>
        <span>
          (
          {this.props.count}
          )
        </span>
      </div>
    );
  }
}

export default WinnersCounter;
