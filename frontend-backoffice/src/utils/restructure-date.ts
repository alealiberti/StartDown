/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-14
 * @description restructure a date string from MM/DD/YYYY to DD/MM/YYYY format.
 */



/**
 * Restructure the date from MM/DD/YYYY to DD/MM/YYYY format.
 * @param {string} date - the date string to restructure
 * @returns {string} - returned the date formatted
 */
export function restructureDate(date: string): string {

    // split the date into an array and apply destructuring to create variables
    const [m, d, y] = date.split("/");

    return `${d}/${m}/${y}`;
}