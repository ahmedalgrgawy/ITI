const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Reading Data

let productsDB = [];
try {
    const data = fs.readFileSync('data.json');
    productsDB = JSON.parse(data);
} catch (error) {
    console.error(error);
}

// show data 
const showDate = () => {
    productsDB.map((ele, index) => {
        console.log('Product data: ' + Object.values(ele));
        console.log('Product Index: ' + index);
        console.log('---------');
    })

    ask()
}

// add new object function
const addNewProduct = () => {

    let id = productsDB.length == 0 ? 0 : productsDB.length + 1

    // take product data
    rl.question('What is your product name? ', (name) => {
        rl.question('What is your product color? ', (color) => {
            rl.question('What is your product price? ', (price) => {

                if (typeof (price) !== Number) {
                    console.log('Price Must Be Number, try again');
                    rl.close()
                }

                const newProduct = {
                    id: id,
                    name: name,
                    color: color,
                    price: parseFloat(price)
                }

                // update arr
                productsDB.push({ id: id, ...newProduct })

                // update json file
                fs.writeFile('data.json', JSON.stringify(productsDB), (err) => {
                    if (err) {
                        console.log(err);
                    }

                    console.log('Product added successfully');
                    rl.close()
                })

            });
        });
    });

    ask()
}

/// delete Product
const deleteProduct = () => {
    rl.question('What is Your Product Index', (index) => {

        productsDB.splice(index, 1)

        // update json file
        fs.writeFile('data.json', JSON.stringify(productsDB), (err) => {
            if (err) {
                console.log(err);
            }

            console.log('Product Deleted successfully');
            rl.close()
        })
    })

}

// update product
const updateProduct = () => {
    rl.question('What is Your Product Index', (index) => {

        const productIndex = parseInt(index)

        if (productIndex < 0 || productIndex >= productsDB.length) {
            console.log('Invalid index. Please provide a valid index.');
            rl.close();
            return;
        }

        rl.question('What is your product new name? ', (name) => {
            rl.question('What is your product  new color? ', (color) => {
                rl.question('What is your product new price? ', (price) => {

                    if (typeof (price) !== Number) {
                        console.log('Price Must Be Number, try again');
                        rl.close()
                    }

                    const updatedProduct = {
                        id: productsDB[productIndex].id,
                        name: name || productsDB[productIndex].name,
                        color: color || productsDB[productIndex].color,
                        price: parseFloat(price || productsDB[productIndex].price)
                    }

                    // update arr
                    productsDB[productIndex] = updatedProduct;

                    // update json file
                    fs.writeFile('data.json', JSON.stringify(productsDB), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Product Updated successfully');
                        rl.close()
                    })
                });
            });
        });
    })

}

const ask = () => {

    console.log('Hi, How Can I Help You?');
    console.log('1- Add New Products!');
    console.log('2- Delete Product with Index?');
    console.log('3- Update Product with Index?');
    console.log('4- Show Products');

    rl.question("Write Number Of Operation you want to do!", (input) => {
        switch (input) {
            case '1':
                addNewProduct()
                break;
            case '2':
                deleteProduct()
                break;
            case '3':
                updateProduct()
                break;
            case '4':
                showDate()
                break
        }
    })
}

ask()