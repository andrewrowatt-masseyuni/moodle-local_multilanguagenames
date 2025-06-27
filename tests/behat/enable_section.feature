@local @local_multilanguagenames @javascript

Feature: Enable and use multilanguage names
    As a teacher I need to be able to edit a section and enable multilanguage names

  Background:
    And the following config values are set as admin:
        | formatstringstriptags | 0 |
    Given the following "users" exist:
    | username | firstname | lastname | email            |
    | teacher1 | Terry1    | Teacher1 | teacher@example.com  |
    | student1 | Sam1      | Student1 | student1@example.com |
    And the following "courses" exist:
    | fullname | shortname | numsections |
    | Course 1 | C1        | 6           |
    And the following "course enrolments" exist:
    | user     | course | role           |
    | teacher1 | C1     | editingteacher |
    | student1 | C1     | student        |
    And I change the window size to "large"

  Scenario: Single name
    When I log in as "teacher1"
    Given I am on "Course 1" course homepage
    And I turn editing mode on
    And I edit the section "1"
    # Required for Moodle 4.1
    And I click on "Custom" "checkbox"
    Given I click on "Use multi-language name" "checkbox"
    Then I should see "Primary name"
    And I should see "Secondary (below)"
    And I should see "Secondary (above)"
    Given I set the field "name1" to "section1part1"
    And I press "Save changes"
    Given I am on "Course 1" course homepage
    And I turn editing mode off
    Then I should see "section1part1"

  Scenario: Primary and single secondary name
    When I log in as "teacher1"
    Given I am on "Course 1" course homepage
    And I turn editing mode on
    And I edit the section "1"
    # Required for Moodle 4.1
    And I click on "Custom" "checkbox"
    Given I click on "Use multi-language name" "checkbox"
    Then I should see "Primary name"
    And I should see "Secondary (below)"
    And I should see "Secondary (above)"
    Given I set the field "name1" to "section1part1"
    Given I set the field "name2" to "section1part2"
    And I press "Save changes"
    Given I am on "Course 1" course homepage
    And I turn editing mode off
    Then I should see "section1part1"
    Then I should see "section1part2"

  Scenario: Primary and both secondary names
    When I log in as "teacher1"
    Given I am on "Course 1" course homepage
    And I turn editing mode on
    And I edit the section "1"
    Given I click on "Use multi-language name" "checkbox"
    Then I should see "Primary name"
    And I should see "Secondary (below)"
    And I should see "Secondary (above)"
    Given I set the field "name1" to "section1part1"
    Given I set the field "name2" to "section1part2"
    Given I set the field "name3" to "section1part3"
    And I press "Save changes"
    Given I am on "Course 1" course homepage
    And I turn editing mode off
    Then I should see "section1part1"
    Then I should see "section1part2"
    Then I should see "section1part3"
