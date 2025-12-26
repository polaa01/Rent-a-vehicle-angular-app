export class Manufacturer
{    
     id: number;
     name: string;
     country: string;
     phone: string;
     address: string;
     fax: string;
     email: string;


    constructor(id: number, name: string, country: string, phone: string, address: string, fax: string, email: string)
    {
        this.id=id;
        this.name=name;
        this.country=country;
        this.phone=phone;
        this.address=address;
        this.fax=fax;
        this.email=email;
    }

}