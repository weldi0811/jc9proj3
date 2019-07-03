import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ManageProducts extends Component {

    state = {
        products: [],
        selectedItem : 0
    }

    getProduct = () =>{
        axios.get('http://localhost:4000/products')
            .then(res => {
                this.setState({products : res.data, selectedItem:0})
            })
        
    }


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
        this.name.value = ''
        this.desc.value =''
        this.price.value =''
        this.pict.value = ''
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
            console.log(res)
            console.log('sukses hapus data')

            axios.get('http://localhost:4000/products')
            .then(res2 => {
                this.setState({products : res2.data})
            })
        })
    }

    saveEdit = (id) =>{
        var editedName = this.editName.value
        var editedDesc = this.editDesc.value
        var editedPrice = this.editPrice.value

        axios.patch('http://localhost:4000/products/' + id, {
            name : editedName,
            desc: editedDesc,
            price :editedPrice,
        })
        .then(res => {
            console.log(res.data)
            this.setState({selectedId:0})
            axios.get('http://localhost:4000/products')
            .then(res2=> {
                this.setState({products : res2.data})
            })
        })
    }
    
        renderList = () => {
            return this.state.products.map( item => { // {id, name, price, desc, src}
                if(item.id !== this.state.selectedId){
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.desc}</td>
                            <td>{item.price}</td>
                            <td>
                                <img className='list' src={item.src}/>
                            </td>
                            <td>
                                <button onClick={() => {this.setState({selectedId: item.id})}} className = 'btn btn-primary'>Edit</button>
                                <button onClick={() => {this.deleteProduct(item)}} className = 'btn btn-warning'>Delete</button>
                            </td>
                        </tr>
                    )
                } else {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>
                                <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                            </td>
                            <td>
                                <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                            </td>
                            <td>
                                <input className="form-control" ref={input => {this.editPrice = input}} type="number" defaultValue={item.price}/>
                            </td>
                            <td>
                                <img className='list' src={item.src}/>
                            </td>
                            <td>
                                <button  onClick = {() => {this.saveEdit(item.id)}}className = 'btn btn-primary'>Save</button>
                                <button onClick={() => {this.setState({selectedId: 0})}} className = 'btn btn-warning'>Cancel</button>
                            </td>
                        </tr>
                    )
                }
            })
        }

    render () {

        if (this.props.STATEUSER.username === '') {
            return <center><h2> To access ManageProduct, You have to login first. <br/><br/> <Link to='/login'> Click here to login </Link> </h2></center>
            // return <Redirect to='/login' />
        }

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
                            <th scope="col"><button className="btn btn-outline-warning" onClick={() => this.addProduct()} >Add</button></th>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        STATEUSER : state.auth
    }
}

export default connect(mapStateToProps)(ManageProducts);