import React from 'react'

export const Login = () => {
    return (
        <>
            <div className="login">
                <div className="card">
                    <div className="card-body">
                        <div className="loginHeader">
                            Sign in your account
                        </div>
                        <div className="loginBody">
                            <div className="fields">
                                <label htmlFor="emailLogin">Email</label>
                                <input type="email" />
                            </div>
                            <div className="fields">
                                <label htmlFor="passwordLogin">Password</label>
                                <input type="password" />
                            </div>
                            <div className="fields">
                                <div>
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </div>
                                <div>
                                    Forgot Password?
                                </div>
                            </div>
                            <div className="fields">
                                <button>
                                    Sign In
                                </button>
                            </div>
                            <div className="fields">
                               <p>Don't have an account? <span>Sign up</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
