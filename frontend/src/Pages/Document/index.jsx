import React, { useState } from 'react'
import { CKEditor } from 'ckeditor4-react'
import { Box, Grid, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


const initialValues = {
    'email': '',
    'password': ''
}
const validationSchema = yup.object({
    email: yup.
        string()
        .email('Enter email valid address')
        .required('Please enter email address'),
    password: yup
        .string()
        .required('Please enter password')
})
const handleSubmit = async (values) => {
    console.log(values)
}
const Document = () => {
    const [data, setData] = useState()
    const handleChange = (e) => {
        const getContent = e.editor.getData()
        setData(getContent)
    }
    return (
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <Box m={3} p={3}>
                        <Typography variant="h5" m={2}>Document</Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            <Form>
                                <CKEditor initData={data} onChange={handleChange} />
                                <Button type="submit" variant="contained" fullWidth>Submit</Button>
                            </Form>
                        </Formik>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={3}>
            </Grid>
        </Grid>
    )
}

export default Document
