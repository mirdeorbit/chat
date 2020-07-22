import React, { Component } from 'react';

import AuthHoc from '../../hocs/Auth';

import ApplicationComponent from '../../components/App';

class ApplicationContainer extends Component {
    render() {
        return (
            <h1>Application</h1>
        );
    }
}

export default AuthHoc(ApplicationContainer);