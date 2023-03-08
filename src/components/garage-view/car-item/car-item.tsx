import React from 'react';
import './car-item.css';

import Loader from '../../../loader/loader';
import IWinner from '../../../interfaces/IWinner';

interface IRes {
  velocity: number;
  distance: number;
}

interface Props {
  id: number;
  color: string;
  name: string;
  onCarDeleted: (id: number) => void;
  onCarSelected: (id: number) => void;
  onCarFinished: (winner: IWinner) => void;
  onCarReset: () => void;
  isRaceStarted: boolean;
  isRaceReset: boolean;
  isWinnerSaved: boolean;
  raceId: number;
}

interface State {
  isEngineStarted: boolean;
  isDriving: boolean;
  isStopped: boolean;
  isBroken: boolean;
  isRacer: boolean;
  animationDuration: number | undefined;
  startDelay: number | undefined;
}

const msToSeconds = 1000;
const amountOfDigits = 2;
const brokeStatus = 500;

class CarItem extends React.Component<Props, State> {
  public loader: Loader;

  constructor(props: Props) {
    super(props);
    this.state = {
      isEngineStarted: false,
      isDriving: false,
      isStopped: true,
      isBroken: false,
      isRacer: false,
      animationDuration: undefined,
      startDelay: undefined,
    };
    this.loader = new Loader();
  }

  startCar = (id: number) => {
    if (!this.state.isEngineStarted) {
      if (!this.props.isRaceStarted) {
        this.setState(() => ({ isEngineStarted: true }));
      } else {
        this.setState(() => ({ isRacer: true }));
      }
      const startTime = Date.now();
      this.loader.toggleEngine(id, 'started', this.props.raceId).then((res: IRes) => {
        const endTime = Date.now();
        const time = res.distance / res.velocity;
        this.setState(() => ({
          isDriving: true,
          isStopped: false,
          isEngineStarted: true,
          animationDuration: time,
          startDelay: endTime - startTime,
        }));
        this.startDriveMode(id);
      });
    }
  };

  startDriveMode = (id: number) => {
    if (!this.state.isStopped) {
      this.loader.toggleDriveMode(id, this.props.raceId).then((res) => {
        if (res.success && res.raceId === this.props.raceId && this.state.isRacer) {
          this.props.onCarFinished({
            id,
            color: this.props.color,
            name: this.props.name,
            time: +(
              ((this.state.animationDuration as number) + (this.state.startDelay as number)) /
              msToSeconds
            ).toFixed(amountOfDigits),
            raceId: res.raceId,
          });
        }
        if (res.status === brokeStatus && this.state.isDriving) {
          this.setState(() => {
            return { isBroken: true };
          });
        }
      });
    }
  };

  resetCar = (id: number) => {
    if (!this.state.isStopped) {
      this.setState(() => ({ isStopped: true }));
      this.loader.toggleEngine(id, 'stopped', this.props.raceId).then(() => {
        if (this.state.isRacer) {
          this.props.onCarReset();
        }
        this.setState(() => ({
          isEngineStarted: false,
          isDriving: false,
          isStopped: true,
          isBroken: false,
          animationDuration: undefined,
          startDelay: undefined,
          isRacer: false,
        }));
      });
    }
  };

  render() {
    const { id, color, name, onCarSelected, onCarDeleted } = this.props;
    let carIconClassName = 'car-icon';
    let fireIconClassName = 'fire-icon';
    if (this.state.isDriving) {
      carIconClassName += ' animated';
    }
    if (this.state.isBroken) {
      carIconClassName += ' broken';
      fireIconClassName += ' visible';
    }

    return (
      <li className="car-item">
        <div className="car-buttons">
          <button className={this.state.isRacer ? 'blocked' : ''} onClick={() => onCarSelected(id)}>
            Select
          </button>
          <button className={this.state.isRacer ? 'blocked' : ''} onClick={() => onCarDeleted(id)}>
            Remove
          </button>
          <span className="car-name">{name}</span>
        </div>
        <div className="car-buttons">
          <button
            className={this.state.isEngineStarted || this.state.isRacer ? 'blocked' : ''}
            onClick={() => this.startCar(id)}
          >
            Start
          </button>
          <button className={this.state.isStopped ? 'blocked' : ''} onClick={() => this.resetCar(id)}>
            Reset
          </button>
        </div>
        <svg
          style={
            this.state.isDriving
              ? {
                  animationDuration: `${(this.state.animationDuration as number) / msToSeconds}s`,
                  animationPlayState: `${this.state.isBroken ? 'paused' : 'running'}`,
                }
              : {}
          }
          className={carIconClassName}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill={color}
        >
          {' '}
          <svg
            className={fireIconClassName}
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <rect fill="none" height="24" width="24" y="0" />
            </g>
            <g>
              <path d="M19.48,12.35c-1.57-4.08-7.16-4.3-5.81-10.23c0.1-0.44-0.37-0.78-0.75-0.55C9.29,3.71,6.68,8,8.87,13.62 c0.18,0.46-0.36,0.89-0.75,0.59c-1.81-1.37-2-3.34-1.84-4.75c0.06-0.52-0.62-0.77-0.91-0.34C4.69,10.16,4,11.84,4,14.37 c0.38,5.6,5.11,7.32,6.81,7.54c2.43,0.31,5.06-0.14,6.95-1.87C19.84,18.11,20.6,15.03,19.48,12.35z M10.2,17.38 c1.44-0.35,2.18-1.39,2.38-2.31c0.33-1.43-0.96-2.83-0.09-5.09c0.33,1.87,3.27,3.04,3.27,5.08C15.84,17.59,13.1,19.76,10.2,17.38z" />
            </g>
          </svg>
          <g display="none">
            <rect display="inline" fill="none" height="24" width="24" y="0" />
          </g>
          <g>
            <g>
              <path d="M18.75,10.08L17.4,6.05C17,4.82,15.85,4,14.56,4H9.44C8.15,4,7,4.82,6.6,6.05L5.81,8.4L4.41,7l0.29-0.29 c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-2,2c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L3,8.41 l1.79,1.79C3.18,10.72,2,12.22,2,14c0,1.49,0.83,2.78,2.05,3.47C4.27,18.9,5.51,20,7,20c1.3,0,2.4-0.84,2.82-2h4.37 c0.41,1.16,1.51,2,2.82,2c1.49,0,2.73-1.1,2.95-2.53C21.17,16.78,22,15.49,22,14C22,12.05,20.6,10.43,18.75,10.08z M13,6h1.56 c0.43,0,0.81,0.27,0.95,0.68L16.61,10H13V6z M8.49,6.68C8.63,6.27,9.01,6,9.44,6H11v4H7.41L7.39,9.98L8.49,6.68z M7,18 c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S7.55,18,7,18z M17,18c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S17.55,18,17,18z M19.49,15.32C18.95,14.53,18.03,14,17,14c-1.3,0-2.4,0.84-2.82,2H9.82C9.4,14.84,8.3,14,7,14c-1.03,0-1.95,0.53-2.49,1.32 C4.2,14.97,4,14.51,4,14c0-1.1,0.9-2,2-2h12c1.1,0,2,0.9,2,2C20,14.51,19.8,14.97,19.49,15.32z" />
            </g>
          </g>
        </svg>
      </li>
    );
  }

  componentDidUpdate(prevProps: Props) {
    const { id, isRaceStarted, isRaceReset } = this.props;
    if (!prevProps.isRaceStarted && isRaceStarted) {
      this.startCar(id);
    }
    if (isRaceReset && this.state.isRacer) {
      this.resetCar(id);
    }
  }

  componentWillUnmount() {
    this.loader.toggleEngine(this.props.id, 'stopped', 0);
  }
}

export default CarItem;
