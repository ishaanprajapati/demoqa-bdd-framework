@UserAPI @API @Assignment
Feature: User API

  @CreateGetUpdateUser
  Scenario: Create, fetch and update a user via API
    When Create a new user
    Then Validate the response status code is 201
    And Store the userId from the response
    When Get the created user details
    Then Validate the response status code is 200
    And Validate the fetched user id in the response
    When Update the user name
    Then Validate the response status code is 200
    And Validate the updated name in the response
