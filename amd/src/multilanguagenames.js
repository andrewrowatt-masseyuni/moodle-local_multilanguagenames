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

/* eslint-disable no-console */
/* eslint-disable max-len */

/**
 * TODO describe module Multi-language section and activity names
 *
 * @module     local_multilanguagenames/multilanguagenames
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import $ from 'jquery';
import Util from 'local_multilanguagenames/Util';

export const init = () => {
    $(function() {

        console.log("Multi-language section and activity names (local_multilanguagenames) module initialized");
        // Add your module initialization code here
        $('#fitem_id_name').css('color', 'red');

        const idName = $('#id_name').val();
        console.log(idName);

        var util = new Util(idName);
        console.log(util.multilanguageName);
    }
   );
};
