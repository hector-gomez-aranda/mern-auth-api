import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({ history }) => {

    const [values, setValues] = useState({
        email: "",
        buttonText: "Request password reset link"
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        //console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value })

    }

    const clickSubmit = event => {
        event.preventDefault() //no entendi este
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({...values, buttonText: 'Requested'})


            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Request password reset link' });

            })
    };

    const passwordForgotForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted" htmlFor="">Email</label>
                <input onChange={handleChange('email')} value={email} type="text" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>

        </form>
    )
    //si usamos parentesis no necesitamos el return si usamos {} si lo necesitamos

    return (
        <Layout>
            <div className="col-d-6 offser-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Forgot password</h1>
                {passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default Forgot;