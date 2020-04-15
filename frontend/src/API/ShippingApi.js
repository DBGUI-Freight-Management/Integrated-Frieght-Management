import axios from "axios";


export class ShippingApi{
    url = `http://localhost:8000/api`;

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
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/isLoggedIn`,this.config)
            .then(x=>resolve(x.data))
            .catch(x=>{
                alert(x);
                reject(x);
            })
        });
    }

    attemptLogin(user,pass){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/login/${user}/${pass}`)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                })
        })
    }

    getLogs(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/logs/1`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

}