import React from 'react';
import './winners-view.css';

import WinnersCounter from '../winners-counter/winners-counter';
import WinnersTable from '../winners-table/winners-table';
import PageNumber from '../../page-number/page-number';
import Pagination from '../../pagination/pagination';

import IWinner from '../../../interfaces/IWinner';

interface Props {
  winners: IWinner[],
  page: number,
  onPageChanged: (view: string, page: number) => void,
  onSortTypeSelected: (newType: string) => void,
  sortType: string,
  sortDirection: string,
}

interface State {
}

const elementsPerPage = 10;

class WinnersView extends React.Component<Props, State> {

  getDisplayedWinners() {
    const idx = this.props.page * elementsPerPage;
    const winnersOnPage = this.sortWinners(this.props.winners).slice(idx, idx + elementsPerPage);
    return winnersOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.winners.length / elementsPerPage);
  }

  setPage = (pageNum: number) => {
    this.props.onPageChanged('view', pageNum);
  }

  sortWinners = (winners: IWinner[]) => {
    const arr = winners;
    const sortFunc = this.getSortFunc();
    return arr.sort(sortFunc);
  }

  getSortFunc = () => {
    switch (this.props.sortType + this.props.sortDirection) {
      case 'timeAsc':
        return function (a: IWinner, b: IWinner) { return (a.time - b.time) };
      case 'timeDesc':
        return function (a: IWinner, b: IWinner) { return (b.time - a.time) };
      case 'winsAsc':
        return function (a: IWinner, b: IWinner) { return ((a.wins as number) - (b.wins as number)) };
      case 'winsDesc':
        return function (a: IWinner, b: IWinner) { return ((b.wins as number) - (a.wins as number)) };
      default:
        return function (a: IWinner, b: IWinner) { return (a.time - b.time) };
    }
  }

  render() {
    const { page, sortType, sortDirection, onSortTypeSelected } = this.props;
    return (
      <div className="winners-view">
        <WinnersCounter count={this.props.winners.length} />
        <PageNumber pageNum={page} />
        <WinnersTable
          winners={this.getDisplayedWinners()}
          pageNum={page}
          onSortTypeSelected={onSortTypeSelected}
          sortType={sortType}
          sortDirection={sortDirection}
        />
        <Pagination
          pagesAmount={this.getAmountOfPages()}
          pageNum={page}
          onRaceReset={() => { }}
          onPageChanged={this.setPage}
        />
      </div>
    );
  }
}

export default WinnersView;
