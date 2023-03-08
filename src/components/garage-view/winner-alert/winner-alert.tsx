import './winner-alert.css';
import React from 'react';

import IWinner from '../../../interfaces/IWinner';

interface State {

}

interface Props {
  winner: IWinner | undefined;
}

class WinnerAlert extends React.Component<Props, State> {
  render() {
    const { winner } = this.props;
    return (
      <div className="winner-alert">
        <span>{`Winner is ${(winner as IWinner).name}!`}</span>
        <span>{`Time is ${(winner as IWinner).time}s`}</span>
      </div>
    );
  }
}

export default WinnerAlert;
