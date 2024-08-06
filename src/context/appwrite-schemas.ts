export type GameStatus =
  | "in-progress"
  | "not-started"
  | "finished"
  | "cancelled";

export type Game = {
  status: GameStatus;
  userId: string;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: Array<string>;
  $databaseId: string;
  $collectionId: string;
};
