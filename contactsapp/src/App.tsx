import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BasicCard from './Comonents/Card';
import { Container, Grid, Paper } from '@mui/material';
import { shortData } from './model/shortData';
import DetailsCard from './Comonents/DetailsCard';

const dane = [
  {
    id:"0",
    firstName:"Marcin",
    lastName:"Pestka",
    phoneNumber:"123 123 123",
    componay:"Net PC Sp. Z o.o.",
    eMail:"pestka.m.j@gmail.com",
    private:false,
  },
  {
    id:"1",
    firstName:"Adam",
    lastName:"Małysz",
    phoneNumber:"222 222 222",
    componay:"",
    eMail:"adam@malysz.pl",
    private:true,
  },
  {
    id:"2",
    firstName:"Mariusz",
    lastName:"Pudzianowski",
    phoneNumber:"333 333 333",
    componay:"Budimex Sp. A.",
    eMail:"mar@iusz.com",
    private:true,
  }
]




function App() {
  const [contacts, setContacts] = useState<shortData[]>(dane);
  const [selectedContact, setSelectedContact] = useState<shortData | undefined>();

  function handleSelectContact(id:string){
    setSelectedContact(contacts.find(x => x.id === id));
  }
  
  return (
      <Container maxWidth="xl">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid xs={6}>
    <BasicCard dane={dane} selectContact={handleSelectContact}></BasicCard>
    </Grid>
    <Grid xs={6}>
      {selectedContact && 
        <DetailsCard contact={selectedContact}></DetailsCard>
      }
    </Grid>
    </Grid>
      </Container>
  );
}

export default App;
