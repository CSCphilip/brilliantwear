import { parameterRetrieve } from ".";

export async function getMongoPassword() {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("Trying to retrieve the MongoDB Password from the .env file");

      const mongoDBPassword = process.env.MongoDB_Password;

      if (mongoDBPassword !== undefined) {
        console.log(
          "Successfully retrieved the MongoDB Password the .env file"
        );

        return mongoDBPassword;
      } else {
        throw new Error(
          "Could not retrieve the MongoDB Password from the .env file"
        );
      }
    } else {
      console.log("Trying to retrieve the MongoDB Password from AWS SSM");

      const mongoPassword = await parameterRetrieve(
        "Brilliantwear-MongoDB-Password"
      );

      if (mongoPassword !== undefined) {
        return mongoPassword;
      } else {
        throw new Error("Could not retrieve the MongoDB Password from AWS SSM");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
