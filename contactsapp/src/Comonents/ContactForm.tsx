import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { shortData } from '../model/shortData';
import { Button, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

function AvatarSubstitution(firstName: string, lastName: string) {
    return firstName.substring(0, 1) + lastName.substring(0, 1).toLowerCase();
}
const currencies = [
    {
        value: 'Kierownik',
        label: 'Kierownik',
    },
    {
        value: 'Szef2',
        label: 'Szef2',
    },
    {
        value: 'Szef3',
        label: 'Szef3',
    },
    {
        value: 'Szef4',
        label: 'Szef4',
    },
];


export default function ContactFormCard(props:{contact:shortData,setEditMode:any}) {
    const test = "tesvart";
    return (
        <Card sx={{ maxWidth: 345 }}>
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
            <CardContent key={props.contact.id}>
                <Grid>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Imie" variant="standard" size="small" defaultValue={props.contact.firstName} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Nazwisko" variant="standard" size="small" defaultValue={props.contact.lastName}/>

                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Numer telefonu" variant="standard" size="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Email" variant="standard" size="small">ets </TextField>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Numer telefonu" variant="standard" size="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-select-currency-native"
                                select
                                label="Kategoria"
                                SelectProps={{
                                    native: true,
                                }}
                                variant="standard"
                            >
                                {currencies.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                </Grid>
                <Button variant="outlined" color="error" onClick={()=>{props.setEditMode(false)}}>Anuluj</Button>
                <Button variant="outlined" color="success">Dodaj</Button>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>

        </Card>
    );
}