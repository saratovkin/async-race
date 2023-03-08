import React from 'react';
import './pagination.css';

interface Props {
  pagesAmount: number;
  pageNum: number;
  isRaceStarted?: boolean;
  isWinnerSaved?: boolean;
  onPageChanged: (index: number) => void;
  onRaceReset?: () => void;
}

class Pagination extends React.Component<Props, never> {
  render() {
    const { pagesAmount, onPageChanged, pageNum, isRaceStarted, isWinnerSaved } = this.props;
    let blockedClass = '';
    if (isRaceStarted) {
      if (!isWinnerSaved) {
        blockedClass = ' blocked';
      }
    }
    const paginationButtons = Array(pagesAmount)
      .fill(0)
      .map((item: number, index: number) => (
        <span
          role="button"
          tabIndex={0}
          className={(pageNum === index ? 'pag-btn active' : 'pag-btn') + blockedClass}
          key={index}
          onClick={() => {
            onPageChanged(index);
            window.scrollTo(0, 0);
          }}
          onKeyDown={() => {
            onPageChanged(index);
            window.scrollTo(0, 0);
          }}
        >
          {index + 1}
        </span>
      ));
    return <div className="pagination">{paginationButtons}</div>;
  }
}

export default Pagination;
