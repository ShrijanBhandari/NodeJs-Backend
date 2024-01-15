import mongoose from "mongoose";
export const MongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "BackendApi" })
    .then((c) => {
      console.log(`Database Connected at ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
