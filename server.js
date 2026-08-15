import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { PRODUCTS as INITIAL_PRODUCTS, BEST_DEALS as INITIAL_BEST_DEALS } from './src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const makeIdQuery = (id) => {
  if (!id) return {};
  const queries = [
    { id: id },
    { id: Number(id) },
    { id: String(id) },
    { _id: id }
  ];
  if (ObjectId.isValid(id)) {
    try {
      queries.push({ _id: new ObjectId(id) });
    } catch (_e) {}
  }
  return { $or: queries };
};

let client;
let db;
let productsCollection;
let bestDealsCollection;
let usersCollection;
let serviceRequestsCollection;
let ordersCollection;

const dbConnectionPromise = (async function connectToMongoDB() {
  const atlasUri = process.env.MONGODB_URI || "mongodb+srv://keshawapremarathne039_db_user:dFzOTheg92fO3Leo@sloffice.fykccfx.mongodb.net/sloffice_db?authSource=admin&retryWrites=true&w=majority&appName=sloffice";
  const localUri = "mongodb://127.0.0.1:27017/sloffice_db";

  // Attempt 1: Connect to MongoDB Atlas Cloud
  try {
    const atlasClient = new MongoClient(atlasUri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 5000,
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
    });
    await atlasClient.connect();
    await atlasClient.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB Atlas Cloud Database!");
    client = atlasClient;
    db = client.db("sloffice_db");
  } catch (_atlasError) {
    console.log("ℹ️ MongoDB Atlas Cloud connection failed or restricted, attempting Local MongoDB...");
    // Attempt 2: Connect to Local MongoDB
    try {
      const localClient = new MongoClient(localUri, { directConnection: true, family: 4, serverSelectionTimeoutMS: 2000 });
      await localClient.connect();
      console.log("✅ Successfully connected to Local MongoDB database!");
      client = localClient;
      db = client.db("sloffice_db");
    } catch (_localError) {
      console.warn("⚠️ Both MongoDB Atlas and Local MongoDB connections failed. Running in standalone fallback mode.");
    }
  }

  if (db) {
    productsCollection = db.collection("products");
    bestDealsCollection = db.collection("best_deals");
    usersCollection = db.collection("users");
    serviceRequestsCollection = db.collection("service_requests");
    ordersCollection = db.collection("orders");

    (async () => {
      try {
        const productCount = await productsCollection.countDocuments();
        if (productCount === 0 && INITIAL_PRODUCTS.length > 0) {
          console.log("Seeding initial products to MongoDB database...");
          await productsCollection.insertMany(INITIAL_PRODUCTS);
        }
        const dealCount = await bestDealsCollection.countDocuments();
        if (dealCount === 0 && INITIAL_BEST_DEALS.length > 0) {
          console.log("Seeding initial best deals to MongoDB database...");
          await bestDealsCollection.insertMany(INITIAL_BEST_DEALS);
        }
        const userCount = await usersCollection.countDocuments();
        if (userCount === 0) {
          console.log("Seeding initial Master Admin account into MongoDB database...");
          await usersCollection.insertOne({
            id: "master_admin_1",
            email: "admin.master@sloffice.com",
            password: "admin123",
            name: "System Master Admin",
            role: "Master Admin (Full System Access)",
            permissions: "Full System Access",
            phone: "+94 11 555 0199",
            status: "Active",
            createdDate: new Date().toISOString().split('T')[0]
          });
        }
      } catch (_e) {}
    })();
  }
})();

// Helper middleware to ensure DB connection is awaited if pending
app.use(async (req, res, next) => {
  if (req.url.startsWith('/api/')) {
    await dbConnectionPromise;
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SL Office Solutions Express Server is running',
    dbConnected: Boolean(db)
  });
});

// ADMIN AUTHENTICATION LOGIN ENDPOINT
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (usersCollection) {
      const user = await usersCollection.findOne({
        email: cleanEmail,
        password: password
      });

      if (user) {
        const { password: _password, ...userWithoutPassword } = user;
        return res.json({ success: true, user: userWithoutPassword });
      }
    }

    // Fallback default admin check
    if (cleanEmail === "admin.master@sloffice.com" && password === "admin123") {
      return res.json({
        success: true,
        user: {
          id: "master_admin_1",
          name: "System Master Admin",
          email: "admin.master@sloffice.com",
          role: "Master Admin (Full System Access)",
          phone: "+94 11 555 0199"
        }
      });
    }

    return res.status(401).json({ success: false, message: "Access Denied: Invalid Email or Password" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error during authentication" });
  }
});

// GET ALL ADMIN/SUB-ADMIN USERS
app.get('/api/admin/users', async (req, res) => {
  try {
    if (!usersCollection) {
      return res.json([]);
    }
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ error: "Failed to fetch admin users" });
  }
});

// POST CREATE NEW ADMIN/SUB-ADMIN USER
app.post('/api/admin/users', async (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser.email || !newUser.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    newUser.email = newUser.email.toLowerCase().trim();
    newUser.id = newUser.id || Date.now();
    newUser.createdDate = newUser.createdDate || new Date().toISOString().split('T')[0];
    newUser.status = newUser.status || "Active";

    if (!usersCollection) {
      return res.status(503).json({ error: "Database connection not established" });
    }

    const existing = await usersCollection.findOne({ email: newUser.email });
    if (existing) {
      return res.status(400).json({ error: "An account with this email already exists" });
    }
    const result = await usersCollection.insertOne(newUser);

    const { password: _password, ...userWithoutPassword } = newUser;
    res.status(201).json({ ...userWithoutPassword, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating sub-admin user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// DELETE ADMIN/SUB-ADMIN USER
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    if (usersCollection) {
      await usersCollection.deleteOne(makeIdQuery(userId));
    }
    res.json({ message: "User deleted successfully", id: userId });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// SERVICE REQUESTS ENDPOINTS
app.get('/api/service-requests', async (req, res) => {
  try {
    if (!serviceRequestsCollection) {
      return res.json([]);
    }
    const requests = await serviceRequestsCollection.find({}).sort({ id: -1 }).toArray();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ error: "Failed to fetch service requests" });
  }
});

app.post('/api/service-requests', async (req, res) => {
  try {
    const newRequest = req.body;
    if (!newRequest.name || !newRequest.phone) {
      return res.status(400).json({ error: "Customer name and phone number are required" });
    }

    newRequest.id = newRequest.id || Date.now();
    newRequest.date = newRequest.date || new Date().toISOString().split('T')[0];
    newRequest.status = newRequest.status || "New";

    if (!serviceRequestsCollection) {
      return res.status(503).json({ error: "Database connection not established" });
    }

    const result = await serviceRequestsCollection.insertOne(newRequest);
    res.status(201).json({ ...newRequest, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({ error: "Failed to create service request" });
  }
});

app.put('/api/service-requests/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (serviceRequestsCollection) {
      await serviceRequestsCollection.updateOne(
        makeIdQuery(requestId),
        { $set: { status: status } }
      );
    }
    res.json({ message: "Service request status updated", id: requestId, status });
  } catch (error) {
    console.error("Error updating service request:", error);
    res.status(500).json({ error: "Failed to update service request" });
  }
});

app.delete('/api/service-requests/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    if (serviceRequestsCollection) {
      await serviceRequestsCollection.deleteOne(makeIdQuery(requestId));
    }
    res.json({ message: "Service request deleted successfully", id: requestId });
  } catch (error) {
    console.error("Error deleting service request:", error);
    res.status(500).json({ error: "Failed to delete service request" });
  }
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    if (!productsCollection) {
      return res.json(INITIAL_PRODUCTS);
    }
    let products = await productsCollection.find({}).toArray();
    if (!products || products.length === 0) {
      await productsCollection.insertMany(INITIAL_PRODUCTS);
      products = INITIAL_PRODUCTS;
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.json(INITIAL_PRODUCTS);
  }
});

// POST add new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body;
    if (!newProduct.id) {
      newProduct.id = Date.now();
    }
    if (!productsCollection) {
      return res.status(503).json({ error: "Database connection not established" });
    }
    const result = await productsCollection.insertOne(newProduct);
    res.status(201).json({ ...newProduct, _id: result.insertedId });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    if (productsCollection) {
      await productsCollection.updateOne(
        makeIdQuery(productId),
        { $set: updatedData }
      );
    }
    res.json({ message: "Product updated successfully", product: updatedData });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (productsCollection) {
      await productsCollection.deleteOne(makeIdQuery(productId));
    }
    if (bestDealsCollection) {
      await bestDealsCollection.deleteOne(makeIdQuery(productId));
    }
    res.json({ message: "Product deleted successfully", id: productId });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// GET best deals
app.get('/api/best-deals', async (req, res) => {
  try {
    if (!bestDealsCollection) {
      return res.json(INITIAL_BEST_DEALS);
    }
    let deals = await bestDealsCollection.find({}).toArray();
    if (!deals || deals.length === 0) {
      await bestDealsCollection.insertMany(INITIAL_BEST_DEALS);
      deals = INITIAL_BEST_DEALS;
    }
    res.json(deals);
  } catch (error) {
    console.error("Error fetching best deals:", error);
    res.json(INITIAL_BEST_DEALS);
  }
});

// POST add best deal
app.post('/api/best-deals', async (req, res) => {
  try {
    const newDeal = req.body;
    if (!bestDealsCollection) {
      return res.status(503).json({ error: "Database connection not established" });
    }
    await bestDealsCollection.deleteOne(makeIdQuery(newDeal.id));
    const result = await bestDealsCollection.insertOne(newDeal);
    res.status(201).json({ ...newDeal, _id: result.insertedId });
  } catch (error) {
    console.error("Error adding best deal:", error);
    res.status(500).json({ error: "Failed to add best deal" });
  }
});

// DELETE best deal
app.delete('/api/best-deals/:id', async (req, res) => {
  try {
    const dealId = req.params.id;
    if (bestDealsCollection) {
      await bestDealsCollection.deleteOne(makeIdQuery(dealId));
    }
    res.json({ message: "Best deal deleted successfully", id: dealId });
  } catch (error) {
    console.error("Error deleting best deal:", error);
    res.status(500).json({ error: "Failed to delete best deal" });
  }
});

// ORDERS MANAGEMENT API
app.get('/api/orders', async (req, res) => {
  try {
    if (ordersCollection) {
      const orders = await ordersCollection.find({}).sort({ created_at: -1, _id: -1 }).toArray();
      return res.json(orders);
    }
    res.json([]);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = req.body;
    if (!ordersCollection) {
      return res.status(503).json({ error: "Database connection not established" });
    }
    const result = await ordersCollection.insertOne(newOrder);
    res.status(201).json({ ...newOrder, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    if (ordersCollection) {
      await ordersCollection.updateOne(
        makeIdQuery(orderId),
        { $set: { status } }
      );
    }
    res.json({ message: "Order updated successfully", id: orderId, status });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    if (ordersCollection) {
      await ordersCollection.deleteOne(makeIdQuery(orderId));
    }
    res.json({ message: "Order deleted successfully", id: orderId });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

// SPA Catch-All fallback
app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) return next();
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SL Office Backend Server running on http://127.0.0.1:${PORT}`);
});
