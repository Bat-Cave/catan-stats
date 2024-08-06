import { Client, Account, Databases, ID } from "appwrite";

const databaseIds = {
  main: "66b27902000d78e39139",
};

const collectionIds = {
  main: {
    games: "games",
  },
};

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66b254b2000b14c5240f");

export const account = new Account(client);
export const databases = new Databases(client);

export { ID, client, databaseIds, collectionIds };
