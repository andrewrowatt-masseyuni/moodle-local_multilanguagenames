@local @local_multilanguagenames @javascript
Feature: Testing basic section name behaviour when the feature is enabled
    As a teacher I need to be able to edit a section
    without using the multilanguage names feature
    if the feature is enabled at the site level.

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
    And I log in as "teacher1"
    And I am on "Course 1" course homepage
    And I turn editing mode on
    Then I edit the section "0" and I fill the form with:
        | Section name | section0part1 |
    And I change the window size to "large"

  Scenario: Edit section with plaintext
    Given I am on "Course 1" course homepage
    And I turn editing mode on
    And I edit the section "0"
    And I set the field "name" to "section 0 not multilanguage"
    And I press "Save changes"
    Given I am on "Course 1" course homepage
    And I turn editing mode off
    Then I should see "section 0 not multilanguage"

    And I turn editing mode on
    And I edit the section "1"
    And I set the field "name" to "section 1 not multilanguage"
    And I press "Save changes"
    Given I am on "Course 1" course homepage
    And I turn editing mode off
    Then I should see "section 1 not multilanguage"
