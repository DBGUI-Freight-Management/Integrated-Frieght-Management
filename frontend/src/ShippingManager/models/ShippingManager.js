import { Company } from "./Company";
import { Ship } from "./Ship";
import { Captain } from "./Captain";
import { Log } from "./Log";


export class ShippingManager{
    constructor(){
        this.companies = [
            new Company("Trans-Atlantic", "1001 101st New York, New York 0000","trans@atlantic.com", "Best Shipping this side of the world"),
            new Company("Fiji Shipping","1 Island Blvd Oceanside Fiji", "contact@FijiShipping.com", "Outwit Outplay Outlast"),
            new Company("Pacific Specifics", "1250 Manhattan Beach Blvd, CA 90266", "pacificspecifics@aol.com", "Best Shipping this side of the world"),
            new Company("Kapital Shipping", "46 East Lawn, Charlotesville VA", "stephen@jackson.org", "Fastest Shipping around")
        ]

        this.ships=[
            new Ship("SS Enterprise", "Trans-Atlantic"),
            new Ship("SS Discovery", "Trans-Atlantic"),
            new Ship("Boston Rob", "Fiji Shipping"),
            new Ship("Pavarti", "Fiji Shipping"),
            new Ship("Tyson", "Fiji Shipping"),
            new Ship("Probst", "Fiji Shipping"),
            new Ship("Narniphilous", "Pacific Specifics"),
            new Ship("SS Keystone", "Kapital Shipping")
        ]

        this.captains=[
            new Captain("Steve", this.companies.find(company=>company.name==="Kapital Shipping")),
            new Captain("Dave", this.companies.find(company=>company.name==="Pacific Specifics"))
        ]

        this.messages=[
        ]

    }

    addNewCompany(name,address,email,description){
        this.companies.push(new Company(name,address,email,description));
    }


    addCompany(company){
        this.companies.push(company);
    }

    addShip(ship){
        this.ships.push(ship);
    }

    removeShip(name, company) {
        var index = this.findShipIndex(name, company);
        this.ships.splice(index, 1); 
    }

    findShipIndex(name, company) {
        //swap to filter later bc its better
        for (let i = 0; i < this.ships.length; i++) {
            var n = this.ships[i].getName();
            var c = this.ships[i].getCompany();
            if (n === name && c === company) {
                return i;
            }
        }
    }

    updateShipStatus(name, company, status) {
        var index = this.findShipIndex(name, company);
        this.ships[index].setStatus(status);
    }
    
    getCompanies(){
        return this.companies;
    }

    changeCaptainCompany(captain,company){
        for(let i =0; i < this.captains.length;i++){
            if(this.captains[i].name===captain.name){
                this.captains[i].company=company;
            }
        }
    }

    addLogMessage(message){
        this.messages.push(new Log(message.captain, message.date, message.header, message.message));
    }
}