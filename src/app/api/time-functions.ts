import { differenceInHours } from "date-fns";

export class TimeFunctions {

    public static formatZeit(zeitValue: number): String {

        var stunden = this.getStunden(zeitValue);
        var minuten = this.getMinuten(zeitValue);
        return this.formatNumber(stunden) + ":" + this.formatNumber(minuten);

    }

    public static getNettoArbeitszeit(von: number, bis: number, pause: number): number {
        var datumVon = new Date();
        datumVon.setHours(this.getStunden(von));
        datumVon.setMinutes(this.getMinuten(von));

        var datumBis = new Date(datumVon);
        datumBis.setHours(this.getStunden(bis));
        datumBis.setMinutes(this.getMinuten(bis));

        var bruttoArbeitszeit = differenceInHours(datumBis, datumVon);

        // TODO Pause berücksichtigen
        return bruttoArbeitszeit;

    }

    private static formatNumber(number: number): String {
        if (number < 10) {
            return "0" + number;
        }

        return number + "";
    }

    private static createDatum(datum: Date, time: number): Date {
        datum.setHours(this.getStunden(time));
        datum.setMinutes(this.getMinuten(time));
        return datum;
    }

    private static getStunden(zeitValue: number): number {
        return Math.floor(zeitValue / 100);
    }

    private static getMinuten(zeitValue: number): number {
        return zeitValue % 100;
    }




}