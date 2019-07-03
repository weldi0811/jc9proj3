import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import cookies from 'universal-cookie'


const cookie = new cookies()


class Cart extends React.Component {

    constuctor() {
        this.routeChange = this.routeChange.bind(this);
      }
    
      routeChange() {
        let path = `/login`;
        this.props.history.push(path);
      }

    //KALO ADA COMPONENT DID MOUNT GA BISA MASUK CART, MENTAL TERUS BALIK HOME
    componentDidMount(){
        const objCookie = cookie.get('userName') //isinya antara {id, username} atau undefined

        if(objCookie === undefined){
            alert('belum login')
            this.routeChange() //buat pindah ke login kalau belom login

    }
    this.getProduct()
}
    state={
        allProduct:[],
        selectedId : 0
    }

    //kalau belom login trus mau akses cart, di lempar suruh login dulu
    // constuctor() {
    //     this.routeChange = this.routeChange.bind(this);
    //   }
    
    //   routeChange() {
    //     let path = `/login`;
    //     this.props.history.push(path);
    //   }

    

    getProduct = () =>{
    axios.get('http://localhost:4000/cart').then((res)=>{
        this.setState({allProduct:res.data})
    })
}

deleteCart = (id) =>{
    axios.delete('http://localhost:4000/cart/' + id).then((res)=>{
        this.getProduct()
    })
}

editProduct = () =>{
    //.put akan mengubah keseluruhan data yang dituju
    //.patch akan mengubah data yang diubah saja dan tetap menyimpan properties yang sebelumnya
    axios.patch('http://localhost:4000/cart/'+this.state.selectedId ,
        {
           quantity: parseInt(this.quantity.value)
        }
    ).then((res)=>{
        console.log(res)
        this.setState({selectedId: 0}) //ngeset state selectedid balik jadi 0, jadi tombol savenya ilang
        axios.get('http://localhost:4000/cart').then((res2)=>{
            this.setState({allProduct : res2.data})
        })
    }).catch(err =>{
        console.log('Gagal')
    })
}

showTotalQuantity = () =>{
    var totalQuantity = 0
    var cart = this.state.allProduct

    for(var i = 0; i< cart.length; i++){
        totalQuantity += cart[i].quantity
    }
    return totalQuantity;
}

showTotalPrice = () =>{
    var totalPrice = 0
    var cart = this.state.allProduct

    for(var i = 0; i< cart.length; i++){
        totalPrice += (cart[i].productPrice * cart[i].quantity)
    }
    return totalPrice;
}


renderOrderTotal=()=>{
    return(
        <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">TOTAL</h5>
                    <p class="card-text">Quantity: {this.showTotalQuantity()}</p>
                    <p class="card-text">Total price: Rp{this.showTotalPrice()},-</p>
                    <button className="btn btn-primary">Checkout</button>
                </div>
                </div>
            </div>
        </div>
    ) 
}


renderCart = () =>{


    //ngefilter id yang lagi login
    var filterId = this.state.allProduct.filter((item) => item.userId === this.props.STATEauth.id) //ngambil propse dr stateauth di reducers.
    console.log(filterId)
    var hasil = filterId.map((val)=>{
        if(this.props.STATEauth.id == val.userId){
            if(val.id !== this.state.selectedId){
                return(
                    <tr>
                        <td style={{width:'100px'}}>{val.productName}</td>
                        <td style={{width:'200px'}}>{val.productDesc}</td>
                        <td className='text-center'>{val.productPrice}</td>
                        <td className='text-center'>{val.quantity}</td>
                        <td  className='text-center'>
                            <img className="w-25 img-fluid" src={val.productSrc} alt="Product"/>
                        </td>
                        <td className='text-center'>{val.quantity * val.productPrice}</td>
                        <td className='text-center' style={{width:'100px'}}>
                            <button className='btn btn-danger btn-sm' onClick={()=>this.deleteCart(val.id)}>Delete</button>
                            <button className='btn btn-warning btn-sm'  onClick={()=>{this.setState({selectedId:val.id})}}>Edit</button>
                        </td>
                    </tr>
                    )
                    
            } else{
                return (
                    <tr>
                        <td style={{width:'100px'}}>{val.productName}</td>
                        <td style={{width:'200px'}}>{val.productDesc}</td>
                        <td className='text-center'>{val.productPrice}</td>
                        <td>
                            <input type='text' defaultValue={val.quantity} ref={(quantity)=>{this.quantity = quantity}}/>
                        </td>
                        <td  className='text-center'>
                            <img className="w-25 img-fluid" src={val.productSrc} alt="Product"/>
                        </td>
                        <td className='text-center'>{val.quantity * val.productPrice}</td>
                        <td className='text-center'></td>
                        
                        <td className="w-25">
                            <button className='btn btn-success mx-3 text-center' onClick={this.editProduct}>Save</button>
                            <button className='btn btn-danger text-center' onClick={()=>{this.setState({selectedId: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
            
        } else{
            return(
            <Redirect to='/login'/>
            )
        }
        
    })
    return hasil
}

       
    render() {
        return(
            <div className="container">
                <h1 className="display-4 text-center">My Cart</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QTY</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">TOTAL PRICE</th>
                            <th scope="col">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                </table>
                <div>
                    {this.renderOrderTotal()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        STATEauth : state.auth
    }
}


export default connect(mapStateToProps)(Cart);