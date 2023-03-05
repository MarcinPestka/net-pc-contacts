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
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            userStore.register(user);
        }

        setValidated(true);
    };

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
            <Container>
                <Row className="justify-content-md-center">
                    <Col md lg="6">
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" name="email" required onChange={handleInputChange} />
                            </Col>
                            <Col>
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Hasło" name="password" required onChange={handleInputChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Imie</Form.Label>
                                <Form.Control placeholder="Imie" name="firstName" required onChange={handleInputChange} />
                            </Col>
                            <Col>
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control placeholder="Nazwisko" name="lastName" required onChange={handleInputChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Nazwa użytkownika</Form.Label>
                                <Form.Control required placeholder="Nazwa użytkownika" name="UserName" onChange={handleInputChange} />
                            </Col>
                        </Row>
                        <Row id="row-margin-top">
                            <Stack gap={2}>
                                <Button type="submit" variant="outlined" color="success" >Zarejestruj się</Button>
                                <Button variant="outlined" color="warning" onClick={() => { router.navigate("/login") }}>Mam już konto</Button>
                            </Stack>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </Form>
    );
}

