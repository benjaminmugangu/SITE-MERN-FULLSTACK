import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";

dotenv.config();

const app = express();
const port = 5000;
const uri = process.env.MONGO_URI;

// Middleware pour parser le JSON
app.use(express.json());

// Création du client MongoDB
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connexion à la base de données réussie");
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1); // Arrête l'application en cas d'échec critique
  }
}

// Route pour récupérer les posts
app.get("/", async (_, res) => {
  try {
    const db = client.db("blog");
    const posts = await db.collection("posts").find().toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// 🚀 Route pour ajouter un nouveau post (POST /add)
app.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Titre et contenu requis" });
    }

    const db = client.db("blog");
    const result = await db.collection("posts").insertOne({ title, content });

    res.status(201).json({ message: "Post ajouté avec succès", id: result.insertedId });
  } catch (error) {
    console.error("Erreur lors de l'ajout du post :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// 🚀 Route GET /add pour tester si elle fonctionne (facultatif)
app.get("/add", (_, res) => {
  res.send("Route /add fonctionne, mais utilise POST pour ajouter un post.");
});

// Lancer le serveur après la connexion à la base de données
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
  });
});
