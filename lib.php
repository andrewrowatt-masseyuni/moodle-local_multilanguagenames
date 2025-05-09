<?php
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
 * TODO describe file lib
 *
 * @package    local_multilanguagenames
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

 /**
  * Summary of local_multilanguagenames_before_standard_top_of_body_html
  * @return string 
  */
 function local_multilanguagenames_before_standard_top_of_body_html(): string {
    global $CFG;
    global $PAGE;
    if (during_initial_install() || isset($CFG->upgraderunning) || !get_config('local_multilanguagenames', 'version')) {
        // Do nothing during installation or upgrade.
        return '';
    }
    /* If the core setting enabled then exit */
    if (!empty($CFG->formatstringstriptags)) {
        return '';
    }

    // For discovery purposes only.
    // $hook->add_html('<div class="test1">This is a test"' . $PAGE->pagetype . '</div>');.

    if ($PAGE->pagetype == 'course-editsection' || $PAGE->pagetype == 'mod-forum-mod') {
        $PAGE->requires->js_call_amd('local_multilanguagenames/multilanguagenames', 'init');
        x();
    }

    return '';
 }