import React, { Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import cookies from 'universal-cookie'
import Register from './Register'
import ManageProducts from './ManageProducts';
import Login from './Login';
import Cart from './Cart'
import Home from './Home';
import Header from './Header';
import {connect} from 'react-redux'
import DetailProduct from './DetailProduct'
import {keepLogin} from '../actions/index'


const cookie = new cookies()


class App extends Component {

    componentDidMount(){
        const objCookie = cookie.get('userName') //isinya antara {id, username} atau undefined

        if(objCookie !== undefined){
            this.props.keepLogin(objCookie)
        }

    }
    render(){
        return(
            <BrowserRouter>
            <div>
                <Header/>
                
                <Route path ='/'exact component={Home}/>  
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/manageproduct' component={ManageProducts}/>
                <Route path='/detailproduct/:product_id' component={DetailProduct}/>
                <Route path='/cart' component={Cart}/>
                
            </div>
            </BrowserRouter>
        )
}
}


export default connect(null, {keepLogin})(App)