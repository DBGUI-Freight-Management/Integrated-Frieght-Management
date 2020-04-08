
export class Ship{

    crew = [];

    constructor(name, owningCompany, status = "Just Created", location = "Miami", pastLocations = ["Seattle", "LA"]){
        this.name=name;
        this.owningCompany=owningCompany;
        this.status=status;
        this.location=location;
        this.pastLocations=pastLocations;
        //past locations tenative until we figure out where it actually goes
    }
    getName(){
        return this.name;
    }

    getCompany() {
        return this.owningCompany;
    }

    getStatus() {
        return this.status;
    }

    getLocation(){
        return this.location;
    }

    getPastLocations(){
        return this.pastLocations;
    }

    setStatus(stat) {
        this.status = stat;
    }
}