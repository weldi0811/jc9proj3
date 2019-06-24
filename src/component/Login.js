import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Register from './Register'
import {Redirect} from 'react-router-dom'

class Login extends React.Component{

    onButtonClick = () => {
        const inputEmail = this.email.value
        const inputpassword = this.password.value

        if (inputEmail === ''){
            alert('must fill email')
        }
        else if(inputpassword.length < 8){
            alert('password must be 8 character or more')
        }
        else{
            axios.get('http://localhost:4000/users',{
                        params:{
                        email: inputEmail
                        }
                    }).then((res) => {
                        if(res.data.length > 0){
                            alert('welcome ')
                        }
                        else{
                            var check = window.confirm('email not registered. register now? ')
                             if (check == true) {
                            return <Link to='/register'/> //belom bisa
                             }
                            else{
                                window.location.reload()
                            }
                        }
                    })

        }
        
    }

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