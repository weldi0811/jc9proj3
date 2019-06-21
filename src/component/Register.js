import React, { Component} from 'react'


class Register extends Component {
    render(){
        return(
            <div>
                <div className = 'mt-5 row'>
                <div className ='card col-sm-3 mx-auto'>
                    <div className = 'card-body'>
                        <div className='border-bottom border-secondary card-title d-flex justify-content-center'>
                            <h1>REGISTER</h1>
                        </div>
                        <div className='card-title'>
                            <h4>User</h4>
                            <form className='input-group'>
                                <input className='form-control' placeholder='username'/>
                            </form>
                        </div>
                        <div className='card-title'>
                            <h4>E-mail</h4>
                            <form className='input-group'>
                                <input className='form-control' placeholder='E-mail'/>
                            </form>
                        </div>
                        <div className='card-title'>
                            <h4>Password</h4>
                            <form className='input-group'>
                                <input className='form-control' type='password'  placeholder='password'></input>
                            </form>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        )
}
}


export default Register