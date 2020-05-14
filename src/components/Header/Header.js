import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.css';

export default class Header extends React.Component {
	render() {
		return <Navbar className="header-wrapper" bg="dark" expand="md">
			<Navbar.Brand className="header-branding">LIMXINGZHI</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link className="header-link" href="https://xingzhi.dev" target="_blank">Blog</Nav.Link>
					<Nav.Link className="header-link" href="https://github.com/limxingzhi/new-tab" target="_blank">Source</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>;
	}
}
