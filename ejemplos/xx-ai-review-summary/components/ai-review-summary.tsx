import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Game } from "@/lib/types";
import { summarizeReviews } from "@/lib/ai-summary";

import { Score } from "./score";

export async function AIReviewSummary({ game }: { game: Game }) {
  if (!game) return null;

  const summary = await summarizeReviews(game.id);

  return (
    <Card className="w-full max-w-prose p-10 grid gap-10">
  
      <CardHeader className="items-center flex-row justify-between space-y-0 gap-4 p-0">

        <div className="gap-1 flex-col text-left flex">
          <CardTitle className="text-2xl">{game.name}</CardTitle>
          <CardDescription className="text-xs">
            Basado en {game?.reviews?.length} valoraciones de usuarios
          </CardDescription>
        </div>

        <Score rating={Math.round(game.score)} />
      </CardHeader>

      <CardContent className="p-0 grid gap-4">
        <p className="text-sm leading-relaxed text-gray-300">
          {summary}
        </p>
      </CardContent>

      <img className="w-full h-auto" src={game.img} alt={game.name} />
    </Card>
  );
}
