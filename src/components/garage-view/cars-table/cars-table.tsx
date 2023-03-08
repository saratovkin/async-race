import React from 'react';
import './cars-table.css';

import CarContainer from '../car-container/car-container';
import ICar from '../../../interfaces/ICar'
import IWinner from '../../../interfaces/IWinner'

interface Props {
  cars: ICar[],
  onCarDeleted: (id: number) => void,
  onCarSelected: (id: number) => void,
  onCarFinished: (winner: IWinner) => void,
  onCarReset: () => void,
  isRaceStarted: boolean,
  isRaceReset: boolean,
  isWinnerSaved: boolean,
  raceId: number,
}

interface State {
}

class CarsTable extends React.Component<Props, State> {
  render() {
    const {
      cars, onCarDeleted, onCarSelected, onCarFinished, onCarReset, isRaceStarted, isRaceReset, isWinnerSaved, raceId
    } = this.props;
    return (
      <div className="cars-table">
        <CarContainer
          cars={cars}
          raceId={raceId}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          onCarReset={onCarReset}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          isWinnerSaved={isWinnerSaved}
        />
      </div>
    );
  }
}

export default CarsTable;
