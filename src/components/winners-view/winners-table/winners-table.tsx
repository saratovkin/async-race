import React from 'react';
import './winners-table.css';

import WinnersContainer from '../winners-container/winners-container';
import IWinner from '../../../interfaces/IWinner';

interface Props {
  winners: IWinner[];
  pageNum: number;
  onSortTypeSelected: (newType: string) => void;
  sortType: string;
  sortDirection: string;
}

class WinnersTable extends React.Component<Props, Record<string, never>> {
  render() {
    const { winners, pageNum, onSortTypeSelected, sortType, sortDirection } = this.props;
    const arrow = sortDirection === 'Asc' ? '↑' : '↓';
    const winsTitle = `Wins ${sortType === 'wins' ? arrow : ''}`;
    const timeTitle = `Best Time ${sortType === 'time' ? arrow : ''}`;

    return (
      <div className="winners-table">
        <div className="table-row">
          <span>Number</span>
          <span>Car</span>
          <span>Name</span>
          <span className="sort-select" role="button" tabIndex={0} onClick={() => onSortTypeSelected('wins')}>
            {winsTitle}
          </span>
          <span className="sort-select" role="button" tabIndex={0} onClick={() => onSortTypeSelected('time')}>
            {timeTitle}
          </span>
        </div>
        <WinnersContainer winners={winners} pageNum={pageNum} />
      </div>
    );
  }
}

export default WinnersTable;
