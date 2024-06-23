# Group-A
Database &amp; Cloud System Group Assignment (Group A)

## Procedure of Project
Hosting Port = 5200  --> 127.0.0.1:5200

### *Admin*
1.  Register with name & password
```
{
    name            : "",
    password        : "",
    superpassword   : "",
}
```
2. Login with name & password
```
{
    name            : "",
    password        : "",
}
```
** Able to delete user with authority given.

```
/auth/changename/(user_id)
/auth/changepass/(user_id)
/auth/changeemail/(user_id)
```
### *User*
1.  Register with name & password
```
/auth/register
{
    user            : "",
    name            : "",
    password        : "",
    email           : "",
}
```
2. Login with name & password
```
/auth/login
{
    user            : "",
    password        : "",
}
``` 
** Able to change (name, password and email) with specific API.

3. Create game lobby
```
/game/lobby
```
** Using *Bearer Token* given during login session
** Obtain *Lobby Id* for other player to join

4. Join game lobby
```
/game/joinlobby
{
    "roomid" : "",
}
```

5. End the game session
```
/game/endgame
{
    "roomid" : "",
}
```

6. Leave game lobby
```
/game/leavelobby
{
    "roomid" : "",
}
```
