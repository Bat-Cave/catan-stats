"use client";

import { GameStatusBadge } from "@/components/game-status-badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGameByGameId } from "@/context/appwrite-functions";
import { Game } from "@/context/appwrite-schemas";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { game: string } }) {
  const { game } = params;
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [hasFetchedGame, setHasFetchedGame] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await getGameByGameId({ gameId: game });
        setActiveGame(response.documents[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (game && !activeGame && !hasFetchedGame) {
      setHasFetchedGame(true);
      fetchGame();
    }
  }, [game, activeGame, hasFetchedGame]);

  console.log(activeGame);
  console.log(possibleRolls);

  return (
    <main className="w-full grow max-w-5xl mx-auto flex flex-col pt-16">
      {!activeGame ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-3xl font-bold">{activeGame.name}</h1>
            <GameStatusBadge status={activeGame.status} />
          </div>
          <p className="text-neutral-700">
            Created: {format(new Date(activeGame.$createdAt), "PP @ p")}
          </p>
          <div className="grid grid-cols-[2fr,1fr] gap-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Roll Distribution</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Dice Roll</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2">
                {possibleRolls.map((number) => (
                  <AspectRatio key={`dice-number-${number}`} ratio={1 / 1}>
                    <Button className="w-full h-full text-3xl flex flex-col">
                      <span>{number}</span>
                      <span className="text-xs flex -space-x-3">
                        {possibleCombinations[
                          number as keyof typeof possibleCombinations
                        ].map((_, index) => (
                          <Dot
                            key={`dot-${number}-${index}`}
                            className="size-5"
                          />
                        ))}
                      </span>
                    </Button>
                  </AspectRatio>
                ))}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}

const possibleRolls = Array(11)
  .fill(false)
  .map((_, i) => i + 2);

const possibleCombinations = {
  2: [[1, 1]],
  3: [
    [1, 2],
    [2, 1],
  ],
  4: [
    [1, 3],
    [2, 2],
    [3, 1],
  ],
  5: [
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
  ],
  6: [
    [1, 5],
    [2, 4],
    [3, 3],
    [4, 2],
    [5, 1],
  ],
  7: [
    [1, 6],
    [2, 5],
    [3, 4],
    [4, 3],
    [5, 2],
    [6, 1],
  ],
  8: [
    [2, 6],
    [3, 5],
    [4, 4],
    [5, 3],
    [6, 2],
  ],
  9: [
    [3, 6],
    [4, 5],
    [5, 4],
    [6, 3],
  ],
  10: [
    [4, 6],
    [5, 5],
    [6, 4],
  ],
  11: [
    [5, 6],
    [6, 5],
  ],
  12: [[6, 6]],
};
