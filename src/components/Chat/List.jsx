import React from 'react';

const ChatListComponent = ({ chats, onClick, currentChatId }) => {
	const liStyles = {
		backgroundColor: '#ddd',
		cursor: 'pointer',
		padding: 10
	};

	const listItems = chats.map((chat) => {

		const styles = {};

		if (currentChatId === chat._id) {
			styles.backgroundColor = '#0000ff';
			styles.color = 'white';
		}

		return (<li
			key={chat._id}
			style={{...liStyles, ...styles}}
			onClick={() => onClick(chat._id)}
		>
			{chat.title}
		</li>)
	});
	return (
		<ul style={{listStyleType: 'none', padding: 0}}>{listItems}</ul>
	);
}

export default ChatListComponent;