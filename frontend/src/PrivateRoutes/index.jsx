import React from 'react'
import { useNavigate } from 'react-router-dom'
import Document from '../Pages/Document'

const PrivateRoutes = () => {
    const navigator = useNavigate()
    return (
        (localStorage.getItem('token') != null) ?
            <Document />
            :
            navigator('/')
    )
}

export default PrivateRoutes
