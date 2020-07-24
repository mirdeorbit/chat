import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ChatPartnerSearchComponent from '../../components/Chat/PartnerSearch';

class ChatPartnerSearchContainer extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired
	}

	constructor() {
		super();

		this.onParticipantsChatSubmit = this.onParticipantsChatSubmit.bind(this);
	}

	onParticipantsChatSubmit(data) {
		this.props.onSubmit(data);
	}

	render() {
		return (
			<ChatPartnerSearchComponent
				onSubmit={this.onParticipantsChatSubmit}
			/>
		)
	}
}

export default ChatPartnerSearchContainer;