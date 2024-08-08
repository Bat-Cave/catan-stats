"use client";

import useLocalStorage from "@/app/hooks/use-local-storage";
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
import { Roll } from "@/context/appwrite-schemas";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  2: {
    label: "2",
    color: "#06b6d4",
  },
  3: {
    label: "3",
    color: "#6366f1",
  },
  4: {
    label: "4",
    color: "#d946ef",
  },
  5: {
    label: "5",
    color: "#ec4899",
  },
  6: {
    label: "6",
    color: "#f43f5e",
  },
  7: {
    label: "7",
    color: "#f97316",
  },
  8: {
    label: "8",
    color: "#f43f5e",
  },
  9: {
    label: "9",
    color: "#ec4899",
  },
  10: {
    label: "10",
    color: "#d946ef",
  },
  11: {
    label: "11",
    color: "#6366f1",
  },
  12: {
    label: "12",
    color: "#06b6d4",
  },
} satisfies ChartConfig;

export default function Page({ params }: { params: { game: string } }) {
  const { game } = params;
  const [rolls, setRolls] = useLocalStorage<Roll[]>("rolls", []);

  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: async () => await getGameByGameId({ gameId: game! }),
    enabled: !!game,
  });

  const gameData = data?.documents?.[0];

  const handleAddDiceRoll = (num: number) => {
    const roll = {
      gameId: gameData?.$id || "",
      date: Date.now(),
      roll: num,
    };

    setRolls([...rolls, roll]);
  };

  const rollCounts = rolls.reduce(
    (acc, roll) => {
      acc[roll.roll as keyof typeof acc] += 1;
      return acc;
    },
    {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    }
  );

  const chartData = Object.entries(rollCounts).map(([key, rolls]) => ({
    name: key,
    rolls,
    fill: chartConfig[key].color,
  }));

  console.log(chartData);

  return (
    <main className="w-full grow max-w-5xl mx-auto flex flex-col pt-16">
      {!gameData ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-3xl font-bold">{gameData.name}</h1>
            <GameStatusBadge status={gameData.status} />
          </div>
          <p className="text-neutral-700">
            Created: {format(new Date(gameData.$createdAt), "PP @ p")}
          </p>
          <div className="grid grid-cols-[2fr,1fr] gap-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Roll Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[200px] w-full"
                >
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />{" "}
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="rolls" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Dice Roll</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2">
                {possibleRolls.map((number) => (
                  <AspectRatio key={`dice-number-${number}`} ratio={1 / 1}>
                    <Button
                      onClick={() => handleAddDiceRoll(number)}
                      className="w-full h-full text-3xl flex flex-col"
                    >
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
