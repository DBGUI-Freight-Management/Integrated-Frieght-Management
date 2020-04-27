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
    
    completeSessionRoute(){
        return new Promise((resolve,reject)=>{
            axios.put(`${this.url}/session/currentRoute/complete`,this.config)
                .then(x=>resolve(x))
                .catch(x=>alert(x));
        })
    }

    deboardCrewMember(crewMember){
        return new Promise((resolve,reject)=>
            axios.post(`${this.url}/session/currentRoute/deboard`,{crewMember},this.config)
                .then(x=>resolve(x))
                .catch(x=>alert(x)))
    }

    getSessionUserType(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/userType`)
                .then(x=>resolve(x))
                .catch(x=>alert(x));
        })
    }

    addCompany(company){
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/companies/post?name=${company.name}&freightManagerID=${1}`, company, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getShips(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/ships/get`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    //tenative -> needs Steve actual add ship endpoint
    addShip(ship){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/ship/post?ship=${ship}`, ship, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    deleteShip(ship){
        return new Promise((resolve,reject)=>{
            axios.delete(`${this.url}/ship/${ship.shipID}/delete`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getShipsByCompany(id){
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/ship/get?companyID=${id}`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getActiveShips(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/ships/getActiveShips`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getShipByID(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/ships/${id}`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getCrewByShipID(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/crew/get/${id}`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getCargoByID(id){
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/cargo/${id}`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getCaptains(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/getCaptains`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    updateShipStatus(status,routeID,location){
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/post/status`, {routeID, status, location}, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    getRouteByShipID(id){

    }
}