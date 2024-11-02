"use client";

import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Roberts Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/hello" active={pathname === "/hello"}>Hello</Nav.Link>
                        <Nav.Link as={Link} href="/dynamic">dynamic</Nav.Link>
                        <Nav.Link as={Link} href="/static">static</Nav.Link>
                        <Nav.Link as={Link} href="/isr">random</Nav.Link>
                        <Nav.Link as={Link} href="/search">search</Nav.Link>
                        <NavDropdown title="Topics" id="topics-dropdown">
                            <NavDropdown.Item as={Link} href="/topics/food">Food</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/nature">Nature</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/technology">Technology</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> 

                </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }