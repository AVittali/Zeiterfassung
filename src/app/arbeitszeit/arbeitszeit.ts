import { ArbeitszeitModel } from "./arbeitszeit-model"

export class Arbeitszeit implements ArbeitszeitModel {

    public id!: string;
    public datum!: Date;
    public von!: number;
    public bis!: number;
    public pause!: number;
   
    //constructor(id: string, datum: Date, von: string, bis: string, pause: number) { }

    public getNettoArbeitszeit(): number {
        return this.bis - this.von;
    }

}
