import React, { Component } from 'react'

class ProductItem extends Component {


    render(){
        return (
            <div className="card col-3 m-3">
                 <img className = 'card-img-top' src={this.props.products.src}/>
                <div className='card-body'>
                    <h5 className='card-title'>{this.props.products.name}</h5>
                    <p className='card-text'>IDR {this.props.products.price}</p>
                    <input className ='form-control' type='number'/>
                    <button className='btn btn-outline-primary btn-block mt-2'>Details</button>
                    <button className='btn btn-primary btn-block'>Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItem