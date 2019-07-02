import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link,Redirect } from 'react-router-dom'
import { addToCart } from '../actions/index'

class ProductItem extends Component {

    handleClick = (id) => {

        if(this.props.user.username ==''){
            return(
                <Redirect to= '/login'/>
            )
        }

        
        const inputQuantity = parseInt(this.qty.value);
        console.log(inputQuantity)

        if ( isNaN(inputQuantity) ) {
            alert('Hey please input the quantity');
        } else {
            this.props.addToCart(id, inputQuantity);
        }
    }

    render(){
        return (
            <div className="card col-3 mt-3">
                <Link to={'detailproduct/' + this.props.products.id}>
                    <img className = 'card-img-top' src={this.props.products.src} alt='gambar'/>
                </Link>
                 
                <div className='card-body'>
                    <h5 className='card-title'>{this.props.products.name}</h5>
                    <p className='card-text'>IDR {this.props.products.price}</p>
                    <input className ='form-control' type='number' min='0' ref={input => this.qty = input}/>
                    
                    <button className="btn btn-primary btn-block" onClick={ () => {this.handleClick(this.props.products.id)} }>Add To Cart</button>                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
      user: state.auth //berisi id dan username
    }
  }

export default connect(mapStateToProps, { addToCart })(ProductItem);