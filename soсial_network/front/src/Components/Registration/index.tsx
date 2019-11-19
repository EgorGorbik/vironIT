import React, {Component} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Link, withRouter} from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import {registerUser} from "../../Redux/ThunkCreators/authorization.thunk";
import {connect} from "react-redux";
import {getAuthUser, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {Input, Error, Send, Div, P} from './styles';
import {L} from "../Login/styles";


class Registration extends Component<any> {

    validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Данное поле должно содержать минимум 2 символа')
            .max(255, 'Данное поле должно содержать не более 255 символов')
            .required('Это обязательное поле для заполнения'),
        surname: Yup.string()
            .min(2, 'Данное поле должно содержать минимум 2 символа')
            .max(255, 'Данное поле должно содержать не более 255 символов')
            .required('Это обязательное поле для заполнения'),
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
        if(!this.props.isLoading && (this.props.authUser.name !== undefined)) {
            this.props.history.push(`/${this.props.authUser._id}`)
        }
    }

    render() {
        if(this.props.isLoading) {
            return <div>Loading...</div>
        } else {
            return (
                <Formik  initialValues={{}} validationSchema={this.validationSchema} onSubmit={(values) => { this.props.registerUser(values);}}>
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}: any) => (
                        <Form onSubmit={handleSubmit} className='loginForm'>
                            <P>Registration</P>
                            <div>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Enter name'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{errors.name ? <div>{errors.name}</div> : null}</Error>
                            </div>

                            <div>
                                <Input
                                    type='text'
                                    name='surname'
                                    id='surname'
                                    placeholder='Enter surname'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.surname ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{errors.surname ? <div>{errors.surname}</div> : null}</Error>
                            </div>

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
                                <Send type="submit"  disabled={isSubmitting}>Submit</Send>
                            </Div>
                            <Link to='/login'>
                                <L>Login</L>
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
    user: getUser(state),
    isLoading: getIsLoading(state),
    authUser: getAuthUser(state)
});

const mapDispatchToProps = ({
    registerUser
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration));

