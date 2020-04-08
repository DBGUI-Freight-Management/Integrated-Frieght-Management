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

}