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
    static #CONTAINER_START_FRAGMENT = '<span class="mlnc">';

    static #NAME_REGEX_FRAGMENT = '<span class="n(\\d)"(?: lang="(..)" xml:lang="..")?>(.*?)<\\/span>';
    static #NAME_FRAGMENT = '<span class="n{level}" lang="{lang}" xml:lang="{lang}">{name}</span>';
    static #NAME_FRAGMENT_EN = '<span class="n{level}">{name}</span>';

    static #DIVIDER_PLAINTEXT_FRAGMENT = ' | ';
    static #DIVIDER_REGEX_FRAGMENT = '<span> \\| <\\/span>';
    static #DIVIDER_FRAGMENT = `<span>${Util.#DIVIDER_PLAINTEXT_FRAGMENT}</span>`;

    static #CONTAINER_END_REGEX_FRAGMENT = '<\\/span>';
    static #CONTAINER_END_FRAGMENT = '</span>';

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
            if (match[3] !== undefined) {
                this.multilanguageName = true;
                this.nameCount = 1;
                this.name1 = match[3];
                this.name1lang = match[2] || 'en';
            }

            if (match[6] !== undefined) {
                if (match[4] == "3") {
                    this.nameCount = 3;
                    this.name3 = match[6];
                    this.name3lang = match[5] || 'en';
                } else {
                    this.nameCount = 2;
                    this.name2 = match[6];
                    this.name2lang = match[5] || 'en';

                    if (match[9] !== undefined) {
                        this.nameCount = 3;
                        this.name3 = match[9];
                        this.name3lang = match[8] || 'en';
                    }
                }
            }
        }
    }

    #updateNameCount() {
        if (this.name3) {
            this.nameCount = 3;
        } else if (this.name2) {
            this.nameCount = 2;
        } else {
            this.nameCount = 1;
        }
    }

    isGeneratedHTMLValidMultilanguageName(sectionOrActivityName) {
        const test = new Util(sectionOrActivityName);
        return test.multilanguageName;
    }

    convertToMultilanguageName() {
        if (!this.multilanguageName) {
            let [name1, name2, name3] = this.sectionOrActivityName.trim().split('|');

            this.name3 = (name3 || '').trim();
            this.name2 = (name2 || '').trim() || this.name3;
            this.name1 = (name1 || '').trim() || this.name2 || 'Unnamed section';

            this.nameCount = 1 + (this.name2 ? 1 : 0) + (this.name3 ? 1 : 0);

            this.multilanguageName = true;
        }
        /* Parse the sectionOrActivityName from a standard format e.g., from Paepae kōrero | Keeping in touch */

    }

    /**
     * Generate the HTML for the multilanguage name.
     *
     * @returns @string
     */
    generateHTML() {
        this.#updateNameCount();

        let html = Util.#CONTAINER_START_FRAGMENT;
        let namefragement = '';
        if (this.nameCount >= 1) {
            namefragement = this.name1lang === 'en' ? Util.#NAME_FRAGMENT_EN : Util.#NAME_FRAGMENT;
            html += namefragement.replace(/{level}/g, 1).replace(/{lang}/g, this.name1lang).replace(/{name}/g, this.name1);
        }

        if (this.nameCount >= 2 && this.name2) {
            html += Util.#DIVIDER_FRAGMENT;
            namefragement = this.name2lang === 'en' ? Util.#NAME_FRAGMENT_EN : Util.#NAME_FRAGMENT;
            html += namefragement.replace(/{level}/g, 2).replace(/{lang}/g, this.name2lang).replace(/{name}/g, this.name2);
        }

        if (this.nameCount === 3) {
            html += Util.#DIVIDER_FRAGMENT;
            namefragement = this.name3lang === 'en' ? Util.#NAME_FRAGMENT_EN : Util.#NAME_FRAGMENT;
            html += namefragement.replace(/{level}/g, 3).replace(/{lang}/g, this.name3lang).replace(/{name}/g, this.name3);
        }

        html += Util.#CONTAINER_END_FRAGMENT;

        return html;
    }

    /**
     * Generate the a plain text version of the multilanguage name.
     *
     * @returns @string
     */
    generatePlaintext() {
        this.#updateNameCount();

        let plaintext = '';

        if (this.nameCount >= 1) {
            plaintext = this.name1;
        }

        if (this.nameCount >= 2 && this.name2) {
            plaintext += `${Util.#DIVIDER_PLAINTEXT_FRAGMENT}${this.name2}`;
        }
        if (this.nameCount === 3) {
            plaintext += `${Util.#DIVIDER_PLAINTEXT_FRAGMENT}${this.name3}`;
        }

        return plaintext;
    }
}

export default Util;
