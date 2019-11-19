import React, {Component} from 'react';
import './styles/_style.scss';
import notFound from '../../images/404.png';

export class NotFound extends Component<any> {
    render() {
        return(
            <div className='container'>
                <div><img src={notFound}/></div>
            </div>
        )
    }
}

export default NotFound;
