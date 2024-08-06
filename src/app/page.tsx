"use client";

import { GameStatusBadge } from "@/components/game-status-badge";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createGame, getGamesByUser } from "@/context/appwrite-functions";
import { Game } from "@/context/appwrite-schemas";
import { useAppwrite } from "@/context/use-appwrite";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { user } = useAppwrite();
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesFetched, setGamesFetched] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getGamesByUser({ userId: user.$id });
        setGames(response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.$id && !gamesFetched) {
      setGamesFetched(true);
      fetchGames();
    }
  }, [gamesFetched, user]);

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const response = await createGame({ userId: user.$id });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full grow max-w-5xl mx-auto flex flex-col pt-16">
      <h1 className="text-3xl font-bold">Catan Stats</h1>
      {user ? (
        <div className="w-full flex-col gap-2 mt-4">
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Your Games</CardTitle>
                <CardDescription>Keep track of your games</CardDescription>
              </div>

              <Button onClick={handleCreateGame} disabled>
                {loading ? (
                  <>
                    <Spinner /> Creating...
                  </>
                ) : (
                  "Create Game"
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {games.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {games.map((game) => (
                    <div
                      key={game.$id}
                      className="flex flex-row justify-between"
                    >
                      <div>{game.$id}</div>
                      <div>
                        <GameStatusBadge status={game.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No games found</div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </main>
  );
};

export default HomePage;
