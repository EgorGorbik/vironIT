import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteAsyncUser, getAsyncUsers} from "../../Actions/user.action";
import "bootstrap/dist/css/bootstrap.css";

interface Props {
    history?: any;
    array?: Array<any>;
    users?: any;
    getUsers?: any;
    isLoading?: any;
    deleteUser?: any;
    rows?: Array<{
        id?: string;
        username: string | undefined;
        name: string | undefined;
        surname: string | undefined;
        password: string | undefined;
    }>

}
export class UserTable extends Component<Props> {
    componentDidMount(): void {
        this.props.getUsers();
    }

    del = (id: any) =>  {
        this.props.deleteUser(id);
    }

    render() {
        let spinner = (<div>Loading...</div>);
        let content = (
            <div>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th>username</th>
                        <th>name</th>
                        <th>surname</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users.map((row: {
                        _id: string | number | undefined; username: React.ReactNode; name: React.ReactNode; surname: React.ReactNode; }) => (
                        <tr onClick={() => {this.props.history.push(`/users/edit/${row._id}`)}} key={row._id}>
                            <td>{row.username}</td>
                            <td>{row.name}</td>
                            <td>{row.surname}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Link to={`/users/add/`} style={{ textDecoration: 'none'}}>
                    <button className="btn btn-primary">Создать</button>
                </Link>
            </div>
        );

        let display = (!this.props.isLoading)? content : spinner;

        return (
            <div>{display}</div>
        );
    }

}

const mapStateToProps = (state: { expenses: any; users: any; isLoading: any }) => ({
    expenses: state.expenses,
    users: state.users,
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    getUsers: () => {dispatch({type: 'CHANGE_TO_TRUE'}); dispatch(getAsyncUsers());},
    deleteUser: (id: string) => {dispatch({type: 'CHANGE_TO_TRUE'}); dispatch(deleteAsyncUser(id));},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTable));
