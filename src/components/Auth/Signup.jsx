import React from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { string, object, ref } from 'yup';

const Signup = ({ onSubmit }) => {
	const schema = object({
		email: string().email().required('Email is required'),
		password: string().min(6).required('Password is required'),
		passwordRepeat: string()
			.oneOf([ref('password'), null], 'Password don\'t match')
			.required('Password confirm is required')
	});

	return (
		<Row className='justify-content-md-center'>
			<Col sm={4}>
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
					   errors
				   }) => (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								name='email'
								value={values.email || ''}
								onChange={handleChange}
								isValid={touched.email && !errors.email}
								isInvalid={!!errors.email}
							/>
							<Form.Text className='text-muted'>
								We'll never share your email with anyone else.
							</Form.Text>

							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password'
								name='password'
								value={values.password || ''}
								onChange={handleChange}
								isValid={touched.password && !errors.password}
								isInvalid={!!errors.password}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId='passwordRepeat'>
							<Form.Label>Password repeat</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password repeat'
								name='passwordRepeat'
								value={values.passwordRepeat || ''}
								onChange={handleChange}
								isValid={touched.passwordRepeat && !errors.passwordRepeat}
								isInvalid={!!errors.passwordRepeat}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.passwordRepeat}
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							variant='primary'
							type='submit'
						>
							Submit
						</Button>
					</Form>
				)}
				</Formik>
			</Col>
		</Row>
	)
}

export default Signup;