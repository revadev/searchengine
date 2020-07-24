import React, { Component } from "react";

class SelectedBookCard extends Component {
  render() {
    let { bookdata } = this.props;
    return <div> {bookdata.title}</div>;
  }
}
export default SelectedBookCard;
