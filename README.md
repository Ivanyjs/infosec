# Group-A
Database &amp; Cloud System Group Assignment (Group A)

## Usage Documentation
### **Admin**
Register
```
<address>:5200/admin/register
 Data required (in body): name, password, masterpassword
```
Login
```
<address>:5200/admin/login
 Data required (in body): name, password
```
Eraseuser/Eraseself
```
<address>:5200/admin/eraseuser (or eraseself)
 Data required: id (in params) and token (in authentication)
```

### **Users**
Register
```
<address>:5200/auth/register
 Data required (in body): name, password, email, and user
```
Login
```
<address>:5200/auth/login
 Data required (in body): name, password
```
Delete Account
```
<address>:5200/auth/erase
 Data required: id (in params) and token (in authentication)
```
Change password/email/playername
```
<address>:5200/auth/changepass(changename and changeemail)
 Data required: id (in params), name/email/password (in body) and token (in authentication)
```
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