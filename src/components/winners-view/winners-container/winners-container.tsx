import React from 'react';
import './winners-container.css';

import WinnersItem from '../winners-item/winners-item';
import IWinner from '../../../interfaces/IWinner';

interface Props {
  winners: IWinner[],
  pageNum: number,
}

const elementsPerPage = 10;

class WinnersContainer extends React.Component<Props, Record<string, never>> {
  render() {
    const { winners, pageNum } = this.props;
    const winnersElements = winners.map((item, index) => {
      const { color, name, wins, time, id } = item;
      return (
        <WinnersItem
          color={color as string}
          name={name}
          wins={wins as number}
          time={time}
          key={id}
          index={index + pageNum * elementsPerPage}
        />
      );
    });
    return winnersElements;
  }
}

export default WinnersContainer;
