const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const {ObjectId} = require('mongodb'); //AAAAAAh
const config = require('./config.json');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const app = express();
const uri = config.db
const secret = config.secret
const saltrounds = config.saltrounds

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json())

app.get("/", async(req, res) => {
    res.send("Root of Auth Control");
})

app.post("/register", async (req, res) => {
    if(!(req.body.user && req.body.email && req.body.password && req.body.name)) {
        res.send("Username, Player name, E-mail, and password required as 'user','name','email',  and 'password' respectively!");
        return;
    }

    let namecheck = await client.db("general").collection("Users").findOne({
        user: req.body.user
    })
    if(namecheck) {
        res.send("Sorry, username occupied, use another.");
        return;
    }
    let emailcheck = await client.db("general").collection("Users").findOne({
        email: req.body.email
    })
    if(emailcheck) {
        res.send("Your e-mail has been registered to a account.");
        return;
    }
    //Async implementation, can't continue.
    /*
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        let regresult = await client.db("general").collection("Users").insertOne({
            user: req.body.user,
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        if(regresult) {
            console.log(regresult);
            res.send(regresult);
        }
        else {
            console.log ("[ERR] Registeration failed unexpectedly");
            res.send("???");
        }
    });
    */
    //Sync implementation of bcrypt, because I have no idea otherwise.
    const hash = bcrypt.hashSync(req.body.password, saltrounds);

    let regresult = await client.db("general").collection("Users").insertOne({
        user: req.body.user,
        name: req.body.name,
        email: req.body.email,
        password: hash
    });

    if(regresult) {
        console.log(regresult)
        res.send(regresult)
    }
    else {
        console.log ("[ERR] Registeration failed unexpectedly")
        res.send("???")
    }
})

app.post("/login", async(req, res) => {
    const token = await authencheck(req.body.user, req.body.password)
    if(!token) {
        res.send("Authentication failure, check your info.");
        return;
    }
    nonsense = "Welcome user " + req.body.user;
    res.send({"Token":token, "Auth":"Success", "motd": nonsense});
})

//Parameters: password (in body) and id in params
app.patch("/changepass/:id", verifyhash, async(req, res) => {
    if(!req.body.password) {
        res.send("Input new password!")
        return
    }
    if(!res.locals.success) {
        if(typeof res.locals.output !== 'undefined') {
            res.send(res.locals.output);
            return
        }
        else {
            res.send("Unknown error occured.");
            return
        }
    }
    if(req.params.id != res.locals.output.id) {
        res.send("Token user and user mismatch.")
        return
    }

    _id = new ObjectId(req.params.id);

    let result = await client.db("general").collection("Users").findOne({
        _id: _id
    })

    if(!result) {
        res.send("ID not matching any user, did you deleted account ?")
        return
    }

    const hash = bcrypt.hashSync(req.body.password, saltrounds); //I somehow forgot to hash it first!
    let patchresult = await client.db("general").collection("Users").updateOne(
    //    {_id: _id}, {$set: {password: req.body.password}}
        {_id: _id}, {$set: {password: hash}}
    )
    res.send(patchresult)
    console.log(patchresult)
})

app.patch("/changeemail/:id", verifyhash, async(req, res) => {
    if(!req.body.email) {
        res.send("Input new email!")
        return
    }
    if(!res.locals.success) {
        if(typeof res.locals.output !== 'undefined') {
            res.send(res.locals.output);
            return
        }
        else {
            res.send("Unknown error occured.");
            return
        }
    }
    if(req.params.id != res.locals.output.id) {
        res.send("Token user and user mismatch.")
        return
    }

    _id = new ObjectId(req.params.id);

    let result = await client.db("general").collection("Users").findOne({
        _id: _id
    })

    if(!result) {
        res.send("ID not matching any user, did you deleted account ?")
        return
    }

    let emailresult = await client.db("general").collection("Users").findOne({
        email: req.body.email
    })

    if(emailresult) {
        res.send("Email already occupied.")
        return
    }

    let patchresult = await client.db("general").collection("Users").updateOne(
        {_id: _id}, {$set: {email: req.body.email}}
    )
    res.send(patchresult)
    console.log(patchresult)
})

app.patch("/changename/:id", verifyhash, async(req, res) => {
    if(!req.body.name) {
        res.send("Input new player name!")
        return
    }
    if(!res.locals.success) {
        if(typeof res.locals.output !== 'undefined') {
            res.send(res.locals.output);
            return
        }
        else {
            res.send("Unknown error occured.");
            return
        }
    }
    if(req.params.id != res.locals.output.id) {
        res.send("Token user and user mismatch.")
        return
    }

    _id = new ObjectId(req.params.id);

    let result = await client.db("general").collection("Users").findOne({
        _id: _id
    })

    if(!result) {
        res.send("ID not matching any user, did you just deleted account ?")
        return
    }

    let patchresult = await client.db("general").collection("Users").updateOne(
        {_id: _id}, {$set: {name: req.body.name}}
    )
    res.send(patchresult)
    console.log(patchresult)
})

app.delete('/erase/:id', verifyhash, async (req, res) => {
    if(!res.locals.success) {
        if(typeof res.locals.output !== 'undefined') {
            res.send(res.locals.output);
            return
        }
        else {
            res.send("Unknown error occured.");
            return
        }
    }
    if(req.params.id != res.locals.output.id) {
        res.send("Token user and user mismatch.")
        return
    }

    _id = new ObjectId(req.params.id);

    let result = await client.db("general").collection("Users").findOne({
        _id: _id
    })

    if(!result) {
        res.send("ID not matching any user, did you delete account ?")
        return
    }

    let delresult = await client.db("general").collection("Users").deleteOne({
        _id: _id
    })
    res.send({"Status": delresult, "Message": "Goodbye."})
    console.log(delresult)
})

async function authencheck(username, password) {
    token = false;
    let namecheck = await client.db("general").collection("Users").findOne({
        user: username
    })

    if(!namecheck) {
        console.log(namecheck)
        return token;
    }

    const hashpass = await bcrypt.compare(password, namecheck.password);
    if(hashpass) {
        /*
        jwt.sign({"id": namecheck._id}, secret, {expiresIn:"30m"}, (err, asyncToken) => {
            if (err) throw err;
            token = asyncToken
        });
        */
        token = jwt.sign({"id": namecheck._id}, secret, {expiresIn:"60m"});
    }
    return token;
}

//Verify Hashing function, behaves based on input
function verifyhash(req, res, next) {
    if(!req.headers.authorization) {
        res.locals.success = false;
        res.locals.output + "Authorization token missing."
        return;
    }

    TokenArray =req.headers.authorization.split(" ");
    /*
    jwt.verify(req.headers.authorization, secret, function(err, decoded) {
        if(err) {
            res.locals.success = false;
            if(err.name == "TokenExpiredError") {
                res.locals.success = false;
                res.locals.output = "Token is Expired.";
                next();
            }
            else if(err.name == "JsonWebTokenError") {
                res.locals.output = err.message;
                next();
            }
            else {
                res.locals.output = "Generic Unknown Error";
                next();
            }
        }
        else {
            TokenArray = decoded.split(" ");
            res.locals.success = true;
            res.locals.output = TokenArray[1];
            next();
        }
    });
    */
    try {
        jwt.verify(TokenArray[1], secret);
    }
    catch(err) {
        res.locals.success = false;
        if(err.name == "TokenExpiredError") {
            res.locals.success = false;
            res.locals.output = "Token is Expired.";
            next();
            }
        else if(err.name == "JsonWebTokenError") {
            res.locals.output = err.message;
            next();
            }
        else {
            res.locals.output = "Generic Unknown Error";
            next();
        }
    }
    output = jwt.verify(TokenArray[1], secret)
    res.locals.success = true
    res.locals.output = output;
    next();
}

module.exports = {app,verifyhash,authencheck};
