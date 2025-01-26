/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-14
 * @description Restructure a date string from MM/DD/YYYY to DD/MM/YYYY format.
 */



/**
 * Restructure the date from MM/DD/YYYY to DD/MM/YYYY format.
 * @param {string | null} date - The date string to restructure, or null.
 * @returns {string} - The restructured date, or "Invalid Date" if input is null or invalid.
 */
export function restructureDate(date: string | null): string {

    if (date) {

        // split the date into an array and apply destructuring to create variables
        const [m, d, y] = date.split("/");

        return `${d}/${m}/${y}`;
    }

}