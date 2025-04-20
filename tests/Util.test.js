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

// Mdlcode-disable-next-line
import Util from '../amd/src/Util.js';

test('1 multilang name', () => {
    const util = new Util('<span class="mlnc"><span class="mln1" lang="en">name1-en</span></span>');
    expect(util.multilanguageName).toBe(true);
    expect(util.name1).toBe('name1-en');
    expect(util.name1lang).toBe('en');
});

test('2 multilang names', () => {
    const util = new Util('<span class="mlnc"><span class="mln1" lang="en">name1-en</span><span class="divider"> | </span><span class="mln2" lang="mi">name2-mi</span></span>');
    expect(util.multilanguageName).toBe(true);
    expect(util.name1).toBe('name1-en');
    expect(util.name1lang).toBe('en');
    expect(util.name2).toBe('name2-mi');
    expect(util.name2lang).toBe('mi');
});

test('3 multilang names', () => {
    const util = new Util('<span class="mlnc"><span class="mln1" lang="en">name1-en</span><span class="divider"> | </span><span class="mln2" lang="mi">name2-mi</span><span class="divider"> | </span><span class="mln3" lang="fr">name3-fr</span></span>');
    expect(util.multilanguageName).toBe(true);
    expect(util.name1).toBe('name1-en');
    expect(util.name1lang).toBe('en');
    expect(util.name2).toBe('name2-mi');
    expect(util.name2lang).toBe('mi');
    expect(util.name3).toBe('name3-fr');
    expect(util.name3lang).toBe('fr');
});

test('1 regular name', () => {
    const util = new Util('Welcome | Nau mai');
    expect(util.multilanguageName).toBe(false);
});




