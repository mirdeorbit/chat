import React from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { string, object } from 'yup';

const Signin = ({ onSubmit }) => {
	const schema = object({
		email: string().email().required(),
		password: string().required()
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
									placeholder='Password'
									name='password'
									value={values.password || ''}
									onChange={handleChange}
									isValid={touched.password && !errors.password}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicCheckbox'>
								<Form.Check type='checkbox' label='Check me out' />
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

export default Signin;