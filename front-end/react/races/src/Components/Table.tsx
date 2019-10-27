import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {User, Users} from "../Interfaces/Users.interface";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAsyncUsers} from "../Actions/user.action";

export class UserTable extends Component<Users> {
    componentWillMount(): void {
        this.props.getUsers();
    }

    render() {
        let spinner = (<div>Loading...</div>);
        let content = (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.users.map((row: {
                                _id: string | number | undefined; username: React.ReactNode; name: React.ReactNode; surname: React.ReactNode; }) => (
                                <TableRow key={row._id}>
                                    <TableCell>
                                        <Link to={`/users/edit/${row['_id']}`} style={{ textDecoration: 'none'}}>
                                            {row.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTable);
