import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Header.css';

export default class Header extends React.Component {
	render() {
		return (
			<div class="header-wrapper">
				<Navbar bg="dark" expand="md">
					<Navbar.Brand><span class="header-branding">LIMXINGZHI</span></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="https://xingzhi.dev" target="_blank"><span class="header-link">Blog</span></Nav.Link>
							<Nav.Link href="https://github.com/limxingzhi/new-tab" target="_blank"><span class="header-link">Source</span></Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>);
	}
}
