import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from '../stores/store';
import userInfo from '../model/userInfo';


export default function ContactFormCard() {
    const {userStore} = useStore();

    const initContact:userInfo = {
        email: "",
        password: "",
    };

    const [user,setUserInfo] =  useState<userInfo>(initContact);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setUserInfo({ ...user, [name]: value });
    }

    return (
        <Form>
            <CardContent>
                <Grid >
                    <Grid container rowSpacing={3}>
                        <Grid item xs={6} id="spacing-form">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Imie" name="email" onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Imie" name="password" onChange={handleInputChange} />
                        </Grid>
                        <Button variant="outlined" color="error" onClick={() =>{userStore.login(user)}}>Dodaj</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Form>
    );
}

