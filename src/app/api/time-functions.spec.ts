import { TimeFunctions } from "./time-functions";

describe('Nettoarbeitszeit berechen', () => {
    it('Mit Nachkommastellen', () => {
        const result = TimeFunctions.getNettoArbeitszeit(700, 1430, 0);
        expect(result).toBe(7.5);
    });

    it('Ohne Nachkommastellen', () => {
        const result = TimeFunctions.getNettoArbeitszeit(700, 1400, 0);
        expect(result).toBe(7);
    });

});