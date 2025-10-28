const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if(!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  
  if(authenticatedUser(username, password)) {
    let accessToken = jwt.sign({data: username}, 'access', {expiresIn: 60*60});
    req.session.authorization = {
      accessToken: accessToken
    };
    return res.status(200).json({message: "User logged in successfully", accessToken: accessToken});
  } else {
    return res.status(401).json({message: "Invalid username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.data;
  
  if(!review) {
    return res.status(400).json({message: "Review is required"});
  }
  
  if(!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Add or modify the review
  books[isbn].reviews[username] = review;
  
  return res.status(200).json({message: "Review added/updated successfully", reviews: books[isbn].reviews});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.data;
  
  if(!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  if(!books[isbn].reviews[username]) {
    return res.status(404).json({message: "Review not found for this user"});
  }
  
  // Delete the review only for this user
  delete books[isbn].reviews[username];
  
  return res.status(200).json({message: "Review deleted successfully", reviews: books[isbn].reviews});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
module.exports.users = users;
