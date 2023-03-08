import React from 'react';
import './page-number.css';

interface Props {
  pageNum: number;
}

class PageNumber extends React.Component<Props, Record<string, never>> {
  render() {
    return (
      <div className="page-number">
        <span>Page</span>
        <span>{this.props.pageNum + 1}</span>
      </div>
    );
  }
}

export default PageNumber;
