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
      suggestionNumber: 3,
      suggestedrecords: [],
      selectedBooks: [],
    };
  }

  handleNumChange = (e) => {
    this.setState({ suggestionNumber: e.target.value });
  };

  handleSuggestion = (e) => {
    this.setState({ inputVal: e.target.value });
    let queryString = e.target.value,
      optionList,
      result;
    if (queryString.length > 3) {
      result = fetchDataMatch(queryString, data, this.state.suggestionNumber,this.state.selectedBooks);
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
  };

  handleClick = (option) => {
    this.setState({
      selectedBooks: [...this.state.selectedBooks, option],
      suggestedrecords: [],
      inputVal: "",
    });
  };
  render() {
    let { inputVal, selectedBooks } = this.state;
    return (
      <div className='App'>
        <div className='autocomplete'>
          <input
            id='myInput'
            type='text'
            placeholder='Search and Add Books from here'
            value={inputVal}
            onChange={this.handleSuggestion}
          />
          {this.state.suggestedrecords}
        </div>
        <input
          type='number'
          value={this.state.suggestionNumber}
          onChange={this.handleNumChange} ></input>
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
