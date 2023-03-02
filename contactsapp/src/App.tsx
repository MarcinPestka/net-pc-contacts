import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BasicCard from './Comonents/Card';
import { Container, Grid, Paper } from '@mui/material';
import { shortData } from './model/shortData';
import DetailsCard from './Comonents/DetailsCard';
import axios from 'axios';

function mapContacts(responseData:shortData[]) {
  if (responseData.length != 0) {
    console.log(responseData);
    const Contacts = (responseData.map(Contact => ({
      id: Contact.id,
      firstName: Contact.firstName,
      lastName: Contact.lastName,
    })))
    return Contacts;
    
  }
}


function getContacts({setContacts}:any) {
  axios({
    method: 'get',
    url: 'http://localhost:5000/Contatcs/GetAllContacts',
  }).then(function (response) {
    setContacts(mapContacts(response.data));
    });
}


function App() {
  const [contacts, setContacts] = useState<shortData[]>([]);
  const [selectedContact, setSelectedContact] = useState<shortData | undefined>();

  useEffect(() => {
      getContacts({setContacts});
  }, []);

  function handleSelectContact(id:string){
    setSelectedContact(contacts.find(x => x.id === id));
  }
  
  return (
      <Container maxWidth="xl" id="main-container">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6} md={8}>
      {contacts && 
    <BasicCard contacts={contacts} selectContact={handleSelectContact}></BasicCard>
}
    </Grid>
    <Grid item xs={6} md={4}>
      {selectedContact && 
        <DetailsCard contact={selectedContact}></DetailsCard>
      }
    </Grid>
    </Grid>
      </Container>
  );
}

export default App;
