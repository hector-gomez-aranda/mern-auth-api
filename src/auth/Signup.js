import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth } from "./helpers";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {

    const [values, setValues] = useState({
        name: "Hector",
        email: "hector.gomez1997@gmail.com",
        password: "hola12",
        buttonText: "Submit"
    });

    const {name, email, password, buttonText} = values;

    const handleChange = name => event => {
      //console.log(event.target.value);
        setValues({...values, [name]:event.target.value})

    }

    const clickSubmit = event => {
      event.preventDefault() //no entendi este
      setValues({...values, buttonText: 'Submitting'})
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signup`,
        data: {name, email, password}
      })
      .then(response => {
        console.log('SIGNUP SUCCESS', response)
        setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted' });
        toast.success(response.data.message);
      })
      .catch(error =>{
        console.log('SIGNUP ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);

      })
    };

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted" htmlFor="">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted" htmlFor="">Email</label>
                <input onChange={handleChange('email')} value={email} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted" htmlFor="">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
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
          {/* {JSON.stringify({name, email, password})} */}
          {isAuth() ? <Redirect to="/" /> : null}
          <h1 className="p-5 text-center">Signup</h1>
          {signupForm()}
          <br />
          <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
        </div>
      </Layout>
    );
};

export default Signup;