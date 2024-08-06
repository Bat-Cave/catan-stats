import { collectionIds, databaseIds, databases, ID } from "@/app/appwrite";
import { Query } from "appwrite";
import { Game } from "./appwrite-schemas";

const createGame = async ({ userId }: { userId: string }) => {
  return await databases
    .createDocument(databaseIds.main, collectionIds.main.games, ID.unique(), {
      userId,
      status: "active",
    })
    .then((res) => res)
    .catch((e) => e);
};

const getGamesByUser = async ({
  userId,
}: {
  userId: string;
}): Promise<{ totals: number; documents: Game[] }> => {
  if (!userId) {
    console.warn("userId is required");
    return { totals: 0, documents: [] };
  }

  return await databases
    .listDocuments(databaseIds.main, collectionIds.main.games, [
      Query.equal("userId", userId),
    ])
    .then((res) => res)
    .catch((e) => e);
};

const getGameByGameId = async ({
  gameId,
}: {
  gameId: string;
}): Promise<{ totals: number; documents: Game[] }> => {
  if (!gameId) {
    console.warn("gameId is required");
    return { totals: 0, documents: [] };
  }

  return await databases
    .listDocuments(databaseIds.main, collectionIds.main.games, [
      Query.equal("$id", gameId),
    ])
    .then((res) => res)
    .catch((e) => e);
};

export { createGame, getGamesByUser, getGameByGameId };
