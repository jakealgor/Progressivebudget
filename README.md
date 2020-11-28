# Unit 18 PWA Homework: Online/Offline Budget Trackers

Add functionality to our existing Budget Tracker application to allow for offline access and functionality.

The user will be able to add expenses and deposits to their budget with or without a connection. When entering transactions offline, they should populate the total when brought back online.

Offline Functionality:

  * Enter deposits offline

  * Enter expenses offline

When brought back online:

  * Offline entries should be added to tracker.

## User Story
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

## Business Context

Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.


## Acceptance Criteria
GIVEN a user is on Budget App without an internet connection
WHEN the user inputs a withdrawal or deposit
THEN that will be shown on the page, and added to their transaction history when their connection is back online.

- - -

## My app

* In my progressive budget application, the user will be shown a container where they will input a transcation name as awell as
a transaction amount. When they hit submit, the user will be shown a chart of transaction history. The information given gets 
stored onto atlas DB, locally if offline and reconnected theyre profile gets updated. The application itself is deployed with 
heroku.


## Links


# Github
* https://github.com/jakealgor/Progressivebudget


# Heroku
* https://damp-meadow-52977.herokuapp.com/

