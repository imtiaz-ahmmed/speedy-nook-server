const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g1mpqht.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const detailsCollection = client.db("toy_car_db").collection("details");

    app.get("/details", async (req, res) => {
      const cursor = detailsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // const querySportsCar = { subCategory: "sportsCar" };
    // app.get("/details/subCategory/sportsCars", async (req, res) => {
    //   const cursor = detailsCollection.find(querySportsCar);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });
    const querySportsCar = { subCategory: "sportsCar" };

    app.get("/details/subCategory/sportsCars", async (req, res) => {
      const cursor = detailsCollection.find(querySportsCar).limit(2);
      const result = await cursor.toArray();
      res.send(result);
    });

    const queryTruck = { subCategory: "truck" };
    app.get("/details/subCategory/trucks", async (req, res) => {
      const cursor = detailsCollection.find(queryTruck).limit(2);
      const result = await cursor.toArray();
      res.send(result);
    });
    const queryMiniFireTruck = { subCategory: "miniFireTruck" };
    app.get("/details/subCategory/miniFireTrucks", async (req, res) => {
      const cursor = detailsCollection.find(queryMiniFireTruck).limit(2);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/details/subCategory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await detailsCollection.findOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("speedy nook is running");
});

app.listen(port, () => {
  console.log(`speedy nook listening on port ${port}`);
});
