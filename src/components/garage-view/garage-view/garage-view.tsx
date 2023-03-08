import './garage-view.css';
import React from 'react';

import CarsCounter from '../cars-counter/cars-counter';
import CreateCar from '../car-forms/create-car';
import UpdateCar from '../car-forms/update-car';
import GarageControls from '../garage-controls/garage-controls';
import CarsTable from '../cars-table/cars-table';
import WinnerAlert from '../winner-alert/winner-alert';
import PageNumber from '../../page-number/page-number';
import Pagination from '../../pagination/pagination';

import ICar from '../../../interfaces/ICar';
import IWinner from '../../../interfaces/IWinner';

const elementsPerPage = 7;

interface Props {
  cars: ICar[],
  page: number,
  currentName: string,
  currentColor: string,
  newName: string,
  newColor: string,
  winner: IWinner | undefined,
  onPageChanged: (view: string, page: number) => void,
  onSpecsInput: (type: string, key: string, value: string) => void,
  onCarsGenerated: () => void,
  onCarDeleted: (id: number) => void,
  onCarAdded: (name: string, color: string) => void,
  onCarUpdated: (name: string, color: string) => void,
  onCarFinished: (winner: IWinner) => void,
  onCarSelected: (id: number) => void,
  onCountUpdated: () => number,
  onRaceStart: () => void,
  onRaceReset: () => void,
  isRaceStarted: boolean,
  isRaceReset: boolean,
  isWinnerSaved: boolean,
  raceId: number
}

interface State {
  resets: number,
}

class GarageView extends React.Component<Props, State>{

  public carsAmount: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      resets: 0,
    }
    this.carsAmount = 0;
  }

  awaitReset = () => {
    this.setState(({ resets }) => {
      const newResets = resets + 1;
      return { resets: newResets };
    });
  };

  clearResets = () => {
    this.setState(() => {
      return { resets: 0 };
    });
  };

  isStartPossible = () => {
    if (this.props.cars.length === 0) {
      return false;
    }
    if (!this.props.isRaceStarted && !this.props.isRaceReset) {
      return true;
    }
    if (this.props.isRaceReset && this.state.resets === this.carsAmount) {
      return true;
    }
    return false;
  }

  getDisplayedCars() {
    const idx = this.props.page * elementsPerPage;
    const carsOnPage = this.props.cars.slice(idx, idx + elementsPerPage);
    this.carsAmount = carsOnPage.length;
    return carsOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.cars.length / elementsPerPage);
  }

  setPage = (pageNum: number) => {
    this.props.onPageChanged('garage', pageNum);
  }

  render() {
    const { page, winner,
      currentName, currentColor,
      newName, newColor,
      onSpecsInput, onCarsGenerated,
      onCarDeleted, onCarAdded,
      onCarUpdated, onCarFinished,
      onCarSelected, onCountUpdated,
      onRaceStart, onRaceReset,
      isRaceStarted, isRaceReset,
      isWinnerSaved, raceId
    } = this.props;

    const alert = winner ? <WinnerAlert winner={winner} onRaceReset={onRaceReset}/> : null;

    return (
      <div className="garage-view">
        {alert}
        <CarsCounter
          onCountUpdated={onCountUpdated}
        />
        <PageNumber
          pageNum={page}
        />
        <CreateCar
          newName={newName}
          newColor={newColor}
          onSpecsInput={onSpecsInput}
          onCarAdded={onCarAdded}
        />
        <UpdateCar
          currentName={currentName}
          currentColor={currentColor}
          onSpecsInput={onSpecsInput}
          onCarUpdated={onCarUpdated}
        />
        <GarageControls
          isRaceStarted={isRaceStarted}
          isWinnerSaved={isWinnerSaved}
          isStartPossible={this.isStartPossible()}
          onRaceStart={() => { onRaceStart(); this.clearResets(); }}
          onRaceReset={onRaceReset}
          onCarsGenerated={onCarsGenerated}

        />
        <CarsTable
          raceId={raceId}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          isWinnerSaved={isWinnerSaved}
          cars={this.getDisplayedCars()}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          onCarReset={this.awaitReset}

        />
        <Pagination
          pageNum={page}
          isRaceStarted={isRaceStarted}
          isWinnerSaved={isWinnerSaved}
          pagesAmount={this.getAmountOfPages()}
          onPageChanged={this.setPage}
          onRaceReset={onRaceReset}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.cars.length !== prevProps.cars.length) {
      this.setState(() => {
        return { resets: this.carsAmount };
      });
    }
  }
}

export default GarageView;
