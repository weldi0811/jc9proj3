import React, { Component} from 'react'
import axios from 'axios'



class Register extends Component {

    onButtonClick = () => {
        const inputUser = this.username.value
        const inputPass = this.password.value
        const inputEmail = this.email.value

        //biar ga bisa kosong isinya
        if(inputUser ==='' || inputPass==='' || inputEmail===''){
            alert('tolong diisi')
        }
        else{
        //baru mulai pake axios
        axios.get('http://localhost:4000/users',{
            params: {
                username: inputUser
            }
        })
        .then((res) => {
            console.log(res)
            if(res.data.length >0){
                alert('username existed')
            }
            else if(res.data.length === 0){
                axios.get('http://localhost:4000/users',{
                    params: {
                        email: inputEmail
                            }
            }).then((res2) => {
                if(res2.data.length>0){
                    alert('email existed')
                }
                else{
                    axios.post('http://localhost:4000/users',
        {
            username : inputUser, //ngambil dari atas tuh
            email: inputEmail,
            password: inputPass
        }
        ).then((res) => {
            alert('sukses')
            console.log('success')
            window.location.reload()
            console.log(res)}).catch((err)=>{console.log('failed'); console.log(err)})

                }
            })
            }
        })
        }

        //GET
        
        // for(var i=0; i<this.pengguna.length; i++){
        //     var name = this.pengguna[i]
        //     if(name.includes(user)){
        //         alert('error')
        //     }
        // }
        

            
        
        

        //POST
        // axios menerima parameternya LINK dan OBJECT
        
      

    }

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
                            <h4>Username</h4>
                            <form className='input-group'>
                                <input className='form-control' placeholder='username'
                                ref={(inputuser) => {this.username = inputuser}} //fungsi baru namanya reference

                                />
                            </form>
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
                            <button onClick={this.onButtonClick} className='btn btn-primary mt-3'>Register</button>
                        </div>
                        
                    </div>
                </div>

                </div>
            </div>
        )
}
}


export default Register