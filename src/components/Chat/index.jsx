import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import ChatPartnerSearch from '../../containers/Chat/PartnerSearch';

import ChatMessages from '../../containers/Chat/Messages';

import ChatList from './List';

const ChatComponent = ({ chats = [], onParticipantsSubmit, currentChatId, onChatSelect, socket }) => {

	return (
		<>
			<ChatPartnerSearch
				onSubmit={onParticipantsSubmit}
			/>
			<Row style={{'height': '65vh', borderTop: '1px solid #ccc'}}>
				<Col
					xs={2}
					style={{borderRight: '1px solid #ccc', padding: 0}}
				>
					{(!chats || !chats.length) && (
						<h3>No chats</h3>
					)}

					<ChatList
						chats={chats}
						onClick={onChatSelect}
						currentChatId={currentChatId}
					/>
				</Col>

				{currentChatId && (
					<ChatMessages
						currentChatId={currentChatId}
						socket={socket}
					/>
				)}

			</Row>
		</>
	)
};

ChatComponent.propTypes = {
	chats: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		participants: PropTypes.arrayOf(PropTypes.string).isRequired
	})),
	onParticipantsSubmit: PropTypes.func.isRequired,
	onChatSelect: PropTypes.func.isRequired,
	currentChatId: PropTypes.string
};

ChatComponent.defaultProps = {
	currentChatId: ''
};

export default ChatComponent;