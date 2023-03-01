import {useState } from 'react';
import { CKEditor } from 'ckeditor4-react';
import {
    Box,
    Button,
    Grid,
    Paper,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDocumentData } from './getDocument';
import { useNavigate } from 'react-router-dom';

const Document = () => {
    const navigator = useNavigate()
    const initialValue = {
        document: "",
    };
    const getDocu = getDocumentData;
    const [data, setData] = useState('');
    const handleChange = async (e) => {
        const getValue = e.editor.getData();
        setData(getValue)
    }
    const handleSubmit = async (values) => {
        console.log(data);
        var formData = {
            document: data,
        }
        var token = localStorage.getItem('token');
        await axios.post('http://127.0.0.1:8000/api/addocument', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                Accept: "application/json",
            },

        })
            .then((res) => {
                localStorage.setItem('document', data);
                toast.success(res.data.message)
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };
    // const handleLogout = () => {
    //     localStorage.clear()
    //     navigator('/register')
    // }
    return (
        <Grid container>
            <Grid item sm={3} xs={false}></Grid>
            <Grid item sm={6} xs={12}>
                <Paper>
                    <Box m={5} p={3}>
                        <ToastContainer autoClose={3000} />
                        <Formik
                            initialValues={initialValue}
                            // validationSchema={YupValidation}
                            onSubmit={handleSubmit}
                        >
                            {/* <Typography variant="h5">Document</Typography>   */}
                            <Form>
                                <CKEditor
                                    initData={localStorage.getItem('document')}
                                    onChange={handleChange} />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Formik>
                    </Box>
                </Paper>
                {/* <Button
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={handleLogout}
                >
                    Logout
                </Button> */}
            </Grid>
            <Grid item sm={3} xs={false}>
            </Grid>
        </Grid>
    );
}

export default Document;