import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

export class Info extends Component<any> {
    render() {
        console.log(this.props);
        return (
            <div>Asdkfjhksdfh</div>
        )
    }
}

export default withRouter(Info);



