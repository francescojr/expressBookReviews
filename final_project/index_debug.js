const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const { users } = require('./router/auth_users.js');

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
  console.log("🔐 Middleware Auth - Session:", req.session);
  console.log("🔐 req.session.authorization:", req.session.authorization);
  
  if(req.session && req.session.authorization) {
    let token = req.session.authorization['accessToken'];
    jwt.verify(token, "access", (err,user) => {
      if(!err) {
        req.user = user;
        console.log("✅ Token válido, user:", user);
        next();
      } else {
        console.log("❌ Token inválido:", err.message);
        return res.status(403).json({message: "User not authenticated"})
      }
    });
  } else {
    console.log("❌ Sem authorization na sessão");
    return res.status(403).json({message: "User not authenticated"})
  }
});

// DEBUG: Endpoint para ver usuários registrados
app.get("/debug/users", (req, res) => {
  console.log("📋 Usuários no sistema:", users);
  res.json({users: users});
});

// DEBUG: Endpoint para ver sessão
app.get("/debug/session", (req, res) => {
  console.log("🔍 Session data:", req.session);
  res.json({session: req.session});
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=> {
  console.log("Server is running on port " + PORT);
  console.log("Debug endpoints: /debug/users, /debug/session");
});
