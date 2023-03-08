import React from 'react';
import './app.css';

import ICar from '../../interfaces/ICar';
import IWinner from '../../interfaces/IWinner';

import Header from '../header/header';
import GarageView from '../garage-view/garage-view/garage-view';
import WinnersView from '../winners-view/winners-view/winners-view';
import Footer from '../footer/footer';

import CarGenerator from '../../misc/carGenerator';
import Loader from '../../loader/loader';

interface State {
  cars: ICar[];
  winners: IWinner[];
  winner: IWinner | undefined;
  view: string;
  currentCar: number | undefined;
  newCarName: string;
  newCarColor: string;
  currentCarName: string;
  currentCarColor: string;
  sortType: string;
  sortDirection: string;
  garagePage: number;
  winnersPage: number;
  raceId: number;
  isRaceStarted: boolean;
  isRaceReset: boolean;
  isWinnerSaved: boolean;
  isError: boolean;
}

class App extends React.Component<Record<string, never>, State> {
  loader: Loader;
  constructor(props: Record<string, never>) {
    super(props);
    this.loader = new Loader();
    this.state = {
      cars: [],
      winners: [],
      winner: undefined,
      view: 'garage',
      currentCar: undefined,
      newCarName: '',
      newCarColor: '#000000',
      currentCarName: '',
      currentCarColor: '#000000',
      sortType: 'wins',
      sortDirection: 'Desc',
      garagePage: 0,
      winnersPage: 0,
      raceId: 0,
      isRaceStarted: false,
      isRaceReset: false,
      isWinnerSaved: false,
      isError: false,
    };
    this.getCars();
    this.getWinners();
  }

  getCars = (): void => {
    this.loader
      .getAllCars()
      .then((data: ICar[] | null) => {
        this.setState(() => ({ cars: data ? data : [] }));
      })
      .catch(() => this.setisError());
  };

  addCar = (name: string, color: string) => {
    this.loader
      .createCar(name, color)
      .then((res: ICar) => {
        this.setState(({ cars }) => {
          const newArr = [...cars, res];
          return { cars: newArr };
        });
      })
      .catch(() => this.setisError());
  };

  selectCar = (id: number) => {
    this.setState(() => ({ currentCar: id }));
  };

  updateCar = (name: string, color: string) => {
    if (this.state.currentCar !== undefined) {
      this.loader
        .updateCar(this.state.currentCar, name, color)
        .then((res: ICar) => {
          if (res) {
            this.setState(({ cars }) => {
              const idx = cars.findIndex((el) => el.id === res.id);
              return { cars: [...cars.slice(0, idx), res, ...cars.slice(idx + 1)], currentCar: undefined };
            });
          }
        })
        .catch(() => this.setisError());
      this.getWinners();
    }
  };

  deleteCar = (id: number) => {
    this.loader
      .deleteCar(id)
      .then(() => {
        this.loader
          .deleteWinner(id)
          .then(() => {
            this.getCars();
            this.getWinners();
          })
          .catch(() => this.setisError());
      })
      .catch(() => this.setisError());
  };

  generateCars = () => {
    const generatedCars = CarGenerator.generateCars();
    generatedCars.forEach((item) => {
      this.addCar(item.name, item.color);
    });
  };

  getWinners = () => {
    const winners = [] as IWinner[];
    this.loader
      .getAllWinners()
      .then((data: IWinner[]) => {
        data.forEach((winner) => {
          this.loader.getCarById(winner.id as number).then((res: ICar) => {
            winners.push({
              id: res.id,
              name: res.name,
              color: res.color,
              wins: winner.wins,
              time: winner.time,
            });
          });
        });
        this.setState(() => ({
          winners: winners,
        }));
      })
      .catch(() => this.setisError());
  };

  updateCount = (): number => this.state.cars.length;

  startRace = () => {
    if (this.state.cars.length !== 0) {
      this.setState(({ raceId }) => {
        const newRaceId = raceId + 1;
        return {
          raceId: newRaceId,
          isRaceStarted: true,
          isRaceReset: false,
          isWinnerSaved: false,
        };
      });
    }
  };

  resetRace = () => {
    if (!this.state.isRaceReset && this.state.cars.length !== 0) {
      this.setState(({ raceId }) => {
        const newRaceId = raceId + 1;
        return {
          raceId: newRaceId,
          isRaceStarted: false,
          isRaceReset: true,
          winner: undefined,
        };
      });
    }
  };

  saveWinner = (winner: IWinner) => {
    if (!this.state.isWinnerSaved && this.state.raceId === winner.raceId) {
      this.setState(() => {
        return {
          isWinnerSaved: true,
          winner: { name: winner.name, time: winner.time },
        };
      });
      this.loader
        .getWinnerById(winner.id as number)
        .then((res) => {
          const newWinner = winner;
          if (res) {
            this.loader.updateWinner(
              winner.id as number,
              res.wins + 1,
              +res.time > +winner.time ? winner.time : res.time
            );
            newWinner.wins = res.wins + 1;
            newWinner.time = +res.time > +winner.time ? winner.time : res.time;
            this.setState(({ winners }) => {
              const idx = winners.findIndex((el) => el.id === newWinner.id);
              return {
                winners: [...winners.slice(0, idx), newWinner, ...winners.slice(idx + 1)],
              };
            });
          } else {
            this.loader.createWinner(winner.id as number, 1, winner.time);
            newWinner.wins = 1;
            this.setState(({ winners }) => ({
              winners: [...winners, newWinner],
            }));
          }
        })
        .catch(() => this.setisError());
    }
  };

  setViewPage = (view: string, page: number) => {
    if (view === 'garage') {
      this.setState(() => ({ garagePage: page }));
    } else {
      this.setState(() => ({ winnersPage: page }));
    }
  };

  changeView = (view: string) => {
    this.resetRace();
    this.setState(() => ({ view: view }));
  };

  setSpecs = (type: string, key: string, value: string) => {
    if (type === 'current') {
      if (key === 'Name') {
        this.setState(() => ({ currentCarName: value }));
      }
      if (key === 'Color') {
        this.setState(() => ({ currentCarColor: value }));
      }
    }
    if (type === 'new') {
      if (key === 'Name') {
        this.setState(() => ({ newCarName: value }));
      }
      if (key === 'Color') {
        this.setState(() => ({ newCarColor: value }));
      }
    }
  };

  setSortType = (newType: string) => {
    this.setState(({ sortDirection }) => {
      return { sortType: newType, sortDirection: sortDirection === 'Desc' ? 'Asc' : 'Desc' };
    });
  };

  setisError = () => {
    this.setState(() => ({
      isError: true,
    }));
  };

  render() {
    if (this.state.isError) {
      return (
        <div className="main-container">
          <Header view={this.state.view} changeView={this.changeView} />
          <div className="error-message">
            <p>Unfortunately, an error has occurred. </p>
            <p>
              This is most likely due to the fact that the application could not find the server and you need to start
              it on your device.
            </p>
            <a href="https://github.com/saratovkin/async-race/blob/main/README.md">See more about server side</a>
            <p>
              If you sure that server is working correctly and still recieve this message, please contact{' '}
              <a href="https://github.com/saratovkin">me</a>.
            </p>
          </div>
          <Footer />
        </div>
      );
    }
    const garageView = (
      <GarageView
        cars={this.state.cars}
        raceId={this.state.raceId}
        winner={this.state.winner}
        page={this.state.garagePage}
        currentName={this.state.currentCarName}
        currentColor={this.state.currentCarColor}
        newName={this.state.newCarName}
        newColor={this.state.newCarColor}
        isRaceStarted={this.state.isRaceStarted}
        isRaceReset={this.state.isRaceReset}
        isWinnerSaved={this.state.isWinnerSaved}
        onSpecsInput={this.setSpecs}
        onPageChanged={this.setViewPage}
        onCarDeleted={this.deleteCar}
        onCarAdded={this.addCar}
        onCarUpdated={this.updateCar}
        onCountUpdated={this.updateCount}
        onCarsGenerated={this.generateCars}
        onCarSelected={this.selectCar}
        onCarFinished={this.saveWinner}
        onRaceStart={this.startRace}
        onRaceReset={this.resetRace}
      />
    );

    const winnersView = (
      <WinnersView
        winners={this.state.winners}
        page={this.state.winnersPage}
        onPageChanged={this.setViewPage}
        onSortTypeSelected={this.setSortType}
        sortType={this.state.sortType}
        sortDirection={this.state.sortDirection}
      />
    );

    const view = this.state.view === 'garage' ? garageView : winnersView;

    return (
      <div className="main-container">
        <Header view={this.state.view} changeView={this.changeView} />
        {view}
        <Footer />
      </div>
    );
  }
}

export default App;
