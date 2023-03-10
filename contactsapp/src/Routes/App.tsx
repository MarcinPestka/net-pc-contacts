import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import BasicCard from '../Comonents/Card';
import { Button, Container, Grid, Paper } from '@mui/material';
import { contactData } from '../model/shortData';
import DetailsCard from '../Comonents/DetailsCard';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import ContactFormCard from '../Comonents/ContactForm';
import category from '../model/categories';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import Navbar from '../Comonents/Navbar';
import { isConstructorDeclaration } from 'typescript';
import BasicCard2 from '../Comonents/Card copy';


function mapContacts(responseData: contactData[]) {
  if (responseData.length != 0) {
    const Contacts = (responseData.map(Contact => ({
      id: Contact.id,
      firstName: Contact.firstName,
      lastName: Contact.lastName,
      phoneNumber: Contact.phoneNumber,
      email: Contact.email,
      birthDate: Contact.birthDate,
      category: Contact.category,
      isPrivate: Contact.isPrivate,
    })))
    console.log(Contacts);
    return Contacts;

  }
}

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}


function App() {
  const {userStore:{user}} = useStore();
  const [contacts, setContacts] = useState<contactData[]>([]);
  const [selectedContact, setSelectedContact] = useState<contactData | undefined>();
  const [edit, setEditMode] = useState(false);
  const [create, setCreateMode] = useState(false);
  const [categories, setCategories] = useState<category[]>([]);
  const [logedIn, setLoggedIn] = useState(false);

  const userId = JSON.parse(localStorage.getItem("UserStore") || '{}').userId;
  const jwt = "Bearer "+JSON.parse(localStorage.getItem("UserStore") || '{}').token;

  useEffect(() => {
    if(jwt != "Bearer null"){
      setLoggedIn(true);
    }
  }, [jwt]);

  async function getContacts({ setContacts }: any) {
    if(!logedIn){
      axios({
        method: 'get',
        url: 'http://localhost:5000/Contatcs/GetAllContactsUnAuth',
        headers:{
          Authorization: jwt,
        } 
      }).then(function (response) {
        setContacts(mapContacts(response.data));
      });
    }else{
      await sleep(100);
      axios({
        method: 'get',
        url: 'http://localhost:5000/Contatcs/GetAllContactsUnAuth',
        //url: 'http://localhost:5000/Contatcs/GetAllContacts?UserID='+userId,
        headers:{
          Authorization: jwt,
        } 
      }).then(function (response) {
        setContacts(mapContacts(response.data));
      });
    }
}

  async function createOrEdit(contact: contactData) {
    await sleep(100);
    if (contact.id) {
      axios({
        method: 'put',
        url: 'http://localhost:5000/Contatcs/ChangeContact?id=' + contact.id,
        data: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          id: contact.id,
          phoneNumber: contact.phoneNumber,
          birthDate: contact.birthDate,
          category: contact.category,
          isPrivate: contact.isPrivate
        },
        headers:{
          Authorization: jwt,
        } 
      })
    } else {
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
          userId:userId,
        },
        headers:{
          Authorization: jwt,
        } 
      })
    }
  }
  useEffect(() => {
    if(jwt != "Bearer null"){
      setLoggedIn(true);
    }
    sleep(100);
    getContacts({ setContacts });
    getAllCategories();
  }, []);

  async function refresh() {
    await sleep(100);
    getContacts({ setContacts });
  }



  useEffect(() => {
    setEditMode(edit);
  }, [edit]);

  function handleSelectContact(id: string) {
    setSelectedContact(contacts.find(x => x.id === id));
  }

  async function getAllCategories() {
  await sleep(100);
  axios({
      method: 'get',
      url: 'http://localhost:5000/Categories/GetAllCategories',
      headers:{
        Authorization: jwt,
      } 
    }).then(function (response) {
      setCategories(response.data);
    });
  }

  async function deleteContact(id: string) {
    await sleep(100);
    axios({
      method: 'delete',
      url: 'http://localhost:5000/Contatcs/DeleteContact?id=' + id,
      headers:{
        Authorization: jwt,
      } 
    })
  }

  function handleCreateMode() {
    setCreateMode(true);
    setEditMode(false);
    setSelectedContact(undefined);
  }
  function handleDeleteContact(id: string) {
    deleteContact(id);
    setEditMode(false);
    setSelectedContact(undefined);
    refresh();
  }

  return (
    <>
    <Navbar logedIn={logedIn}></Navbar>
    <Container maxWidth="xl" id="main-container">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={7} md={7}>
          {contacts &&
            <BasicCard contacts={contacts} selectContact={handleSelectContact} deleteContact={handleDeleteContact} refresh={refresh} logedIn={logedIn}></BasicCard>
          }
        </Grid>
        <Grid item xs={12} sm={5} md={5}  
                        justifyContent="center"
                        alignItems="center">
        <Button variant="outlined" color="success" onClick={() => handleCreateMode()}>Dodaj nowy kontakt</Button>

          {selectedContact && !edit &&
            <>
              <DetailsCard contact={selectedContact} setEditMode={setEditMode} logedIn={logedIn} setSelectedContact={setSelectedContact}></DetailsCard>
            </>
          }

          {create &&
            <ContactFormCard categories={categories} contact={undefined} setEditMode={setEditMode} setCreateMode={setCreateMode} editContacts={createOrEdit} refresh={refresh} setSelectedContact={setSelectedContact}></ContactFormCard>
          }

          {selectedContact && edit &&
            <ContactFormCard categories={categories} contact={selectedContact} setEditMode={setEditMode} setCreateMode={setCreateMode} editContacts={createOrEdit} refresh={refresh} setSelectedContact={setSelectedContact}></ContactFormCard>
          }

        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default observer(App);

