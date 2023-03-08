import './winner-alert.css';
import React from 'react';

import IWinner from '../../../interfaces/IWinner';

interface Props {
  winner: IWinner | undefined;
  onRaceReset: () => void;
}

class WinnerAlert extends React.Component<Props, Record<string, never>> {
  render() {
    const { winner, onRaceReset } = this.props;
    return (
      <div className="winner-alert">
        <span>{`Winner is ${(winner as IWinner).name}!`}</span>
        <span>{`Time is ${(winner as IWinner).time}s`}</span>
        <span className="close-modal" onClick={onRaceReset}>
          x
        </span>
      </div>
    );
  }
}

export default WinnerAlert;
