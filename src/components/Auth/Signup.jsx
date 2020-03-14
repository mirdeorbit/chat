import React from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { string, object } from 'yup';

const Signup = ({ onSubmit }) => {
	const schema = object({
		email: string().email().required()
	});

	return (
		<Row className='justify-content-md-center'>
			<Col sm={4}>
				<Formik
					initialValues={{}}
					validationSchema={schema}
					onSubmit={onSubmit}
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
							/>
							<Form.Text className='text-muted'>
								We'll never share your email with anyone else.
							</Form.Text>
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
							/>
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
							/>
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