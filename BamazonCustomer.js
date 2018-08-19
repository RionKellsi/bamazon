var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Rylee2016!",
    database: "bamazon_DB",

});

function start() {
    //prints the items for sale and their details
    connection.query('SELECT * FROM products', function(err, res){
      if(err) throw err;
    
      console.log('~*~*~*~*~*Welcome to Bamazon*~*~*~*~*~')
      console.log('----------------------------------------------------------------------------------------------------')
    
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].itemID + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
      }
    
      console.log(' ');
      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the product you would like to purchase?",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
          }
        },
        {
          type: "input",
          name: "qty",
          message: "How many would you like to purchase?",
          validate: function(value){
            if(isNaN(value)){
              return false;
            } else{
              return true;
            }
          }
        }
        ]).then(function(ans){
          var whatToBuy = (ans.id)-1;
          var howMuchToBuy = parseInt(ans.qty);
          var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));
    
          //check if quantity is sufficient
          if(res[whatToBuy].stock_quantity >= howMuchToBuy){
            //after purchase, updates quantity in Products
            connection.query("UPDATE products SET ? WHERE ?", [
            {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
            {itemID: ans.id}
            ], function(err, result){
                if(err) throw err;
                console.log("Thank you for your purchase! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                reOrder();
            })
          } else{
            console.log("We're sorry, there's not enough in stock!"); 
            reOrder();
          }
        })
    })
}

function reOrder(){
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase another item?"
    }]).then(function(ans){
      if(ans.reply){
        start();
      } else{
        console.log("Thanks for shopping! Come back soon!");
      }
    });
  }

start();
