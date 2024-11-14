const http = require("http")
const fs = require('fs');
const path = require('path');

const port = 4000;

let productsDB = [];
try {
    const data = fs.readFileSync('data.json');
    productsDB = JSON.parse(data);
} catch (error) {
    console.error(error);
}

const server = http.createServer((req, res) => {
    const endPoint = req.url;

    try {
        if (endPoint == '/home') {

            const html = fs.readFileSync("index.html", "utf-8")

            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.write(html.toString())

            res.end()
        }
        else if (endPoint == "/products") {

            res.writeHead(200, { 'Content-Type': 'application/json' });

            res.write(JSON.stringify(productsDB));

            res.end();

        }
        else if (endPoint.split('/')[1] == 'products') {
            let index = endPoint.split('/')[2]

            if (index >= productsDB.length) {
                const htmlError = fs.readFileSync('error.html')
                res.write(htmlError.toString())
                res.end()
            }

            res.write(JSON.stringify(productsDB[index]))
            res.end()

        } else if (endPoint.startsWith('/images')) {

            const imagePath = path.join(__dirname, endPoint);

            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Image not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(data);
                }
            });
        } else {
            const htmlError = fs.readFileSync('error.html')
            res.write(htmlError.toString())
            res.end()
        }

    } catch (error) {
        console.log(error);
    }

    // res.end();
})

server.listen(port, () => {
    console.log("Server is running on " + port);
})