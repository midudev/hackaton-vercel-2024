import { Reviews } from "@/components/reviews";
import { getGame } from "@/lib/data";

export default async function Home() {
  const game = await getGame("the-last-of-us-part-ii-remastered"); 

  return <Reviews game={game} />;
}
