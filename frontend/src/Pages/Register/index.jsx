import React, { useState } from 'react'
import { Box, Grid, Typography, TextField, Button, Select, OutlinedInput, Chip, MenuItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const initialValues = {
    'name': '',
    'email': '',
    'password': '',
    'phone': '',
    'technology': '',
}
const validationSchema = yup.object({
    email: yup.
        string()
        .email('Enter email valid address')
        .required('Please enter email address'),
    password: yup
        .string()
        .required('Please enter password'),
    name: yup
        .string()
        .required('Please enter name'),
    phone: yup
        .number()
        .required('Please enter phone')
})

const names = [
    'Core PHP',
    'Laravel',
    'React JS',
    'Angular',
    'Node',
    
];
const Register = () => {
    const navigator = useNavigate()
    const handleSubmit = async (values) => {
        var body = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            password: values.password,
            technology: values.technology,
        }
        await axios.post('http://127.0.0.1:8000/api/register', body)
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                toast.success(response.data.message)
            })
            .catch((err) => {
                toast.error(err)
            })
        navigator('/document')
    }
    const [techName, setTechName] = useState([]);

    const handleChange = (event, setFieldValue) => {
        const {
            target: { value },
        } = event;
        setFieldValue('technology', value)
        setTechName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <Box m={3} p={3}>
                        <Typography variant="h5" m={2}>Login</Typography>
                        <ToastContainer position="top-right" theme="light" autoClose={3000} />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ setFieldValue }) => {
                                return (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            name="name"
                                            fullWidth
                                            label="name"
                                            type="name"
                                            variant="outlined"
                                            helperText={<ErrorMessage name="name" />}
                                        />
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
                                            name="phone"
                                            fullWidth
                                            label="phone"
                                            type="text"
                                            variant="outlined"
                                            helperText={<ErrorMessage name="phone" />}
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
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            name="technology"
                                            multiple
                                            value={techName}
                                            onChange={(e) => handleChange(e, setFieldValue)}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            fullWidth
                                        >
                                            <MenuItem disabled value="">
                                                <em>Tecnology</em>
                                            </MenuItem>
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Button type="submit" variant="contained" fullWidth>Submit</Button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={3}>
            </Grid>
        </Grid>
    )
}

export default Register
