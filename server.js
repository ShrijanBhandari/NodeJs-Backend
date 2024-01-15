import { app } from "./app.js";
import { MongoDB } from "./database/database.js";
MongoDB();
console.log("Frontend Site: " + process.env.FRONTEND_URL);
app.listen(process.env.PORT, () => {
  console.log(
    `Server connected at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
