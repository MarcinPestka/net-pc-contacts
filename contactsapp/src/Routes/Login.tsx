import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from '../stores/store';
import userInfo from '../model/userInfo';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { router } from '../index';


export default function ContactFormCard() {
    const { userStore } = useStore();

    const initContact: userInfo = {
        email: "",
        password: "",
    };

    const [user, setUserInfo] = useState<userInfo>(initContact);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setUserInfo({ ...user, [name]: value });
    }

    return (
        <Form>
            <Container >
                <Row className="justify-content-md-center">
                    <Col md lg="4">
                        <Row >
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="email" placeholder="Email" name="email" onChange={handleInputChange} />
                        </Row>
                        <Row>
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" placeholder="Hasło" name="password" onChange={handleInputChange} />
                        </Row>
                        <Row id="row-margin-top">
                            <Stack gap={2}>
                            <Button variant="outlined" color="success" onClick={() => { userStore.login(user) }}>Zaloguj</Button>
                            <Button variant="outlined" color="warning" onClick={() => { router.navigate("/register") }}>Zarejstruj się</Button>
                            </Stack>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

