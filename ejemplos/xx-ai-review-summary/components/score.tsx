export function Score({ rating, maxScore = 100 }: { rating: number, maxScore?: number }) {
  
  const getBackgroundColor = (score: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 40) return 'bg-red-500';
    if (percentage <= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className={`flex items-center text-white justify-center font-bold rounded-full p-2 w-12 h-12 gap-1 ${getBackgroundColor(rating)}`}>
      {rating}
    </div>
  );
}