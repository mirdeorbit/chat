import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';

export class AsyncAutocomplete extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: false,
			options: []
		}
	}

	render() {
		return (
			<AsyncTypeahead
				{...this.props}
				isLoading={this.state.isLoading}
				labelKey={option => `${option.email}`}
				onSearch={(query) => {
					fetch(`${__CONFIG__.api.baseUrl}/users?query=${query}`)
						.then(resp => resp.json())
						.then(json => this.setState({
							options: json
						}));
				}}
				onChange={this.props.onChange}
				options={this.state.options}
			/>
		)
	}
}

AsyncAutocomplete.propTypes = {
	onChange: PropTypes.func.isRequired
}