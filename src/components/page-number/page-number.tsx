import React from 'react';
import './page-number.css';

interface State {

}

interface Props {
  pageNum: number,
}

class PageNumber extends React.Component<Props,State> {
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
