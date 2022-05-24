const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3jkph.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {


    try {
        await client.connect();

        const serviceCollection = client.db('computer_hub').collection('product');


        // get all product data
        app.get('/product', async (req, res) => {

            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);

        })

        // get single data
        app.get('/product/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await serviceCollection.findOne(query);

            res.send(product);

        })


    }
    finally {

    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from Computer Hub!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})