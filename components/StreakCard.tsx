interface StreakCardProps {
  days: number;
  lastMarkedAt: string;
}

export default function StreakCard({ days, lastMarkedAt }: StreakCardProps) {
  const canRequestReward = days >= 60;
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Attendance Streak</h3>
        <span className="text-3xl">🔥</span>
      </div>
      
      <div className="text-center py-4">
        <p className="text-4xl font-bold text-student">{days}</p>
        <p className="text-gray-600 mt-1">day streak</p>
      </div>
      
      {lastMarkedAt && (
        <p className="text-sm text-gray-500 text-center mb-4">
          Last marked: {new Date(lastMarkedAt).toLocaleDateString()}
        </p>
      )}
      
      <button
        disabled={!canRequestReward}
        className={`w-full py-2 px-4 rounded-lg font-medium transition ${
          canRequestReward
            ? 'bg-gradient-primary text-white hover:opacity-90'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {canRequestReward ? 'Request Reward' : `${60 - days} days until reward eligible`}
      </button>
      
      {days > 0 && days < 60 && (
        <p className="text-xs text-center text-gray-600 mt-2">
          Keep going! 🎯
        </p>
      )}
    </div>
  );
}