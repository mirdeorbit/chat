import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ChatMessagesComponent from '../../components/Chat/Messages';

import {
	appendMessage,
	makeSelectMessages,
	makeMessagesError,
	makeMessagesLoading
} from '../../ducks/messages';

class ChatMessages extends Component {

	static propTypes = {
		currentChatId: PropTypes.string.isRequired,
		messages: PropTypes.arrayOf(PropTypes.shape({})),
		socket: PropTypes.shape({})
	}

	static defaultProps = {
		messages: []
	}

	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data) {
		const { socket, currentChatId } = this.props;

		const token = localStorage.getItem('currentUserToken');

		if (data.text && token) {
			socket.emit('message', {
				chatId: currentChatId,
				text: data.text,
				token: token
			});
		}
	}

	render() {
		return <ChatMessagesComponent
			messages={this.props.messages}
			currentChatId={this.props.currentChatId}
			onSubmit={this.onSubmit}
		/>
	}
}

const mapStateToProps = createStructuredSelector({
	messages: makeSelectMessages(),
	loading: makeMessagesLoading(),
	error: makeMessagesError()
});

const mapDispatchToProps = {
	appendMessage
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withConnect(ChatMessages);