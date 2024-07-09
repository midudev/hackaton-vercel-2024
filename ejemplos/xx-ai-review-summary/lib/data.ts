import { Game } from "./types";

export async function getGame(id: string) {
  const metaCriticURL = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games-user-reviews/${id}/platform/playstation-5/web?filter=all&sort=date&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`

  const response = await fetch(metaCriticURL);
  const data = await response.json();

  // const rawInfo = data[0]
  // const rawReviews = data[2]
  const { components } = data
  const [rawInfo, _, rawReviews] = components

  const { data: { item: { criticScoreSummary, title, images } } } = rawInfo
  const { score } = criticScoreSummary

  const { bucketPath, bucketType } = images[0]
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`

  const { data: { items } } = rawReviews

  return { id, name: title, img, score, reviews: items }

}

export const games = {
  'the-last-of-us-part-ii-remastered': 'The Last of Us',
  'the-callisto-protocol': 'The Callisto Protocol',
  'the-lord-of-the-rings-gollum': 'The Lord of the Rings: Gollum'
}
