import React from 'react'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogoutUser} from '../actions/index'

class Header extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


    
    render (){
      //kalo username not found
      if (this.props.user.username === ''){
        return (
            <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ithink</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            
              <NavItem>
                  <Link to = '/login'>
                <Button color ='primary' className='mx-3'>Login</Button>
                </Link>
              </NavItem>
              <NavItem>
                  <Link to = '/register'>
                <Button color ='success'>Register</Button>
                </Link>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )
    }

    else{
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Ithink</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Link to = '/cart'>
                <Button color ='primary' className='mx-3'>Cart</Button> 
                </Link>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    hello, {this.props.user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className='dropdown-item'>

                    <Button color ='primary' className='mx-1 dropdown-item'>Profile</Button>
                    </DropdownItem>
                    <DropdownItem>
                    <Link to = '/manageproduct'>
                    <Button color ='primary' className='mx-1 dropdown-item'>Products</Button>
                    </Link>
                    </DropdownItem>
                    <DropdownItem className='dropdown-item'>
                    <Link to = '/cart'>
                    <Button color ='primary' className='mx-1 dropdown-item'>Cart</Button> 
                    </Link>
                    </DropdownItem>
                    
                    <DropdownItem divider />
                    <DropdownItem>
                      <button className= 'dropdown-item' onClick = {this.props.onLogoutUser}>Log Out</button>
                       
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth //berisi id dan username
  }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)