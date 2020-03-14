import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { makeSelectAuth } from '../ducks/auth';
import LayoutComponent from '../components/Layout';


class Layout extends Component {
	render() {
		return (
			<LayoutComponent { ...this.props } />
		)
	}
}

const mapStateToProps = createStructuredSelector({
	auth: makeSelectAuth()
});

const withConnect = connect(mapStateToProps);

export default withConnect(Layout);