export type GameStatus =
  | "in-progress"
  | "not-started"
  | "finished"
  | "cancelled";

export type Game = {
  status: GameStatus;
  userId: string;
  name: string;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: Array<string>;
  $databaseId: string;
  $collectionId: string;
};

export type Roll = {
  gameId: string;
  date: string;
  roll: number;
  id: string;
};
