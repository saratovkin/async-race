import React from 'react';
import './garage-controls.css';

interface Props {
  onRaceStart: () => void;
  onRaceReset: () => void;
  onCarsGenerated: () => void;
  isRaceStarted: boolean;
  isStartPossible: boolean;
  isWinnerSaved: boolean;
}

class GarageControls extends React.Component<Props, Record<string, never>> {
  render() {
    const { onRaceStart, onRaceReset, onCarsGenerated, isRaceStarted, isStartPossible } = this.props;
    return (
      <div className="garage-controls">
        <button
          className={isStartPossible ? 'race-btn' : 'race-btn blocked'}
          onClick={() => {
            onRaceStart();
          }}
        >
          Race
        </button>
        <button
          className={isRaceStarted ? 'race-btn' : 'race-btn blocked'}
          onClick={() => {
            onRaceReset();
          }}
        >
          Reset
        </button>
        <button className="generate-btn" onClick={onCarsGenerated}>
          Generate Cars
        </button>
      </div>
    );
  }
}

export default GarageControls;
