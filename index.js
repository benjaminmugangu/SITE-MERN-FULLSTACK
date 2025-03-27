// On importe MongoClient de la bibliothèque MongoDB pour pouvoir se connecter à la base de données.
import { MongoClient } from "mongodb";
// On importe dotenv pour pouvoir charger les variables d'environnement du fichier .env.
import dotenv from "dotenv";

// On charge les variables d'environnement du fichier .env.
dotenv.config();

// On récupère l'URL de connexion à MongoDB depuis les variables d'environnement.
const uri = process.env.MONGO_URI;

// Création d'un client MongoDB en utilisant l'URI de connexion.
const client = new MongoClient(uri);

// Fonction asynchrone pour tester la connexion à MongoDB.
async function testConnection() {
  try {
    // Connexion à la base de données MongoDB.
    await client.connect();
    
    // Sélection de la base de données "blog" (il faut remplacer par le nom réel de ta base de données).
    const db = client.db("blog"); // Mets le bon nom ici
    
    // Sélection de la collection "posts" (il faut remplacer par le nom réel de ta collection).
    const collection = db.collection("posts"); // Mets le bon nom ici
    
    // Recherche tous les documents dans la collection et les transforme en un tableau.
    const documents = await collection.find({}).toArray();

    // Affiche les documents trouvés dans la console.
    console.log("✅ Documents trouvés :", documents);
  } catch (error) {
    // Si une erreur se produit, on l'affiche dans la console.
    console.error("❌ Erreur MongoDB :", error);
  } finally {
    // On ferme la connexion avec MongoDB à la fin, qu'il y ait une erreur ou non.
    await client.close();
  }
}

// Appel de la fonction pour tester la connexion.
testConnection();
