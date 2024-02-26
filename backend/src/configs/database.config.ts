import { connect, ConnectOptions } from "mongoose";

export const dpConnect = () => {
  connect(process.env.MONGO_URI!, {} as ConnectOptions).then(
    () => console.log("Connect successfully"),
    (error) => console.log(error)
  );
};
