import axios from "axios";
axios.defaults.withCredentials = true;

export class ShippingApi{
    url = `http://localhost:8000/api`;

    

    config={
        withCredentials: true
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
                    resolve(x.data)})
                .catch(x=>{
                    alert(x);
                    reject(x);
                })
        })
    }

    getLogs(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/logs`,this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    createLog(header,message,location){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/session/logs/create`,{header,message,location},this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    getUserInfo(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/getUserInfo`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    getSessionStatus(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/statuses`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    createStatus(status,location){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/session/statuses/create`,{status,location},this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    getSessionCrew(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/crew`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    addSessionCrew(crew){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/session/crew`,crew,this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x))
        })
    }

    getSessionShip(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/ship`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x))
        })
    }
    

    getSessionCargo(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/cargo`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x))
        })
    }

    addSessionCargo(cargo){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/session/cargo`,cargo,this.config)
                .then(x=>resolve(x))
                .catch(x=>alert(x));
        })
    }

    getCompanies(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/companies/get`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    getSessionRoute(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/currentRoute`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }
}