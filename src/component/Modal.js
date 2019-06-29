import React,{ Component} from 'react'

class Modal extends Component {

    constructor(props){
        super(props)
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            name : '',
            desc : '',
            price : '',
            src : ''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name : nextProps.name,
            desc : nextProps.desc,
            price : nextProps.price,
            src : nextProps.src
        })
    }

    nameHandler(e){
        this.setState({name : e.target.value})
    }

    descHandler(e){
        this.setState({desc : e.target.value})
    }

    priceHandler(e){
        this.setState({price : e.target.value})
    }

    srcHandler(e){
        this.setState({src : e.target.value})
    }

    handleSave = () =>{
        const item = this.state
        this.props.saveModalDetails(item)
    }


    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-lable">name:</span><input value={this.state.name} onChange={(e) => this.nameHandler(e)} /></p>
                            <p><span className="modal-lable">description:</span><input value={this.state.desc} onChange={(e) => this.descHandler(e)} /></p>
                            <p><span className="modal-lable">price:</span><input value={this.state.price} onChange={(e) => this.priceHandler(e)} /></p>
                            <p><span className="modal-lable">image:</span><input value={this.state.src} onChange={(e) => this.srcHandler(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal