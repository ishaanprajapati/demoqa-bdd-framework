@BookStoreApplication @UI @Assignment
Feature: Book Store Application

  Background:
    Given Navigate to the application
    And Perform login

  @BookStoreSearchAndVerifySpecificBookDetails
  Scenario Outline: Search for a book, open it, verify details and save to file
    Then Validate username and logout button are visible
    When Click on the Book Store button
    And Search for "<Title>"
    Then Validate the search result to contain "<Title>"
    When Open the book "<Title>"
    Then Save the book Title, Author and Publisher to a file
    And Logout successfully

    Examples:
      | Title                                     |
      | Learning JavaScript Design Patterns       |
      | Designing Evolvable Web APIs with ASP.NET |
      | Git Pocket Guide                          |

  @BookStoreSearchAndVerifySearchBookDetails
  Scenario Outline: Search for a book, verify details in search results and save to file
    Then Validate username and logout button are visible
    When Click on the Book Store button
    And Search for "<Title>"
    Then Validate the search result to contain "<Title>"
    When Fetch the Title, Author and Publisher of the book
    Then Save the book Title, Author and Publisher to a file
    And Logout successfully

    Examples:
      | Title                                     |
      | Learning JavaScript Design Patterns       |
      | Designing Evolvable Web APIs with ASP.NET |
      | Git Pocket Guide                          |
