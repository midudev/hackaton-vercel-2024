import { Reviews } from "@/components/reviews";
import { getGame, games } from "@/lib/data";

export default async function GamePage({
  params: { gameId },
}: {
  params: { gameId: string };
}) {
  const game = await getGame(gameId);

  return <Reviews game={game} />;
}

export async function generateStaticParams() {
  const gameIds = Object.keys(games);

  return gameIds.map((id) => ({
    gameId: id,
  }));
}
