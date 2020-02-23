import React, { Component } from 'react';
import AuthHoc from '../../hocs/Auth';

class ApplicationContainer extends Component {
    render() {
        return (
            <h1>Hello world</h1>
        );
    }
}

export default AuthHoc(ApplicationContainer);