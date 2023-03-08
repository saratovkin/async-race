import React from 'react';
import './car-container.css';

import CarItem from '../car-item/car-item';
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

class CarContainer extends React.Component<Props, State> {
  render() {
    const {
      cars, onCarDeleted, onCarSelected, onCarFinished, onCarReset, isRaceStarted, isRaceReset, isWinnerSaved, raceId
    } = this.props;
    const carElements = cars.map((item) => {
      const { id } = item;
      return (
        <CarItem
          {...item}
          key={id}
          raceId={raceId}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          isWinnerSaved={isWinnerSaved}
          onCarSelected={onCarSelected}
          onCarDeleted={() => onCarDeleted(id)}
          onCarFinished={onCarFinished}
          onCarReset={onCarReset}
        />
      );
    });
    return carElements;
  }
}

export default CarContainer;
