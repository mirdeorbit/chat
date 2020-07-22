import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
	return (
		<Container fluid>
			<Row>
				<h1>You are not authorized</h1>
			</Row>
			<Row>
				<h3>
					You can <Link to={'/auth/signin'}>Signin</Link> or <Link to={'/auth/signup'}>Signup</Link>
				</h3>
			</Row>
		</Container>
	)
};

export default NotAuthorized;