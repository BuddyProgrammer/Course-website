import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Connect database
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());

// Stripe webhook MUST come before express.json()
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// JSON middleware
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Clerk webhook
app.post("/clerk", clerkWebhooks);

// Routes
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});