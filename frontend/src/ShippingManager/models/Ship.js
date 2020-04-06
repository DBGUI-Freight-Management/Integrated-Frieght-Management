
export class Ship{
    constructor(name, owningCompany, status = "Just Created"){
        this.name=name;
        this.owningCompany=owningCompany;
        this.status=status;
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

    setStatus(stat) {
        this.status = stat;
    }
}