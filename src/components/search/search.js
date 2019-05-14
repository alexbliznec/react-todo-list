import React from "react";

import './search.css';


export default class Search extends React.Component {

    state = {
        term: ''
    }

    onSearchChange = (ev) => {
        const searchInput = ev.target.value;
        this.setState({term: searchInput});
        this.props.onSearchChangeFromApp(searchInput);
    };

    render () {
        return (
            <input
            type="text"
            placeholder="search"
            className="form-control search-input"
            value={this.state.term}
            onChange={this.onSearchChange} />
        );
    }
}
