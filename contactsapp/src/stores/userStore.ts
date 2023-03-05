import userInfo from '../model/userInfo';
import axios from 'axios';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Navigate } from 'react-router-dom';
import { router } from '../index';
import { makePersistable } from 'mobx-persist-store';

export default class UserStore {
    user: userInfo | null = null;
    token: string | null = localStorage.getItem("jwt");
    userId: string | undefined = this.user?.Id;

    constructor(){
        makeAutoObservable(this);

        makePersistable(this, { name: 'UserStore', properties: ['userId','token'], storage: window.localStorage });
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login =async (creds:userInfo) => {
        try{
            const user = await axios({
                method: 'post',
                url: 'http://localhost:5000/Accout/login',
                data: creds
              }).then(function (response) {
                return response.data;
              });
              this.setToken(user.token);
              runInAction(() => this.user = user);
              this.userId = user.id;
              router.navigate("/");
            }
        catch(error){
            console.log(error);
        }
    }

    register =async (creds:userInfo) => {
        try{
            const user = await axios({
                method: 'post',
                url: 'http://localhost:5000/Accout/register',
                data: creds
              }).then(function (response) {
                return response.data;
              });
              this.setToken(user.token);
              runInAction(() => this.user = user);
              this.userId = user.id;
              router.navigate("/");
            }
        catch(error){
            console.log(error);
        }
    }

    logout = () =>{
        console.log("test");
        localStorage.removeItem("UserStore");
        router.navigate("/login");
    }

    setToken = (token: string | null) => {
        this.token = token;
    }
}