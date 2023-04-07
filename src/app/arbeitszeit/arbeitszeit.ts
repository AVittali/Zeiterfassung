import { TimeFunctions } from "../api/time-functions";
import { ArbeitszeitModel } from "./arbeitszeit-model"

export class Arbeitszeit implements ArbeitszeitModel {

    public id!: string;
    public datum!: Date;
    public von!: number;
    public bis!: number;
    public pause!: number;

   
    //constructor(id: string, datum: Date, von: string, bis: string, pause: number) { }

    // TODO Keine Ahnung warum das hier nicht geht. getNettoArbeitszeit ist keine Function.
    public getNettoArbeitszeit(): number {
        return Arbeitszeit.getNettoArbeitszeit(this);
    }

    public static getNettoArbeitszeit(arbeitszeit: Arbeitszeit): number {

        return TimeFunctions.getNettoArbeitszeit(arbeitszeit.von, arbeitszeit.bis, arbeitszeit.pause);
    }

}
