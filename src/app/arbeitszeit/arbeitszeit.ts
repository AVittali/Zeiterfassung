import { ArbeitszeitModel } from "./arbeitszeit-model"

export class Arbeitszeit implements ArbeitszeitModel {

    public id!: string;
    public datum!: Date;
    public von!: string;
    public bis!: string;
    public pause!: number;

    // Wieso geht das nicht
    // Error: src/app/arbeitszeit-detail/arbeitszeit-detail.component.ts:34:5 - error TS2741: Property 'getNettoArbeitszeit' is missing in type 
    // '{ id: number; datum: string; von: string; bis: string; pause: number; }' but required in type 'Arbeitszeit'
    // this.arbeitszeit = { ... this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit() }; // Compilefehler
    // public getNettoArbeitszeit() : number {
    //     return this.pause;
    // }
    
    //constructor(id: string, datum: Date, von: string, bis: string, pause: number) { }

    public getNettoArbeitszeit(): number {
        // TODO Ausprogrammieren
        return 0;
    }

}
