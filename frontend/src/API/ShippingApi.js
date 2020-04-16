import axios from "axios";


export class ShippingApi{
    url = `http://localhost:8000/api`;

    ShippingApi(){
        this.loggedIn=false;
        this.userID=-1;
    }

    config={
        headers:{
            authorization:  'react-app'
        }
    }

    getCompanies(){
        return new Promise((resolve,reject)=>{
            console.log(`${this.url}/companies/get`);
            axios.get(`${this.url}/companies/get`,this.config)
                    .then(x=>resolve(x.data))
                    .catch(x=>{
                        alert(x);
                        reject(x);
                    })
        });
    }

    isLoggedIn(){
        return this.loggedIn;
    }

    attemptLogin(user,pass){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/login/${user}/${pass}`,this.config)
                .then(x=>{
                    this.userID=x.data.userID;
                    this.loggedIn=true;
                    console.log(this.userID);
                    resolve(x.data)})
                .catch(x=>{
                    alert(x);
                    reject(x);
                })
        })
    }

    getLogs(){
        console.log(this.userID);
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/logs/${this.userID}`,this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

}