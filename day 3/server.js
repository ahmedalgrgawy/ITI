import express from 'express'
import path from 'path';
import fs from 'fs';

const app = express();
const port = 5000

app.use(express.json());


app.get("/", (req, res) => {
    console.log('hello world');
    res.send("hello world")
})


app.post("/register", (req, res) => {
    const { username, password, firstName } = req.body;

    if (!username || !password || !firstName) {
        return res.status(422).json({ error: "Missing required fields" })
    }

    const user = {
        username,
        password,
        firstName
    }

    fs.readFile(path.resolve("./users.json"), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const users = JSON.parse(data);
        users.push(user);

        fs.writeFile(path.resolve("./users.json"), JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.status(201).json({ message: "User created successfully" });
        });
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.resolve("./users.json"), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const users = JSON.parse(data);

        try {
            const user = users.find(u => u.username === username);

            if (!user) {
                return res.status(401).json({ error: 'User Not Found' });
            }

            if (user.password !== password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }


            return res.json({
                message: 'Logged in successfully',
                profile: { name: user.username }
            });

        } catch (error) {

        }

    })

})


app.get("/todos", (req, res) => {
    fs.readFile(path.resolve("./todos.json"), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(JSON.parse(data));
    })
})

app.get("/todos/:id", (req, res) => {

    const id = req.params.id;

    fs.readFile(path.resolve("./todos.json"), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const todos = JSON.parse(data);

        if (id < 0 || id > todos.length) {
            return res.status(404).json({ error: "Todo not found" });
        }

        let singleToDo = todos.find((todo, i) => {
            return i === id - 1;
        })

        return res.json(singleToDo);
    })
})

app.post("/todos", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(422).json({ error: "Missing required fields" })
    }

    let todoItem = {
        text,
        status: false
    };

    fs.readFile(path.resolve("./todos.json"), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        let todos = JSON.parse(data);
        todos.push(todoItem);

        fs.writeFile(path.resolve("./todos.json"), JSON.stringify(todos), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.status(201).json({ message: "Todo Created Successfully" });
        });

    })

})

app.patch("/todos/:id", (req, res) => {

    const id = req.params.id;

    fs.readFile(path.resolve("./todos.json"), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const todos = JSON.parse(data);

        if (id < 0 || id > todos.length) {
            return res.status(404).json({ error: "Todo not found" });
        }

        let singleToDo = todos.find((todo, i) => {
            return i === id - 1;
        })

        singleToDo.status = !singleToDo.status;

        fs.writeFile(path.resolve("./todos.json"), JSON.stringify(todos), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.status(201).json({ message: "Todo Updated Successfully", singleToDo });
        });
    })

})

app.listen(port, () => {
    console.log('Server Running on ' + port)
})