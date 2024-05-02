const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const financialDataRouter = require("./routes/financialData");
const InventoryItem = require("./models/InventoryItem");
const User = require("./models/User");
const upload = require("./s3");
const bcrypt = require('bcryptjs');
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Route to handle addition operation
app.post("/api/addition", (req, res) => {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    res.json({ result: sum });
});

app.use("/api", financialDataRouter); // Mount financialDataRouter

// Correct the password in the MongoDB connection string
const dbURI =
    "mongodb+srv://faixifk:8FDPtP%23s-w%40H9v7@inventorycluster.93mlfg8.mongodb.net/inventory?retryWrites=true&w=majority&appName=InventoryCluster";
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

// Define your router here
const router = express.Router();

// POST: Create a new inventory item
router.post("/inventory", upload.single("image"), async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const newItem = new InventoryItem({
            name,
            quantity,
            imageUrl: req.file.location,
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Retrieve all inventory items
router.get("/inventory", async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update an inventory item
router.put("/inventory/:id", async (req, res) => {
    const updates = req.body;
    try {
        // Ensures that the document returned is the updated document
        const item = await InventoryItem.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!item) {
            return res.status(404).send({ message: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete an inventory item
router.delete("/inventory/:id", async (req, res) => {
    try {
        await InventoryItem.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: User SignUp
router.post("/user/signup", async (req, res) => {
    const { name, username, password, email, address } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(409).json({
                message:
                    "A user already exists",
                status: false,
            });
        }

        const newUser = new User({
            name,
            username,
            password,
            email,
            address
        });

        await newUser.save();

        res.status(200).json({
            message: "Successful signup",
            status: true,
            newUser: newUser,
        });
    } catch (error) {
        console.error("Error: ", error);

        res.status(500).json({
            message: "Signup Failed!",
            status: false,
        });
    }
});

// POST: User Login
router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({
              message: "User not found",
              status: false
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({
              message: "Invalid credentials",
              status: false
          });
      }

      res.status(200).json({
          message: "Logged in",
          status: true,
          userId: user._id,
          user: user
      });
  } catch (error) {
      console.error("Error while logging in the user: ", error);

      res.status(500).json({
          message: "Login Failed",
          status: false
      });
  }
});

// Mount the router
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
    console.log(`\nServer is running on port ${PORT}`);
});

module.exports = router; // Export the router if needed elsewhere
