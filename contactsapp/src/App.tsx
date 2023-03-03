import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BasicCard from './Comonents/Card';
import { Button, Container, Grid, Paper } from '@mui/material';
import { contactData } from './model/shortData';
import DetailsCard from './Comonents/DetailsCard';
import {v4 as uuid} from "uuid";
import axios from 'axios';
import ContactFormCard from './Comonents/ContactForm';

function mapContacts(responseData:contactData[]) {
  if (responseData.length != 0) {
    const Contacts = (responseData.map(Contact => ({
      id: Contact.id,
      firstName: Contact.firstName,
      lastName: Contact.lastName,
      phoneNumber: Contact.phoneNumber,
      email: Contact.email,
      birthDate: Contact.birthDate,
      category: Contact.category,
    })))
    console.log(Contacts);
    return Contacts;
    
  }
}

const sleep = (delay: number) =>{
  return new Promise((resolve) =>{
      setTimeout(resolve, delay)
  })
}

async function getContacts({setContacts}:any) {
  await sleep(100);
   axios({
    method: 'get',
    url: 'http://localhost:5000/Contatcs/GetAllContacts',
  }).then(function (response) {
    setContacts(mapContacts(response.data));
    });
}
async function editContacts(id:string,contact:contactData) {
   axios({
    method: 'put',
    url: 'http://localhost:5000/Contatcs/ChangeContact?id='+id,
    data: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        id: contact.id,
        phoneNumber: contact.phoneNumber,
        birthDate: contact.birthDate,
        category: contact.category,
    }
  })
}

function App() {
  const [contacts, setContacts] = useState<contactData[]>([]);
  const [selectedContact, setSelectedContact] = useState<contactData | undefined>();
  const [edit,setEditMode] = useState(false);
  const [create,setCreateMode] = useState(false);

  function createOrEdit(contact:contactData){
    if (contact.id) {
      axios({
        method: 'put',
        url: 'http://localhost:5000/Contatcs/ChangeContact?id='+contact.id,
        data: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            id: contact.id,
            phoneNumber: contact.phoneNumber,
            birthDate: contact.birthDate,
            category: contact.category,
        }
      })
    }else{
      axios({
        method: 'post',
        url: 'http://localhost:5000/Contatcs/AddContact',
        data: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            id: uuid(),
            phoneNumber: contact.phoneNumber,
            birthDate: contact.birthDate,
            category: contact.category,
        }
      })

    }
  }


  function refresh(){
    getContacts({setContacts});
  }

  useEffect(() => {
      getContacts({setContacts});
      getAllCategories();
  }, []);

  useEffect(() => {
    setEditMode(edit);
  }, [edit]);

  function handleSelectContact(id:string){
    setSelectedContact(contacts.find(x => x.id === id));
  }

  async function getAllCategories() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/Categories/GetAllCategories',
    }).then(function (response) {
      console.log(response.data);
      });
  }

  async function deleteContact(id:string) {
    console.log("test")
    axios({
      method: 'delete',
      url: 'http://localhost:5000/Contatcs/DeleteContact?id='+id,
    })
  }

  function handleCreateMode(){
    setCreateMode(true);
    setEditMode(false);
    setSelectedContact(undefined);
  }
  function handleDeleteContact(id:string){
    deleteContact(id);
    setEditMode(false);
    setSelectedContact(undefined);
    refresh();
  }

  return (
      <Container maxWidth="xl" id="main-container">
        <Button onClick={()=>handleCreateMode()}>Test</Button>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6} md={7}>
      {contacts && 
      <BasicCard contacts={contacts} selectContact={handleSelectContact} deleteContact={handleDeleteContact} refresh={refresh}></BasicCard>
      }
    </Grid>
    <Grid item xs={6} md={5}>

      {selectedContact && !edit &&
      <>
      <DetailsCard contact={selectedContact} setEditMode={setEditMode}></DetailsCard>
      </>
      }

      {create && 
      <ContactFormCard contact={undefined} setEditMode={setEditMode} setCreateMode={setCreateMode} editContacts={createOrEdit} refresh={refresh} setSelectedContact={setSelectedContact}></ContactFormCard>
      }

      {selectedContact && edit &&
      <ContactFormCard contact={selectedContact} setEditMode={setEditMode} setCreateMode={setCreateMode} editContacts={createOrEdit} refresh={refresh} setSelectedContact={setSelectedContact}></ContactFormCard>
      }

    </Grid>
    </Grid>
      </Container>
  );
}

export default App;

