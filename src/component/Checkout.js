import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

class Checkout extends React.Component {

    renderCheckoutDetail = () =>  {
        
        return this.props.cart.map(item=> {
            var price = item.productPrice.toLocaleString('IN')
            var totalprice = (item.quantity * item.productPrice).toLocaleString('IN')
            return (
                
                <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>Rp.{price}</td>
                    <td>Rp.{totalprice}</td>
                </tr>
            )
        })
    }

    renderCheckoutTotal = () => {
        var total = 0

        this.props.cart.forEach(item => {
            total += (item.productPrice * item.quantity)
        });

        total  = total.toLocaleString('IN')

        return (
            <tr>
                <th colSpan="4">TOTAL</th>
                <td>Rp.{total}</td>
            </tr>
        )
    }

    render() {
        if(this.props.cart !== null){
        return (
            <div>
                    <h1 className="display-4">TOTAL</h1>
                    <table className="table text-center table-hover mb-5">
                        <thead>
                            <tr>
                                
                                <th scope="col">NAME</th>
                                <th scope="col">QTY</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCheckoutDetail()}
                        </tbody>
                        <tfoot>
                            {this.renderCheckoutTotal()}
                        </tfoot>
                    </table>
            <center>
                <Link to='/'>
                    <button className="btn btn-success text-white" > <i className="fa fa-angle-left"></i> Continue Shopping  </button>
                </Link>
            </center>
            </div>
        )
    }
    else {
        return null
    }
}
}

const mapStateToProps = state => {
    return {STATEauth: state.auth}
}

export default connect(mapStateToProps)(Checkout)

