import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { InputGroup, Row, Button, Form } from 'react-bootstrap';
import { object, string, array } from 'yup';

import { AsyncAutocomplete } from '../form/AsyncAutocomplete';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const ChatPartnerSearchComponent = ({ onSubmit }) => {
	const schema = object({
		title: string().required('Chat name is required'),
		participants: array().required('Participants is required').min(1)
	});

	return (
		<Row className="mb-5">
			<Formik
				initialValues={{}}
				validationSchema={schema}
				onSubmit={(values, actions) => {
					onSubmit(values);
					actions.setSubmitting(false);
				}}
			>{({
					handleSubmit,
					handleChange,
					values,
					touched,
					errors,
					setFieldValue,
					setFieldTouched
				}) => (
					<Form style={{width: '100%'}} onSubmit={handleSubmit}>
						<Form.Group controlId="chat-name">
							<Form.Label>Chat name</Form.Label>
							<Form.Control
								type='text'
								name='title'
								placeholder='Enter chat name'
								onChange={handleChange}
								value={values.title || ''}
								isValid={touched.title && !errors.title}
								isInvalid={!!errors.title}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.title}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label>Participants</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="email-search">@</InputGroup.Text>
								</InputGroup.Prepend>
								<AsyncAutocomplete
									id='participants'
									name='participants'
									multiple
									onChange={(selected) => {
										const value = _(selected).pluck('_id');
										setFieldValue('participants', value);
									}}
									onBlur={() => setFieldTouched('participants', true)}
									isValid={touched.participants && !errors.participants}
									isInvalid={!!errors.participants}
								/>
							</InputGroup>

							<Form.Control.Feedback type="invalid">
								{errors.participants}
							</Form.Control.Feedback>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
						>
							Create chat
						</Button>
					</Form>
				)}
			</Formik>
		</Row>
	)
}

ChatPartnerSearchComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default ChatPartnerSearchComponent;