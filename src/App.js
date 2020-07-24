import React, { Component } from "react";
import fetchDataMatch from "./util";
import data from "./data.json";
import "./App.css";
import SelectedBookCard from "./selectedBookCard";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      suggestedrecords: [],
      selectedBooks: [],
    };
    this.handleSuggestion = this.handleSuggestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleSuggestion(e) {
    this.setState({ inputVal: e.target.value });
    let queryString = e.target.value,
      optionList,
      result;
    if (queryString.length > 3) {
      result = fetchDataMatch(queryString, data);
      if (result.length > 0) {
        optionList = (
          <div id='mylist' className='autocomplete-items'>
            {result.map((option, index) => (
              <div
                key={index}
                className='items'
                onClick={() => this.handleClick(option)}>
                {option.title}
              </div>
            ))}
          </div>
        );
      }
      this.setState({ suggestedrecords: optionList });
    }
  }

  handleClick(option) {
    this.setState({
      selectedBooks: [...this.state.selectedBooks, option],
      suggestedrecords: [],
      inputVal: "",
    });

    console.log("handleClick" + option);
  }
  render() {
    let { inputVal, selectedBooks } = this.state;
    return (
      <div className='App'>
        <div className='autocomplete'>
          <input
            id='myInput'
            type='text'
            placeholder='Search Books here'
            value={inputVal}
            onChange={this.handleSuggestion}
          />
          {this.state.suggestedrecords}
        </div>
        <input type='submit' onClick={this.handleClick}></input>
        {selectedBooks.length > 0 && (
          <div className='container'>
            {selectedBooks.map((option, index) => (
              <SelectedBookCard bookdata={option} key={"book-" + index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
