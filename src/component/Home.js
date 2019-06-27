import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from './ProductItem'

class Home extends Component {

    state = {
        products: [],
        searchProducts : []
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:4000/products')
            .then(res => {
               this.setState({products: res.data, searchProducts: res.data})
            })
    }

    renderList = () => {
        return this.state.products.map(item => {
            return (
                <ProductItem products={item}/> //kita ngelempar element yang di map ke komponen product item. dari product item tinggal di this.props
            )
        })
    }

    onBtnSearch = () =>{
        var name = this.name.value
        var min = parseInt(this.min.value)
        var max = parseInt(this.max.value)

        var arrSearch = this.state.searchProducts.filter(item => {
            if(item.name.toLowerCase().includes(name)){
                return true
            }
            else if(name === ''){
                return true
            }
        })

        this.setState({products : arrSearch})
    }

    render () {
        return (
            <div className="row">
                <div className="col">
                    <div className="mt-5">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home