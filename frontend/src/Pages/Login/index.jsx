import React from 'react'
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    'email': '',
    'password': ''
}
const validationSchema = yup.object({
    email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
    const navigator = useNavigate()
    const handleSubmit = async (values) => {
        var body = {
            email: values.email,
            password: values.password
        }
        await axios.post('http://127.0.0.1:8000/api/login', body)
            .then((response) => {

                localStorage.setItem('token', response.data.token)
                toast.success(response.data.message)
                navigator('document')
            })
            .catch((err) => {
                toast.error(err)
            })
    }
    return (
        <>
            <ToastContainer position="top-right" theme="light" autoClose={3000} />
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Box m={3} p={3}>
                            <Typography variant="h5" m={2}>Login</Typography>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        fullWidth
                                        label="email"
                                        type="email"
                                        variant="outlined"
                                        helperText={<ErrorMessage name="email" />}
                                    />
                                    <Field
                                        as={TextField}
                                        name="password"
                                        fullWidth
                                        label="password"
                                        type="password"
                                        variant="outlined"
                                        helperText={<ErrorMessage name="password" />}
                                    />
                                    <Button type="submit" variant="contained" fullWidth>Submit</Button>
                                </Form>
                            </Formik>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </>
    )
}

export default Login
