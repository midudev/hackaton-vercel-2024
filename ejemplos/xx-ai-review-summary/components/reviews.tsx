import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Game, Review as ReviewType } from "@/lib/types";
import ms from "ms";
import { Score } from "./score";
import { AIReviewSummary } from "./ai-review-summary";

export async function Reviews({ game }: { game: Game }) {
  return (
    <div className="mx-auto px-4 md:px-6 max-w-2xl grid gap-12">
      <AIReviewSummary game={game} />
      {game?.reviews?.map((review) => (
        <div key={review.id}>
          <Review key={review.id} review={review} />
        </div>
      ))}
    </div>
  );
}

export function Review({ review }: { review: ReviewType }) {
  const date = new Date(review.date);

  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid gap-4">
        <div className="flex gap-4 items-start">
          <div className="grid gap-0.5 text-sm">
            <h3 className="font-semibold">{review.author}</h3>
            <time
              className="text-sm text-gray-500 dark:text-gray-400"
              suppressHydrationWarning
            >
              {timeAgo(date)}
            </time>
          </div>
          <div className="flex items-center gap-0.5 ml-auto">
            <Score rating={review.score} maxScore={10} />
          </div>
        </div>
        <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
          <p>{review.quote}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * You probably want to wrap the parent element of this component with `suppressHydrationWarning`
 */
const timeAgo = (date: Date, suffix = true) => {
  if (Date.now() - date.getTime() < 1000) {
    return "Ahora";
  }

  return `hace ${ms(Date.now() - date.getTime(), { long: true })}`
};
