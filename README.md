# Bingo-server

Below is the description of every API call that needs to be made wwith the API type.

1. Creates a game of tambola and returns a gameId as a resonse 
/api/game/create -- POST
-- Parameters required -- NONE 

2. Generates a ticket for a user by taking two parameters as input i.e, gameId and username and returns a ticketId as a response.
/api/game/{Gameid}/ticket/{username}/generate -- POST
-- Parameters required --GameId , username

3. Takes the ticketId as input and return the HTML table of the generated ticket.
/ticket/{ticketID} -- GET
-- Parameters required -- ticketId

4. Takes gameid as input and generates the random number for tambola
/api/game/{gameid}/number/random -- GET
-- Parameters required -- GameId

5. Takes gameId as input and returnsthe array of the numbers drawn so far in the game.
/api/game/{gameid}/numbers -- GET
-- Parameters required -- GameId

6. Takes gameId as input and returns the stats of the game consisting of number of tickets, number drawn so far and the total number of users.
/api/game/{gameID}/stats -- GET
-- Parameters required -- GameId

