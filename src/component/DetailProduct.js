import React, {Component} from 'react'
import axios from 'axios'
import { addToCart } from '../actions/index'
import { connect } from 'react-redux';


class DetailProduct extends Component{

    state = {
        barang : {}
    }

    componentDidMount(){
        let pro_id = this.props.match.params.product_id

        axios.get('http://localhost:4000/products/'+pro_id
        ).then(res => {
            console.log(res.data)
            this.setState({barang : res.data})
            console.log(this.state.barang)
        })
    }


    render(){
       
        return (

            <div className="card col-3 m-5">
                <img src={this.state.barang.src} className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'>{this.state.barang.name}</h5>
                    <p className='card-text'>Deskripsi : {this.state.barang.desc}</p>
                    <p className='card-text'>Harga : IDR{this.state.barang.price}</p>
                    <input type='text' className='form-control'/>
                    <button className='btn btn-primary'>Add To Cart</button>

                </div>
            </div>
            
        )
    }
}

export default connect( null, {addToCart} )(DetailProduct);   