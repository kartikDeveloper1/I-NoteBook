import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""})

    let navigate =useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/auth/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email":credentials.email,"password":credentials.password})
        });
        const json=await response.json()
        // console.log(json)
        setCredentials({email:"",password:""})
        if(json.success){
            //save the AuthToken and Redirect
            localStorage.setItem("token",json.AuthToken)
            props.showAlert("success","Logged in Successfully")
            navigate('/')
            
        }else{
            props.showAlert("danger","Invalid Credentials")
        }

    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div >
            <h2 className='my-3'>Login to INotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" required minLength={5} value={credentials.email} onChange={onChange} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required minLength={5} value={credentials.password} onChange={onChange} name='password' className="form-control" id="password" />
                </div>
                <button type="submit"  className="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}

export default Login
