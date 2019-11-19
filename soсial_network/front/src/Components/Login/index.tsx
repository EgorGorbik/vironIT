import React, {Component} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Link, withRouter} from "react-router-dom";
import { Form, Button, Spinner } from 'react-bootstrap';
import {loginUser} from "../../Redux/ThunkCreators/authorization.thunk";
import {connect} from "react-redux";
import {getAuthUser, getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {Input, Error, Send, Div, P, L} from  './styles/index';



class Login extends Component<any> {

    validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(2,'Данное поле должно содержать минимум 2 символа')
            .max(255, 'Данное поле должно содержать не более 255 символов')
            .required('Это обязательное поле для заполнения'),
        password: Yup.string()
            .min(2, 'Данное поле должно содержать минимум 2 символа')
            .max(255, 'Данное поле должно содержать не более 255 символов')
            .required('Это обязательное поле для заполнения')
    })

    componentDidUpdate() {
        console.log(!this.props.isLoading)
        console.log(this.props.authUser.name)
        if(!this.props.isLoading && (this.props.authUser.name !== undefined)) {
            this.props.history.push(`/${this.props.authUser._id}`)
        }
    }

    render() {
        if(this.props.isLoading) {
            return <Spinner animation="border" variant="success" />
        } else {
            return (
                <Formik  initialValues={{name: ''}} validationSchema={this.validationSchema} onSubmit={(values) => {this.props.loginUser(values)}}>
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}: any) => (
                        <Form onSubmit={handleSubmit} className='loginForm'>
                            <P>Login</P>
                            <div>
                                <Input
                                    type='text'
                                    name='username'
                                    id='username'
                                    placeholder='Enter username'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.username ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{errors.username ? <div>{errors.username}</div> : null}</Error>
                            </div>

                            <div>
                                <Input
                                    type='text'
                                    name='password'
                                    id='password'
                                    placeholder='Enter password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{errors.password ? <div>{errors.password}</div> : null}</Error>
                            </div>
                            <Div>
                                <Send type="submit" disabled={isSubmitting}>Submit</Send>
                            </Div>
                            <Link to='/registration'>
                                <L>registration</L>
                            </Link>
                        </Form>
                    )
                    }
                </Formik>
            )
        }
    }
}

const mapStateToProps = (state: any) => ({
    isLoading: getIsLoading(state),
    isLogin: getIsLogin(state),
    authUser: getAuthUser(state)
});

const mapDispatchToProps = ({
    loginUser
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));
