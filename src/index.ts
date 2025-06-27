import express from "express";

import bookRoutes from "./routes/book";
import cartRoutes from "./routes/cart";
import customerRoutes from "./routes/customer";
import orderRoutes from "./routes/order";
import transactionRoutes from "./routes/transaction";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use("/api/book", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", transactionRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
