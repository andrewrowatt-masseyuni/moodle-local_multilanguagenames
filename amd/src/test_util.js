/* eslint-disable no-console */
/* eslint-disable max-len */
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
 * TODO describe module test_util
 *
 * @module     local_multilanguagenames/test_util
 * @copyright  2025 2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const Util = require('./Util.js').default;

var util;
util = new Util('<span class="mlnc"><span lang="en">Welcome</span></span>');
console.log(util.name1 == 'Welcome' ? 'Passed' : 'Failed');
util = new Util('<span class="mlnc"><span lang="en">Welcome</span><span class="divider"> | </span><span lang="mi">Nau mai</span></span>');
console.log(util.name2lang == 'mi' ? 'Passed' : 'Failed');
util = new Util('<span class="mlnc"><span lang="en">name1-en</span><span class="divider"> | </span><span lang="mi">name2-mi</span><span class="divider"> | </span><span lang="fr">name3-fr</span></span>');
console.log(util.name2lang == 'mi' ? 'Passed' : 'Failed');
console.log(util.name3 == 'name3-fr' ? 'Passed' : 'Failed');

util = new Util('Welcome', 'en', 'Nau mai', 'mi');
console.log(util.name1 == 'Welcome' ? 'Passed' : 'Failed');
console.log(util.name2lang == 'mi' ? 'Passed' : 'Failed');

util = new Util('Welcome');
console.log(!util.multilanguageName ? 'Passed' : 'Failed');

util = new Util('Welcome | Nau mai');
console.log(!util.multilanguageName ? 'Passed' : 'Failed');
util.convertToMultilanguageName();
console.log(util.multilanguageName ? 'Passed' : 'Failed');

