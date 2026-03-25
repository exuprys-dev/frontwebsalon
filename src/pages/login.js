// Login Page
import React from 'react';


function Login() {
    return (
        <div className="App">
            <h1>Login</h1>
            <div className='mb-3 w-100 d-flex flex-column align-items-center justify-content-center'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </div>

        </div>
    );
}

export default Login;