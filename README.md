# I-Got-Next-2.0

## Technologies Used
* React
* React Router DOM
* JavaScript
* Reactstrap
* SCSS
* C#
* ASP.NET Core
* SQL Server Management Studio / T-SQL
* Git
* GitHub

## Description
 “I Got Next 2.0” includes enhancements to the original "I Got Next" app.  The easy to use app displays the teams, in order, of which games will be played; making it easy for users to know when they will play and who they will be playing with. The added "Administrator Portal" allows more control over the list of games.

 ![I Got Next 2.0 - Home Page](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/HomePageImage.PNG)

The users will have access to the app via the gym kiosk/iPad where the players will create the teams or join teams and view the order of when the games will be played. Upon visiting the app the user will be able to view the available players by clicking the `Available Players` link within the navbar. The players listed have not been added to a team and are truly available to join a team. Once the player is added to the team, he/she will not appear within the list of players.

![I Got Next 2.0 - Available Players](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/AvailablePlayersImage.PNG)

After viewing the available players, the user can navigate back to the home page by clicking `Home` link or the logo within the navbar. Once back to the homepage, the user will have the option to click the `Create a Team` button which will take the user to a form or `Join a Team button` which will take the user to the list of teams already signed up on the list and show teams who don't have five players.

![I Got Next 2.0 - Create Team Form](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/CreateATeamImage.PNG)

![I Got Next 2.0 - Join a Team View](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/JoinATeamImage.PNG)

When the user sees the `Create Your New Team` form, there is an input to create a team name and multi-select dropdown menu to select the team of players. The user will click the save button to create the new team.

The new team will print to the `Teams` page where the user can review the team by clicking the "View Team" button. If the team does not have five players, a Join Team button will render (instead of the View Team) and will allow a player to add their name to the team.

![I Got Next 2.0 - Single Team View](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/SingleTeamImage.PNG)

Once within the Single Team View the player can see who is playing on each team selected.

The player can also view the `Current Game` link which will show the current teams on the current and the next team set to play.

![I Got Next 2.0 - Current Game View](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/CurrentGameImage.PNG)

As an added feature to secure the list, there is an Admin Portal added which will allow the gym monitor to control which teams are removed from the list and to closely monitor the current game's winner and loser.

The administrator will gain access by logging in with user name and password credentials

![I Got Next 2.0 - Admin Portal](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/AdminPortalImage.PNG)

Once the administrator signs into the app he/she will be directed to the `Teams` page where there will be an option to update the list by removing the losing teams and/or teams who are not ready to play at the time their game is ready.

![I Got Next 2.0 - Admin Remove Team](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/AdminRemoveATeamImage.PNG)

The administrator will have access to update the `Current Game` page by clicking the edit button for the selected court and a form will appear where the two teams will be selected and saved, which will update the Current Game View.

![I Got Next 2.0 - Admin Edit Team](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/AdminCurrentGameImage.PNG)

![I Got Next 2.0 - Admin Update Teams](https://raw.githubusercontent.com/rtate2/i-got-next-2/master/igotnext2.ui/src/images/AdminCurrentGameForm.PNG)

Once the adminstrator logs off, the players will be able to see the updates and continue to to monitor the flow of the games.

## How to run
* View a live demo via the following link: https://share.vidyard.com/watch/kWv6qQLDYEVN5JwdrWuEGi?
