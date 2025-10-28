const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if(!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  
  if(isValid(username)) {
    return res.status(409).json({message: "User already exists"});
  }
  
  users.push({username: username, password: password});
  return res.status(201).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let booksbyauthor = [];
  let keys = Object.keys(books);
  
  keys.forEach((key) => {
    if(books[key].author === author) {
      booksbyauthor.push(books[key]);
    }
  });
  
  if(booksbyauthor.length > 0) {
    return res.status(200).send(JSON.stringify(booksbyauthor, null, 4));
  } else {
    return res.status(404).json({message: "No books found by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let booksbytitle = [];
  let keys = Object.keys(books);
  
  keys.forEach((key) => {
    if(books[key].title === title) {
      booksbytitle.push(books[key]);
    }
  });
  
  if(booksbytitle.length > 0) {
    return res.status(200).send(JSON.stringify(booksbytitle, null, 4));
  } else {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

// ========== TASK 10: Using Promises and Callbacks with Axios ==========

// Get the book list using Promise Callback
public_users.get('/promise/books', function (req, res) {
  // Simular uma requisição assíncrona com Promise callback
  new Promise((resolve, reject) => {
    // Simular um delay para representar uma requisição real
    setTimeout(() => {
      resolve(books);
    }, 1000);
  })
  .then((booksData) => {
    res.status(200).send(JSON.stringify(booksData, null, 4));
  })
  .catch((err) => {
    res.status(500).json({message: "Error fetching books", error: err.message});
  });
});

// Get book by ISBN using Promise Callback
public_users.get('/promise/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if(books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject(new Error("Book not found"));
      }
    }, 500);
  })
  .then((bookData) => {
    res.status(200).send(JSON.stringify(bookData, null, 4));
  })
  .catch((err) => {
    res.status(404).json({message: err.message});
  });
});

// Get books by author using Promise Callback
public_users.get('/promise/author/:author', function (req, res) {
  const author = req.params.author;
  
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let booksbyauthor = [];
      let keys = Object.keys(books);
      
      keys.forEach((key) => {
        if(books[key].author === author) {
          booksbyauthor.push(books[key]);
        }
      });
      
      if(booksbyauthor.length > 0) {
        resolve(booksbyauthor);
      } else {
        reject(new Error("No books found by this author"));
      }
    }, 500);
  })
  .then((booksData) => {
    res.status(200).send(JSON.stringify(booksData, null, 4));
  })
  .catch((err) => {
    res.status(404).json({message: err.message});
  });
});

// ========== TASK 10: Using async-await with Axios ==========

// Get the book list using async-await
public_users.get('/async/books', async function (req, res) {
  try {
    // Simulating an async operation
    const booksData = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(books);
      }, 1000);
    });
    
    res.status(200).send(JSON.stringify(booksData, null, 4));
  } catch (err) {
    res.status(500).json({message: "Error fetching books", error: err.message});
  }
});

// Get book by ISBN using async-await
public_users.get('/async/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    
    const bookData = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if(books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject(new Error("Book not found"));
        }
      }, 500);
    });
    
    res.status(200).send(JSON.stringify(bookData, null, 4));
  } catch (err) {
    res.status(404).json({message: err.message});
  }
});

// Get books by author using async-await
public_users.get('/async/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    
    const booksData = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let booksbyauthor = [];
        let keys = Object.keys(books);
        
        keys.forEach((key) => {
          if(books[key].author === author) {
            booksbyauthor.push(books[key]);
          }
        });
        
        if(booksbyauthor.length > 0) {
          resolve(booksbyauthor);
        } else {
          reject(new Error("No books found by this author"));
        }
      }, 500);
    });
    
    res.status(200).send(JSON.stringify(booksData, null, 4));
  } catch (err) {
    res.status(404).json({message: err.message});
  }
});

// Get all books using async-await with Axios (chaining multiple calls)
public_users.get('/async/all', async function (req, res) {
  try {
    // Simulating multiple async Axios calls
    const allBooks = await Promise.all([
      new Promise((resolve) => setTimeout(() => resolve(books), 500))
    ]);
    
    res.status(200).send(JSON.stringify(allBooks[0], null, 4));
  } catch (err) {
    res.status(500).json({message: "Error fetching books", error: err.message});
  }
});

// ========== TASK 13: Getting books by Title with Promises and Callbacks ==========

// Get books by title using Promise Callback
public_users.get('/promise/title/:title', function (req, res) {
  const title = req.params.title;
  
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let booksbytitle = [];
      let keys = Object.keys(books);
      
      keys.forEach((key) => {
        if(books[key].title === title) {
          booksbytitle.push(books[key]);
        }
      });
      
      if(booksbytitle.length > 0) {
        resolve(booksbytitle);
      } else {
        reject(new Error("No books found with this title"));
      }
    }, 500);
  })
  .then((booksData) => {
    res.status(200).send(JSON.stringify(booksData, null, 4));
  })
  .catch((err) => {
    res.status(404).json({message: err.message});
  });
});

// ========== TASK 13: Getting books by Title with async-await ==========

// Get books by title using async-await
public_users.get('/async/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    
    const booksData = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let booksbytitle = [];
        let keys = Object.keys(books);
        
        keys.forEach((key) => {
          if(books[key].title === title) {
            booksbytitle.push(books[key]);
          }
        });
        
        if(booksbytitle.length > 0) {
          resolve(booksbytitle);
        } else {
          reject(new Error("No books found with this title"));
        }
      }, 500);
    });
    
    res.status(200).send(JSON.stringify(booksData, null, 4));
  } catch (err) {
    res.status(404).json({message: err.message});
  }
});

module.exports.general = public_users;
