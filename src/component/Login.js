import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Login extends React.Component{
    render (){
        return (
            <div>
                <div className = 'mt-5 row'>
                <div className ='card col-sm-3 mx-auto'>
                    <div className = 'card-body'>
                        <div className='border-bottom border-secondary card-title d-flex justify-content-center'>
                            <h1>LOGIN</h1>
                        </div>
                        <div className='card-title'>
                            <h4>E-mail</h4>
                            <form className='input-group'>
                                <input className='form-control' placeholder='E-mail'
                                ref={(inputemail) => {this.email = inputemail}}
                                />
                            </form>
                        </div>
                        <div className='card-title'>
                            <h4>Password</h4>
                            <form className='input-group'>
                                <input className='form-control' type='password'  placeholder='password'
                                ref={(inputpassword) => {this.password = inputpassword}}
                                />
                            </form>
                            <button onClick={this.onButtonClick} className='btn btn-primary mt-3'>Login</button>
                            <p>belum punya akun? <Link to='/register'>Sign up disini</Link></p>
                        </div>
                        
                    </div>
                </div>

                </div>
            </div>
        )
    }
}

export default Login