import { ArbeitszeitModel } from "./arbeitszeit-model"

export class Arbeitszeit implements ArbeitszeitModel {

    public id!: number;
    public datum!: Date;
    public von!: string;
    public bis!: string;
    public pause!: number;

    // Wieso geht das nicht
    // Error: src/app/arbeitszeit-detail/arbeitszeit-detail.component.ts:34:5 - error TS2741: Property 'getNettoArbeitszeit' is missing in type 
    // '{ id: number; datum: string; von: string; bis: string; pause: number; }' but required in type 'Arbeitszeit'
    // this.arbeitszeit = { ... this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit() }; // Compilefehler
    //getNettoArbeitszeit() : number {
    //    return this.pause;
    //}

}
