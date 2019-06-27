import React, { Component } from 'react'
import axios from 'axios'

class ManageProducts extends Component {


    addProduct = () => {
        var namaProduk = this.name.value
        var deskripsiProduk = this.desc.value
        var hargaProduk = parseInt(this.price.value)
        var imageProduk = this.pict.value

        console.log(namaProduk, deskripsiProduk, hargaProduk,imageProduk)

        if(namaProduk === ''){
            alert('nama produk harus diisi')
        }
        else if( deskripsiProduk === ''){
            alert('isi deskripsi produk')
        }
        else if(hargaProduk === ''){
            alert('harga produk harus diisi')
        }
        else if(imageProduk ===''){
            alert('belum ada gambar')
        }
        

            
            axios.post('http://localhost:4000/products',
        {
            name : namaProduk,
            desc : deskripsiProduk,
            price : hargaProduk,
            src : imageProduk
        })
        .then(res => {
            alert('sukses masukan data')
            console.log('success')
            axios.get('http://localhost:4000/products')
            .then(res => {
                this.setState({products : res.data})
            })
        })

    }

        
            
        
    
    

    componentDidMount(){
        // Akses database
        axios.get('http://localhost:4000/products')
            .then(res => {
                console.log(res.data)
               this.setState({products: res.data})
            })
    }

    deleteProduct = (item) =>{
        const id = item.id

        axios.delete('http://localhost:4000/products/' + id)
        .then(res => {
            console.log('sukses hapus data')

            axios.get('http://localhost:4000/products')
            .then(res2 => {
                this.setState({products : res2.data})
            })
        })
    }
    

    state = {
        products: []
    }

    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            return (
                <tr key = {item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>Rp. {item.price}</td>
                    <td>
                        <img className='list' src={item.src}/>
                    </td>
                    <td>
                        <button className = 'btn btn-primary'>Edit</button>
                        <button className = 'btn btn-warning' onClick={() => {this.deleteProduct(item)}}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick = {this.addProduct} >Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageProducts