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

namespace local_multilanguagenames\local\hooks\output;

/**
 * Hook callbacks for Multi-language section and activity names
 *
 * @package    local_multilanguagenames
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class before_standard_top_of_body_html_generation {

    /**
     * Callback implementations for Multi-language section and activity names
     *
     * @package    local_multilanguagenames
     * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
     * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
     *
     * @param \core\hook\output\before_standard_top_of_body_html_generation $hook
     */
    public static function callback(\core\hook\output\before_standard_top_of_body_html_generation $hook): void {
        global $CFG;
        global $PAGE;
        if (during_initial_install() || isset($CFG->upgraderunning) || !get_config('local_multilanguagenames', 'version')) {
            // Do nothing during installation or upgrade.
            return;
        }
        /* If the core setting enabled then exit */
        if (!empty($CFG->formatstringstriptags)) {
            return;
        }

        $renderer = $hook->renderer;
        $output = $hook->get_output();

        // For discovery purposes only.
        // $hook->add_html('<div class="test1">This is a test"' . $PAGE->pagetype . '</div>');.

        if ($PAGE->pagetype == 'course-editsection' || $PAGE->pagetype == 'mod-forum-mod') {
            $PAGE->requires->js_call_amd('local_multilanguagenames/multilanguagenames', 'init');
            $PAGE->requires->js_call_amd('local_multilanguagenames/simpletest', 'init');
        }

        return;
    }
}
