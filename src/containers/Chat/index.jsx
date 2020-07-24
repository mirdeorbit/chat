import _ from 'underscore';
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import openSocket from 'socket.io-client';

import AuthHoc from '../../hocs/Auth';

import ChatComponent from '../../components/Chat';

import {
    fetchChats,
    createChat,
    makeSelectChats,
    makeChatsError,
    makeChatsLoading,
} from '../../ducks/chats';

import {
    fetchMessages
} from '../../ducks/messages';

import { makeSelectAuth } from '../../ducks/auth/check';

class ChatContainer extends Component {

    constructor() {
        super();

        this.state = {
            currentChatId: '',
            socket: null
        };

        this.socket = openSocket('http://127.0.0.1:3300');

        this.socket.on('connect', () => {
            console.log('Connection has been established');
        });

        this.socket.on('joinRooms', (data) => {
            console.log('Joined to rooms >>> ', data);
        });

        this.socket.on('message', (data) => {
            console.log('message >>> ', data);
        })

        this.socket.on('connect_error', (err) => {
            throw err;
        });

        this.onParticipantsSubmit = this.onParticipantsSubmit.bind(this);
        this.onChatSelect = this.onChatSelect.bind(this);
    }

    componentDidMount() {
        this.props.fetchChats();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.chats && this.props.chats) {
            this.socket.emit('joinRooms', _(this.props.chats).pluck('_id'));

            this.props.fetchMessages();
        }
    }

    onParticipantsSubmit(data) {
        this.props.createChat(data);
    }

    onChatSelect(chatId) {
        this.setState({
            currentChatId: chatId
        });
    }

    render() {
        const { chats } = this.props;
        const { currentChatId } = this.state;

        return (
            <ChatComponent
                onParticipantsSubmit={this.onParticipantsSubmit}
                chats={chats}
                currentChatId={currentChatId}
                onChatSelect={this.onChatSelect}
                socket={this.socket}
            />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    auth: makeSelectAuth(),
    chats: makeSelectChats(),
    error: makeChatsError(),
    loading: makeChatsLoading()
});

const mapDispatchToProps = {
    fetchChats,
    createChat,
    fetchMessages
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default AuthHoc(withConnect(ChatContainer));