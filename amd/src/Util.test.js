/**
 * TODO describe module Util.test
 *
 * jestrunner tests for class Util
 * Set "Jest command" to "npm run test" and Project Path to location of package.json e.g., "C:\github\moodle405\moodle"
 *
 * @module     local_multilanguagenames/Util.test
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Util from './Util.js';

test('1 multilang name', () => {
    const util = new Util('<span class="mlnc"><span lang="en">Welcome</span></span>');
    expect(util.name1).toBe('Welcome');
    expect(util.name1lang).toBe('en');
});

test('2 multilang names', () => {
    const util = new Util('<span class="mlnc"><span lang="en">name1-en</span><span class="divider"> | </span><span lang="mi">name2-mi</span></span>');
    expect(util.name1).toBe('name1-en');
    expect(util.name1lang).toBe('en');
    expect(util.name2).toBe('name2-mi');
    expect(util.name2lang).toBe('mi');
});