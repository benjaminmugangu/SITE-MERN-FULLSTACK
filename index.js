import express from "express";
import dotenv from "dotenv"; // Importation de dotenv pour gérer les variables d'environnement (créer un fichier .env à la racine du projet) et les charger dans process.env (voir https://www.npmjs.com/package/dotenv) 
import { MongoClient, ServerApiVersion } from 'mongodb';
const app = express();
const port = 4000;

// Connection URI

dotenv.config(); // Chargement des variables d'environnement dans process.env à partir du fichier .env à la racine du projet (voir https://www.npmjs.com/package/dotenv) 

const uri = process.env.MONGO_URI; // Récupération de la variable d'environnement STRING_URI (voir https://docs.mongodb.com/drivers/node/connection) 
// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connexion réussie à MongoDB !");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
  }
}

// Appel de la fonction pour se connecter à MongoDB
connectDB();

app.get("/", (_, res) => {
  res.send("Hello Express....... !");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
