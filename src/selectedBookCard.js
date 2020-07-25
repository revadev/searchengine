import React, { Component } from "react";

class SelectedBookCard extends Component {
  render() {
    let { bookdata } = this.props;
    return (
      <div className="cardSection">
        <div className='cardHeader'>
          <div className='cardTitle'>{bookdata.title}</div>
          <div className='cardExtra'>-By {bookdata.author}</div>
        </div>
        <div className='cardBody'>{bookdata.summary}</div>
      </div>
    );
  }
}
export default SelectedBookCard;
