import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  let navigate=useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/CreateUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name":credentials.name,"email":credentials.email,"password":credentials.password}) 
    });
    const json=await response.json()

    if(json.success){
      props.showAlert("success","Account created Successfully")
      navigate('/login')
    }else{
        props.showAlert("danger","Invalid Credentials")
    }
  }
  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <h2 className='my-3'>Create an account on INotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" value={credentials.name} required onChange={onChange} name='name' className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} minLength={5} required onChange={onChange} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={credentials.password} minLength={5} required onChange={onChange} name='password' className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}

export default Signup
