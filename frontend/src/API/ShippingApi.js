import axios from "axios";
axios.defaults.withCredentials = true;

export class ShippingApi{
    url = `http://localhost:8000/api`;

    

    config={
        withCredentials: true
    }

    getCompanies(){
        return new Promise((resolve,reject)=>{
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
                })
        })
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
            axios.get(`${this.url}/session/logs`,this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

}