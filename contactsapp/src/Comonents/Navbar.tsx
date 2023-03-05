import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { router } from '../index';
import { useState, useEffect } from 'react';

function BasicExample({logedIn}:any) {
    const [btnMessage,setButtonMessage] = useState("Zaloguj");
    console.log(logedIn);

    useEffect(()=>{
        if(logedIn){
            setButtonMessage("Wyloguj");
        }
    },[logedIn])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Contacts app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button onClick={() => {localStorage.removeItem("UserStore"); router.navigate("/login")}}>{btnMessage}</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;