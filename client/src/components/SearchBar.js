import React from "react";
// import Async, { makeAsyncSelect } from 'react-select/async';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';

import bingAutosuggest from "../api/bingAutosuggest";


class SearchBar extends React.Component {


    handleChange = (selectedOption) => {
        this.props.onSearch(selectedOption.value);
    };

    handleSearchChange = async (input) => {
        console.log('check');
        this.props.onInputSearchBar();
        if(input.length === 0) {
        } else {
            try {
                let res = await bingAutosuggest.get('', {params: {q: input}});
                if (res.status === 200) {
                    const response = JSON.parse(res.request.response);
                    const suggestions = response['suggestionGroups'][0]['searchSuggestions'];
                    let results = suggestions.map((result) => ({label: result.displayText, value: result.displayText}));
                    console.log(results);
                    return results;
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    render() {
        return(
            <AsyncSelect
                placeholder={'Enter keyword ..'}
                defaultOptions={{label: 'No Match', value: 'No Match'}}
                value={this.props.searchValue}
                noOptionsMessage={() => <span>No Match</span>}
                cacheOptions
                loadOptions={_.debounce(this.handleSearchChange, 800, {leading: true})}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
            />
        );
    }
}

export default SearchBar;