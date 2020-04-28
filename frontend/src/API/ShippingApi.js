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
                .then(x=>resolve(x.data))
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
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    deboardCrewMember(crewMember){
        return new Promise((resolve,reject)=>
            axios.post(`${this.url}/session/currentRoute/deboard`,{crewMember},this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x)))
    }

    getSessionUserType(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/userType`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    addCompany(name, userID){
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/companies`, {name, userID}, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getShips(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/ships`)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    addShip(shipName, companyID){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/ship`, {name:shipName,companyID}, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    deleteShip(ship){
        return new Promise((resolve,reject)=>{
            axios.delete(`${this.url}/ship/${ship.shipID}/delete`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getShipsByCompany(id){
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/ship/get?companyID=${id}`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getActiveShips(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/ships/getActiveShips`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }


    getShipByID(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/ships/${id}`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getCrewByShipID(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/crew/get/${id}`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getCargoByID(id){
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/cargo/${id}`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getCaptains(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/getCaptains`, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    updateShipStatus(status,routeID,location){
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/post/status`, {route:routeID, status, location}, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getRouteByShipID(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/route/${id}`, this.config)
                .then(x=>resolve(x))
                .catch(x=>reject(x));
        })
    }

    createAccount(account){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/users/post`,account,this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    updateSessionPassword(password){
        return new Promise((resolve,reject)=>{
            axios.put(`${this.url}/session/updatePassword`,{password},this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x))
        })
    }

    updateSessionCompany(id){
        return new Promise((resolve,reject)=>{
            axios.put(`${this.url}/session/updateCaptainCompany`,{id},this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        })
    }

    updateSessionEmail(email){
        return new Promise((resolve,reject)=>
            axios.put(`${this.url}/session/updateEmail`,{email},this.config)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x))
        )
    }

    getUserID(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/session/userID`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x));
        });
    }

    getRecentStatuses(ship){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/ships/recentStatus/${ship}`)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x))
        })
    }

    getRecentLogs(ship){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/ships/recentLog/${ship}`)
                .then(x=>resolve(x.data))
                .catch(x=>alert(x))
        })
    }

    addRoute(ship,captain,destination, start, endDate){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.url}/route`, {ship,captain,destination,start,endDate}, this.config)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x));
        })
    }

    getShipRoutes(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/shipRoutes`)
                .then(x=>resolve(x.data))
                .catch(x=>reject(x.data))
        })
    }

    getCaptainRoutes(){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/captainRoutes`)
                .then(x=>resolve(x.data))
                .catch(x=>resolve(x.data))
        })
    }
}