@local @local_multilanguagenames @javascript
Feature: Convert an existing section to use multilanguage names
    As a teacher I need to be able to edit a section and enable multilanguage names

    Background:
        Given the following "users" exist:
        | username | firstname | lastname | email            |
        | teacher1 | Terry1    | Teacher1 | teacher@example.com  |
        | student1 | Sam1      | Student1 | student1@example.com |
        And the following "courses" exist:
        | fullname | shortname | numsections |
        | Course 1 | C1        | 4           |
        And the following "course enrolments" exist:
        | user     | course | role           |
        | teacher1 | C1     | editingteacher |
        | student1 | C1     | student        |
        And I log in as "teacher1"
        And I am on "Course 1" course homepage
        And I turn editing mode on
        Then I edit the section "0" and I fill the form with:
            | Section name | section0part1 |
        And I am on "Course 1" course homepage
        Then I edit the section "1" and I fill the form with:
            | Section name | section1part1 \| section1part2 |
        And I am on "Course 1" course homepage
        Then I edit the section "2" and I fill the form with:
            | Section name | section2part1 \| section2part2 \| section2part3 |
        And I am on "Course 1" course homepage
        Then I edit the section "3" and I fill the form with:
            | Section name | section3part1 \| section3part2 \| section3part3 \| section3part4 |


    Scenario: Edit sections with plaintext
        When I log in as "teacher1"
        And I am on "Course 1" course homepage
        Then I should see "section0part1"
        And I turn editing mode on
        And I edit the section "0"
        And I should not see "Use multi-language name"
        And I am on "Course 1" course homepage
        And the following config values are set as admin:
            | formatstringstriptags | 0 |
        Then I should see "section0part1"
        And I turn editing mode on
        And I edit the section "0"
        Then I should see "Use multi-language name"
        And I should not see "Primary name"
        Given I click on "Use multi-language name" "checkbox"
        Then I should see "Primary name"
        And the "value" attribute of "name1" "field" should contain "section0part1"
        And I should see "" in the "name2" "field"
        And I should see "" in the "name3" "field"
        And the "value" attribute of "id_name_shadow" "field" should contain "section0part1"

        # Two part test
        Given I am on "Course 1" course homepage
        Then I should see "section1part1"
        And I edit the section "1"
        Given I click on "Use multi-language name" "checkbox"
        Then I should see "Primary name"
        And I should see "Secondary (below)"
        And the "value" attribute of "name1" "field" should contain "section1part1"
        And the "value" attribute of "name2" "field" should contain "section1part2"
        And I should see "" in the "name3" "field"
        And the "value" attribute of "id_name_shadow" "field" should contain "section1part1 | section1part2"
        Given I set the field "name1" to "section1part1edited"
        And I set the field "name1lang" to "Māori"
        Then the "value" attribute of "id_name_shadow" "field" should contain "section1part1edited | section1part2"
        And I press "Save changes"

        # Round trip test
        Given I am on "Course 1" course homepage
        And I edit the section "1"
        And the field "Use multi-language name" matches value "1"
        And the "value" attribute of "name1" "field" should contain "section1part1edited"
        And the field "name1lang" matches value "Māori"

        # Three part test
        Given I am on "Course 1" course homepage
        Then I should see "section2part1 | section2part2"
        And I edit the section "2"
        Given I click on "Use multi-language name" "checkbox"
        Then I should see "Primary name"
        And I should see "Secondary (below)"
        And I should see "Secondary (above)"
        And the "value" attribute of "name1" "field" should contain "section2part1"
        And the "value" attribute of "name2" "field" should contain "section2part2"
        And the "value" attribute of "name3" "field" should contain "section2part3"
        And the "value" attribute of "id_name_shadow" "field" should contain "section2part1 | section2part2 | section2part3"
        And I press "Save changes"

        # Four part test
        Given I am on "Course 1" course homepage
        Then I should see "section3part1 | section3part2 | section3part3 | section3part4"
        And I edit the section "3"
        Given I click on "Use multi-language name" "checkbox"
        Then I should see "Primary name"
        And I should see "Secondary (below)"
        And I should see "Secondary (above)"
        And the "value" attribute of "name1" "field" should contain "section3part1"
        And the "value" attribute of "name2" "field" should contain "section3part2"
        And the "value" attribute of "name3" "field" should contain "section3part3"
        And I press "Save changes"

        # Empty section name test
        Given I am on "Course 1" course homepage
        And I edit the section "4"
        Given I click on "Use multi-language name" "checkbox"
        Then I should see "Primary name"
        And the "value" attribute of "name1" "field" should contain "Unnamed section"
        And I should see "" in the "name2" "field"
        And I should see "" in the "name3" "field"
        And I press "Save changes"

