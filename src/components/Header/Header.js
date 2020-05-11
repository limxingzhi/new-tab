import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
// import Nav from 'react-bootstrap';

export default class Header extends React.Component {
	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand>LIMXINGZHI</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="https://xingzhi.dev" target="_blank">BLOG</Nav.Link>
						<NavDropdown title="OTHER" id="basic-nav-dropdown">
							<NavDropdown.Item href="https://limxingzhi.github.io/markdown" target="_blank">MARKDOWN</NavDropdown.Item>
							<NavDropdown.Item href="https://limxingzhi.github.io/pomodoro" target="_blank">POMODORO</NavDropdown.Item>
							<NavDropdown.Item href="https://limxingzhi.github.io/sb-text" target="_blank">SPONGEBOB</NavDropdown.Item>
							<NavDropdown.Item href="https://limxingzhi.github.io/vue-name-gen" target="_blank">NAME GENERATOR</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
	}
}
