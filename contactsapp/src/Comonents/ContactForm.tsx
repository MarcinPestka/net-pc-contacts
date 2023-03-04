import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import { contactData } from '../model/shortData';
import { Autocomplete, Button, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { ChangeEvent, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '../model/categories';

function AvatarSubstitution(firstName: string, lastName: string) {
    return firstName.substring(0, 1) + lastName.substring(0, 1).toLowerCase();
}
interface Props {
    contact: (contactData | undefined)
    setEditMode: any
    editContacts: any
    refresh: any
    setSelectedContact: any
    setCreateMode: any
    categories: categories[]
}

export default function ContactFormCard({ contact: test2,categories:categories, setEditMode, editContacts, refresh, setSelectedContact, setCreateMode }: Props) {
    const [privateContact, setPrivate] = useState(false);
    const [value, setValue] = useState<categories | null | undefined>(null);

    const initContact = test2 ?? {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthDate: "2023-03-01T19:51:47.929Z",
        category: ""
    };

    const [contact, setContact] = useState(initContact);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    }

    useEffect(() => {
        if(value != null && value != undefined){
            contact.category = value.categoryName.toString();
        }
        console.log(contact);
      }, [value]);
    

    const test = "tesvart";
    return (
        <Card sx={{ maxWidth: 450 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: grey[200] }}>
                        <IconButton aria-label="edit">
                            <UploadIcon />
                        </IconButton>
                    </Avatar>
                }

                title="Dodaj zdjęcie"
            />
            <Form>
                <CardContent key={contact.id}>
                    <Grid >
                        <Grid container rowSpacing={3}>
                            <Grid item xs={6} id="spacing-form">
                                <Form.Label>Imie</Form.Label>
                                <Form.Control type="email" placeholder="Imie" name="firstName" value={contact.firstName} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control type="email" placeholder="Imie" name="lastName" value={contact.lastName} onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={6} id="spacing-form">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="email" placeholder="Phone Number" name="phoneNumber" value={contact.phoneNumber} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" name="email" value={contact.email} onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Kontakt służbowy"
                            onChange={(e) => { setPrivate(e.target.checked) }}
                        />
                        {privateContact &&
                            <>
                                <Autocomplete
                                multiple={false}
                                value={value}
                                onChange={(event: any, newValue: categories | null) => {
                                    setValue(newValue);
                                }}
                                disablePortal
                                size="small"
                                id="combo-box-demo"
                                options={categories}
                                getOptionLabel={(option) => option.categoryName || ""}
                                sx={{ width: 300 }}
                                renderInput={(params:any) => <TextField {...params} label="Kategoria"/>}
                                />
                            </>
                        }
                        {!privateContact &&
                            <>
                                <Autocomplete
                                value={value}
                                onChange={(event: any, newValue: categories | null) => {
                                    setValue(newValue);
                                }}
                                disablePortal
                                size="small"
                                id="combo-box-demo"
                                options={categories}
                                getOptionLabel={(option) => option.categoryName || ""}
                                sx={{ width: 300 }}
                                renderInput={(params:any) => <TextField {...params} label="Kategoria"/>}
                                />
                            </>
                        }

                    </Grid>
                    <Grid container rowSpacing={1}
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={6} container
                            justifyContent="center"
                            alignItems="center">
                            <Button variant="outlined" color="error" onClick={() => { setEditMode(false); setCreateMode(false); setSelectedContact(undefined) }}>Anuluj</Button>
                        </Grid>
                        <Grid item xs={6} container
                            justifyContent="center"
                            alignItems="center">
                            <Button variant="outlined" color="success" onClick={() => { editContacts(contact); refresh(); setSelectedContact(undefined); setEditMode(false); setCreateMode(false) }}>Dodaj</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Form>

            <CardActions disableSpacing>
            </CardActions>

        </Card>

    );
}