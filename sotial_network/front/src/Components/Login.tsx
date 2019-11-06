import React, {Component} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import {loginUser, registerUser} from "../Actions/user.action";
import {connect} from "react-redux";

export const Input = styled.input`
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  outline:none;
  margin: 15px auto 0 auto;
  display:block
  width: 300px; 
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;


export const Error = styled.div`
  color: red;
  width: 300px;
  margin: 0 auto;
`;


export const Send = styled.button`
    display: block;
    width: 140px;
    height: 35px;
    color: white;
    background-color: #589513;
    text-decoration: none;
    border: 1px solid #589513;
`;


export const Div = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const P = styled.p`
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  color: white;
`;

class Login extends Component<any> {
    state = {
        isSendClick: false
    }

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
        console.log(this.props.isLoading)
        console.log(this.props.user.name)
        console.log(this.props.isLogin);
        if(!this.props.isLoading && (this.props.user.name !== undefined)) {
            this.props.history.push(`/users/${this.props.user._id}`)
        }
    }

    render() {
        console.log(this.props.isLogin)
        let display;
        if(this.props.isLoading) {
            display= <div>Loading...</div>
        } else {
            display = (
                <Formik  initialValues={{name: ''}} validationSchema={this.validationSchema} onSubmit={(values) => {console.log('daaaaaaa'); this.props.loginUser(values); }}>
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
                                    className={touched.username && errors.username ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{touched.username && errors.username ? <div>{errors.username}</div> : null}</Error>
                            </div>

                            <div>
                                <Input
                                    type='text'
                                    name='password'
                                    id='password'
                                    placeholder='Enter password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.password && errors.password ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{touched.password && errors.password ? <div>{errors.password}</div> : null}</Error>
                            </div>
                            <Div>
                                <Send type="submit"  disabled={isSubmitting}>Submit</Send>
                            </Div>

                        </Form>
                    )
                    }
                </Formik>
            )
        }

        return(
            <div>
                {display}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
    users: state.users,
    isLoading: state.isLoading,
    isLogin: state.isLogin
});

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (user: any) => {dispatch(loginUser(user)) }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));
