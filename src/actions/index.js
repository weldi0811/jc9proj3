import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginUser = (inputEmail,inputpassword) =>{
   return (dispatch) => {
        axios.get('http://localhost:4000/users',{
        params:{
        email: inputEmail,
        password : inputpassword
        }
        }).then((res) => {
        console.log(res)
        if(res.data.length > 0){
            const{id,username}=res.data[0]
            //kirim action ke reducer, buat nyimpan username
            dispatch({
                type : 'LOGIN_SUCCESS',
                payload : {
                    id : res.data[0].id,
                    username : res.data[0].username
                }
            })
            //create data buat cookie

            cookie.set('userName', {id,username}, {path: '/'})

            //buat ngebaca cookie terus, liat di app.js
        }
        else{
            alert('email or password incorrect')
        }
    }).catch((err)=>{
        alert('server error')
    })

   }

}
export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const keepLogin = (objUser) => {
    return {
        type : 'LOGIN_SUCCESS',
        payload  : {
            id: objUser.id,
            username: objUser.username
        }
    }

}