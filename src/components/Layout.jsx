import React from 'react';
import { Container, Row, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Layout = (props) => {
	return (
		<Container>
			<Row>
				<Col md={{ span: 4, offset: 10 }}>
					{!props.auth && (
						<Nav>
							<Nav.Item>
								<Nav.Link as={Link} to='/auth/signin' >Signin</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link as={Link} to='/auth/signup' >Signup</Nav.Link>
							</Nav.Item>
						</Nav>
					)}

					{props.auth && (
						<Nav>
							<Nav.Item>
								<Nav.Link href='/profile'>{props.auth.user.email}</Nav.Link>
							</Nav.Item>
						</Nav>
					)}
				</Col>
			</Row>
			{ props.children }
		</Container>
	)
};

export default Layout;