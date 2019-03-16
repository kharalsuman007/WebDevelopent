var express             = require("express"),
    app                 = express(),
    mongoose            = require("mongoose"),
    bodyParser         = require("body-parser"),
    User                = require("./models/user"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    passportLocalMongoose    = require("passport-local-mongoose");

//================
//Initializing app
//================
   
mongoose.connect('mongodb://localhost:27017/autherization', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.use(require("express-session")({
    secret: "This is some sort of message",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//================
//Setting Up routes
//================

app.get("/" , (req,res)=>{
    res.render("index");
});

app.get("/register" , (req,res)=>{
    res.render("register");
});


app.get("/secret" , isLoggedIn, (req,res)=>{
    res.render("secret");  
});

//Authurization routes

app.post("/register" , (req,res)=>{
    User.register(new User({username: req.body.username}) , req.body.password , (err,user) =>{
        if(err)
        {
            console.log(err);
            console.log("Encounted Error");
            return res.render("register");
        }
        passport.authenticate("local")(req , res, ()=>
        {
           res.redirect("/secret"); 
        });
    });
});

//Login Routes
app.get("/login" , (req,res)=>{
    res.render("login");  
});

app.post("/login" , passport.authenticate("local" , {
    successRedirect: "/secret",
    failureRedirect: "/login"
    
}) , (req,res)=>{
});


//LogOut Routes
app.get("/logout" , (req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next)
{
     if(req.isAuthenticated())
        return next();
    
    res.redirect("/login");
}

//Testing connection to server
app.listen(process.env.PORT , process.env.IP, ()=>{
   console.log("Authentication Server Started"); 
});
    
    