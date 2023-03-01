import axios from "axios";

const token = localStorage.getItem('token')
export const getDocumentData = axios.get('http://127.0.0.1:8000/api/getdocument', {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        Accept: "application/json",
    },

})
    .then((res) => {
        // return localStorage.setItem('document',res.data.document);
        return res.data.document;
    })
    .catch((err) => {
        return localStorage.setItem('document','');
    });