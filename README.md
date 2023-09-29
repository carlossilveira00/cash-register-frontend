
# Cash Register Application
This project aims to create an cash register platform with a focus on managing shopping carts, products, and promotions. It's designed to have operations such as adding products to a cart, applying promotions, and calculating cart totals. This project is seperated into 2 parts, a backend and a frontend.


## Requirements

Before running the application, ensure you have the following software installed on your machine:

- **Node.js:** Version 16 or higher
- **Command-line Interface:** To execute commands in the terminal.

## Installation
1. Clone the repository to your local machine.
2. Navigate to 'cash-register-frontend'
3. Run the following command to install all the dependicies on the frontend.
```bash
  npm install
```

## Usage

1. Make sure you have the backend server on the 3000 port.
2. In your terminal, navigate to 'cash-register-frontend' and run `npm start`. If an warning appears that ask if you want to start the server on port 3001, type "yes".
3. Open a browser and navigate to http://localhost:3001.
3. Everything is set up for you to start using the app!

### Basic Usage Introduction
This application is user-friendly and intuitive. You can easily add products to your cart, review your cart's content, adjust quantities, remove items, and complete the checkout process. If the checkout is successful, a confirmation message will appear, and your cart will reset to empty.

## Project Structure

### Frontend React App
- Components - This folder is where the components are created and styled. All the logic for rendering components it's writted here.
- Context - This folder contains the logic for managin state of `Cart`, `Product` and `Promotions` through Context. This is where all the calls to the server side are defined and where the logic to apply promotions, unapply promotions, add items to cart, increase or decrease their quantity are defined.
- App.js - This file is where the Context providers are initialized, and each component is declared. This file acts as the glue of the application, ensuring that every part is connected, providing the user with a responsive and beautiful interface with all the desired functionality.
