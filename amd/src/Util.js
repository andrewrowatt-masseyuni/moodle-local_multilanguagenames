
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * TODO describe module Util
 *
 * @module     local_multilanguagenames/Util
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// https://regex101.com/r/cRgZFS
// https://regex101.com/r/sIVMIq
// https://regex101.com/r/bDAO3Z
// https://regex101.com/r/Wsn3yl name fragment

/* eslint-disable max-len */
class Util {
    static #CONTAINER_START_REGEX_FRAGMENT = '<span class="mlnc">';
    static #NAME_REGEX_FRAGMENT = '<span class="mln[1-3]" lang="(..)"(?: xml:lang="..")?>(.*?)<\\/span>';
    static #DIVIDER_REGEX_FRAGMENT = '<span class="divider"> \\| <\\/span>';
    static #CONTAINER_END_REGEX_FRAGMENT = '<\\/span>';

    static #NAME_REGEX = new RegExp(`${Util.#CONTAINER_START_REGEX_FRAGMENT}${Util.#NAME_REGEX_FRAGMENT}(?:${Util.#DIVIDER_REGEX_FRAGMENT}${Util.#NAME_REGEX_FRAGMENT}(?:${Util.#DIVIDER_REGEX_FRAGMENT}${Util.#NAME_REGEX_FRAGMENT})?)?${Util.#CONTAINER_END_REGEX_FRAGMENT}`, 'g');

    // Default state
    sectionOrActivityName = '';
    multilanguageName = false;
    nameCount = 0;
    name1 = '';
    name1lang = 'en';
    name2 = '';
    name2lang = 'en';
    name3 = '';
    name3lang = 'en';

    constructor(sectionOrActivityNameOrName1, name1lang, name2 = '', name2lang = '', name3 = '', name3lang = '') {
        if (name1lang === undefined) {
            this.sectionOrActivityName = sectionOrActivityNameOrName1;
            this.#parseName();
        } else {
            this.name1 = sectionOrActivityNameOrName1;
            this.name1lang = name1lang;
            this.nameCount = 1;

            this.name2 = name2;
            this.name2lang = name2lang;
            if (name2 && name2lang) {
                this.nameCount = 2;
            }

            this.name3 = name3;
            this.name3lang = name3lang;
            if (name3 && name3lang) {
                this.nameCount = 3;
            }

        }
    }

    #parseName() {
        let [match] = [...this.sectionOrActivityName.matchAll(Util.#NAME_REGEX, 'g')];

        if (match) {
            if (match[1] !== undefined && match[2] !== undefined) {
                this.multilanguageName = true;
                this.nameCount = 1;
                this.name1 = match[2];
                this.name1lang = match[1];

                if (match[3] !== undefined && match[4] !== undefined) {
                    this.nameCount = 2;
                    this.name2 = match[4];
                    this.name2lang = match[3];

                    if (match[5] !== undefined && match[6] !== undefined) {
                        this.nameCount = 3;
                        this.name3 = match[6];
                        this.name3lang = match[5];
                    }
                }
            }
        }
    }

    isGeneratedHTMLValidMultilanguageName(sectionOrActivityName) {
        const test = new Util(sectionOrActivityName);
        return test.multilanguageName;
    }

    convertToMultilanguageName() {
        /* Parse the sectionOrActivityName from a standard format e.g., from Paepae kōrero | Keeping in touch */
        let [name1, name2, name3] = this.sectionOrActivityName.trim().split(' | ');

            window.console.log(name1);
            window.console.log(name2);
            window.console.log(name3);
    }

    /**
     * Generate the HTML for the multilanguage name.
     *
     * @returns @string
     */
    generateHTML() {
        return this.nameCount;
    }
}

export default Util;