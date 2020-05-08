import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
// import Nav from 'react-bootstrap';

export default class Header extends React.Component {
	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#home">HOMEPAGE</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="https://github.com/limxingzhi/new-tab" target="_blank">SOURCE ON GITHUB</Nav.Link>
						<NavDropdown title="MY RESOURCES" id="basic-nav-dropdown">
							<NavDropdown.Item href="https://xingzhi.dev" target="_blank">XINGZHI.DEV</NavDropdown.Item>
							<NavDropdown.Item href="https://t.me/devstuff" target="_blank">TELEGRAM CHANNEL</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
	}
}
