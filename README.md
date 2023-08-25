# to-do-jwt

MongoDB, Express.js, React.js, Javascript ,jsonwebtoken

## Application requirements:

1. A user will need to register and log in to the application

2. Ensure a user can add/edit/remove/read tasks

3.  Write middleware to:
* Respond with an HTTP 403 to all requests by users whose
  usernames don’t end with the substring ‘@gmail.com’.
* Reject the addition of tasks that exceed 140 characters.
* Reject any requests that are not of the JSON content type. You
  can test against image content types.

4. The user will only have the capabilities mentioned above if logged in.
