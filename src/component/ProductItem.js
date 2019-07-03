import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {addToCart} from '../actions/index'
import {connect} from 'react-redux'
import axios from 'axios'
import DetailProduct from './DetailProduct';

class ProductItem extends Component{
    state = {
        unit: 0,
        cart: [],
        addedItems : [],
        cartTotal : 0,
        totalUnits: 0
    }

    // componentDidMount(){
    //     axios.get('http://localhost:2019/cart').then((res)=>{
    //         this.setState({cart : res.data})
    //     })
    // }

    handleAddToCart = (name,id,price,src,desc,unit) =>{
        unit = parseInt(this.state.unit)
        var userId = this.props.user.id
        // this.props.addCart(id,unit)
        
        console.log(this.state.cart)
        // let sameProductId = this.state.cart.find(el => el.productId == id )
        // console.log(sameProductId)

        axios.get('http://localhost:4000/cart',{
            params:{
                userId: this.props.user.id
            }
        }).then((res)=>{
                 console.log(res)
                 var existingProduct = res.data.find((val)=> val.productId == id)

                 if(existingProduct){
                    axios.patch(`http://localhost:4000/cart/${existingProduct.id}`, {
                               quantity: unit + existingProduct.quantity
                            })
                 }  else if(existingProduct == undefined){
                    axios.post('http://localhost:4000/cart',{
                                userId: userId,
                                productId : id,
                                productName : name,
                                productDesc : desc,
                                productPrice : parseInt(price),
                                productSrc : src,
                                quantity: unit
                            }).then((res)=>{
                                console.log(res)
                                console.log('Input data berhasil')
                            })
                 }
        })
        //kalau productId == id input, maka nambah quantity
        // if(sameProductId !== undefined){
        //     console.log('AAAAAAAAAAAAAAAAAAAA')
           
        //     axios.patch(`http://localhost:2019/cart/${sameProductId.id}`, {
        //        quantity: unit + sameProductId.quantity
        //     })
             
        // }else if(sameProductId == undefined){
        //     axios.post('http://localhost:2019/cart',{
        //         userId: userId,
        //         productId : id,
        //         productName : name,
        //         productDesc : desc,
        //         productPrice : parseInt(price),
        //         productSrc : src,
        //         quantity: unit
        //     }).then((res)=>{
        //         console.log(res)
        //         console.log('Input data berhasil')
        //     })
        // }

      }

    handleChange = (event) =>{
        this.setState({unit:event.target.value})
    }

    render(){
       
        return(
            <div  className = 'card col-3 mt-5 mx-3'>
                    <img src={this.props.products.src} className='card-img-top' alt='Product'/>
                    <div className='card-body align-bottom'>
                        <h5 className='card-title'>{this.props.products.name}</h5>
                        <p className='card-text'>Rp{this.props.products.price},-</p>
                        <form>
                            <input className='form-control' placeholder='Qty' onChange={this.handleChange}/>    
                        </form>
                        {/* ini cara untuk menambahkan :id pada <Link> */}
                        <Link to={'/detailproduct/' + this.props.products.id}>
                            <button className='btn btn-outline-primary btn-block my-2'>Details</button>
                        </Link>
                        <button className='btn btn-primary' onClick={()=>this.handleAddToCart(this.props.products.name,this.props.products.id,this.props.products.price,this.props.products.src,this.props.products.desc)}>Add To Cart</button>
                    </div>
                    
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.auth
    }
}

export default connect(mapStateToProps,{addToCart})(ProductItem)