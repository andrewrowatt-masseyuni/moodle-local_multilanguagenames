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

/**
 * TODO describe module Multi-language section and activity names
 *
 * @module     local_multilanguagenames/multilanguagenames
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import $ from 'jquery';
import Util from 'local_multilanguagenames/Util';
import {exception as displayException} from 'core/notification';
import Templates from 'core/templates';

export const init = () => {
    $(function() {
        console.log("Multi-language section and activity names (local_multilanguagenames) module initialized");
        // Add your module initialization code here
        const idName = $('#id_name').val();

        var util = new Util(idName);
        if (util.multilanguageName) {
            $('#fitem_id_name').addClass('hidden');
        }

        let context = {
            name: idName,
            multilanguageName: util.multilanguageName,
            name1: util.name1,
            name2: util.name2,
            name3: util.name3,
        };

        context[`name1lang${util.name1lang}`] = true;
        context[`name2lang${util.name2lang}`] = true;
        context[`name3lang${util.name3lang}`] = true;

        // This will call the function to load and render our template.
        Templates.renderForPromise('local_multilanguagenames/edit_form', context)
        // eslint-disable-next-line promise/always-return
        .then(({html}) => {
            $(html).insertAfter('#fitem_id_name');

            $('#usemultilanguagename').on('change', function() {
                $('#fitem_id_name').toggleClass('hidden');
                $('#namemultilang_group').toggleClass('hidden');
            });
        })
        .catch((error) => displayException(error));
    });
};
