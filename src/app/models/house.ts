export class House {
    id?: number;
    name: string = '';
    price : number = 0;
    place : string = '';
    picture : string = '';
    disponible: boolean;
   
   
    constructor() {
        this.disponible = true;
}
}