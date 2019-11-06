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

class Registration extends Component<any> {
    state = {
        isSendClick: false
    }

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
        if(!this.props.isLoading && (this.props.user.name !== undefined)) {
            this.props.history.push(`/users/${this.props.user._id}`)
        }
    }

    render() {
        console.log(this.props.user)
        let display;
        if(this.props.isLoading) {
            display= <div>Loading...</div>
        } else {
            display = (
                <Formik  initialValues={{name: ''}} validationSchema={this.validationSchema} onSubmit={(values) => { this.setState({isSendClick: true}); this.props.registerUser(values); }}>
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
                                    className={touched.name && errors.name ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{touched.name && errors.name ? <div>{errors.name}</div> : null}</Error>
                            </div>

                            <div>
                                <Input
                                    type='text'
                                    name='surname'
                                    id='surname'
                                    placeholder='Enter surname'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.surname && errors.surname ? 'errorBorder' : undefined}
                                />
                                <Error className='errorMessage'>{touched.surname && errors.surname ? <div>{errors.surname}</div> : null}</Error>
                            </div>

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
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    registerUser: (user: any) => {dispatch(registerUser(user)) }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration));
