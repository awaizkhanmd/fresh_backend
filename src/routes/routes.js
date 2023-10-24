import express from 'express';


import multer from 'multer';
import xlsx from 'xlsx';
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });



const router = express.Router();





import ProductController from "../Controllers/ProductController.js";


router.post('/addproducts',ProductController.AddProduct);
router.post('/getProduct',ProductController.getProductsformBarcode);



app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const fileData = req.file.buffer;
      const workbook = xlsx.read(fileData, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
  
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      if (!data || data.length === 0) {
        return res.status(400).send('No data found in the uploaded file.');
      }
  
      // Assuming the first row contains column names or keys
      const keys = Object.keys(data[0]);
  
      // Create an array of MongoDB documents
      const mongoData = data.map((row) => {
        const document = {};
        keys.forEach((key, index) => {
          document[key] = row[index];
        });
        return document;
      });
  
      // Connect to MongoDB
      const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
      await client.connect();
  
      // Specify the database and collection names
      const databaseName = 'your-database-name';
      const collectionName = 'your-collection-name';
  
      // Get the MongoDB collection
      const db = client.db(databaseName);
      const collection = db.collection(collectionName);
  
      // Insert 'mongoData' into the collection
      await collection.insertMany(mongoData);
  
      // Close the MongoDB client connection
      client.close();
  
      res.status(200).send('Data uploaded and stored in MongoDB.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading and processing the file.');
    }
  });
  











export default router;