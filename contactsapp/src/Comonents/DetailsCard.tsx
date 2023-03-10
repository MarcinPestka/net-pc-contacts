import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { contactData } from '../model/shortData';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

function AvatarSubstitution(firstName: string, lastName: string) {
    return firstName.substring(0, 1) + lastName.substring(0, 1).toLowerCase();
}

export default function RecipeReviewCard(props: { contact: contactData, logedIn: any, setEditMode: any, setSelectedContact: any }) {

    const AvatarString = AvatarSubstitution(props.contact.firstName, props.contact.lastName);

    return (
        <Card sx={{ maxWidth: 450 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                        {AvatarString}
                    </Avatar>
                }
                action={
                    <IconButton onClick={()=>props.setSelectedContact(undefined)}>
                        <CloseIcon />
                    </IconButton>
                }

                title={props.contact.firstName + " " + props.contact.lastName}
                subheader="test" //{props.contact.componay}
            />
            <CardContent>
                <Grid>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={6}>
                            <p id="card-title">Imie</p>
                            <h3 id="card-text-value">{props.contact.firstName}</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <p id="card-title">Nazwisko</p>
                            <h3 id="card-text-value">{props.contact.lastName}</h3>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={6}>
                            <p id="card-title">Numer telefonu</p>
                            <h3 id="card-text-value">{props.contact.phoneNumber}</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <p id="card-title">Email</p>
                            <h3 id="card-text-value">{props.contact.email}</h3>
                        </Grid>
                    </Grid>
                </Grid>
                {props.logedIn &&
                    <IconButton aria-label="edit" onClick={() => { props.setEditMode(true) }}>
                        <EditIcon />
                    </IconButton>
                }
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>

        </Card>
    );
}