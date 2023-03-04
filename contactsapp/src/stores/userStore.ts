import userInfo from '../model/userInfo';
import axios from 'axios';
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Navigate } from 'react-router-dom';
import { router } from '../index';

export default class UserStore {
    user: userInfo | null = null;
    token: string | null = localStorage.getItem("jwt");

    constructor(){
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
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
              router.navigate("/");
            }
        catch{
            
        }
    }

    logout = () =>{
        this.setToken(null);
        this.user = null;
        router.navigate("/login");
    }

    getUser = async (creds:userInfo) => {
        try{
            const user = await axios({
                method: 'get',
                url: 'http://localhost:5000/Accout/getUser',
                headers:{
                  Authorization: "Bearer "+creds?.token?.toString(),
                } 
              }).then(function (response) {
                return response.data;
              });
              console.log("test");
              runInAction(() => this.user = user);
        } catch (error){
            console.log(error);
        }
    }

    setToken = (token: string | null) => {
        this.token = token;
    }


}