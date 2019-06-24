import React, {Component} from 'react'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap'
import {Link} from 'react-router-dom'

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
        return (
            <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ithink</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Products</NavLink>
              </NavItem>
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
}

export default Header