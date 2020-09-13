# BookStore

The backend was developed with Node.js, using express to build a REST API, authentication middleware 
with JWT and bcryptjs to hash user password before saving it to the database. The frontend was developed 
with React, using React context to pass data to many components, and bootstrap for styling components 
such as the shopping cart. Socket.io was implemented on both sides for a real-time comment section. 
An admin protected section is provided to add books from Google Books API. Payment method was implemented 
using paypal API.

### Installation
Run the command ``` npm install ``` on the folders frontend and backend.

### Running
Run the command ``` npm start ``` on the folders frontend and backend.

### HomePage
![HomePage](/resources/homepage.png "HomePage")

### Book details with comments section 
![Book Details](/resources/bookdetailsandcomment.png "Book Details")

### Shopping Cart
![Shopping Cart](/resources/cart.png "Shopping Cart")
