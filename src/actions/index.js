import axios from 'axios'

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
            dispatch({
                type : 'LOGIN_SUCCESS',
                payload : {
                    id : res.data[0].id,
                    username : res.data[0].username
                }
            })
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
    return {
        type: 'LOGOUT_SUCCESS'
    }
}