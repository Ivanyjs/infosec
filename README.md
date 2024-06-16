# Group-A
Database &amp; Cloud System Group Assignment (Group A)

## Usage Documentation
**Admin**
Register
```
 &lt;address&gt;:5200/admin/register
 Data required (in body): name, password, masterpassword
```
Login
```
 &lt;address&gt;:5200/admin/login
 Data required (in body): name, password
```
Eraseuser/Eraseself
```
 &lt;address&gt;:5200/admin/eraseuser (or eraseself)
 Data required: id (in params) and token (in authentication)
```
<br>
**Users**
Register
```
 &lt;address&gt;:5200/auth/register
 Data required (in body): name, password, email, and user
```
Login
```
 &lt;address&gt;:5200/auth/login
 Data required (in body): name, password
```
Delete Account
```
 &lt;address&gt;:5200/auth/erase
 Data required: id (in params) and token (in authentication)
```
Change password/email/playername
```
 &lt;address&gt;:5200/auth/changepass(changename and changeemail)
 Data required: id (in params), name/email/password (in body) and token (in authentication)
```
