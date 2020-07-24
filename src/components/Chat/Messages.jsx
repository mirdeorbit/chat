import React from 'react';
import { Button, Col, Form, Row, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const ChatMessagesComponent = ({ messages, currentChatId, onSubmit }) => {

	const liStyles = {
		width: '100%',
		minHeight: '40px',
		backgroundColor: '#00EE0033',
		marginBottom: '10px',
		padding: '5px'
	}

	messages = messages.filter(message => message.chatId === currentChatId);

	messages = messages.map((message) => {
		return <ListGroup.Item key={message._id}>{message.text}</ListGroup.Item>
	});

	return (
		<Col xs={10}>
			<ListGroup style={{height: '30vh', overflow: 'scroll'}}>
				{messages}
			</ListGroup>

			<Row style={{position: 'absolute', bottom: 0, marginLeft: '20px', width: '100%'}}>
				<Formik
					initialValues={{}}
					onSubmit={(values, actions) => {
						onSubmit(values);
						actions.setSubmitting(false);
					}}
				>{({
					   handleSubmit,
					   handleChange,
					   values
				   }) => (
						<Form style={{width: '100%'}} onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Enter your message</Form.Label>
								<Form.Control
									as="textarea"
									rows="3"
									name='text'
									onChange={handleChange}
									value={values.text || ''}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</Row>
		</Col>
	)
}

ChatMessagesComponent.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	currentChatId: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default ChatMessagesComponent;