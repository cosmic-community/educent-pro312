import { Student, Reward } from '@/types';

interface RewardEligibilityProps {
  student: Student;
  rewards: Reward[];
}

export default function RewardEligibility({ student, rewards }: RewardEligibilityProps) {
  const eligibility = student.metadata?.reward_eligibility;
  const isEligible = eligibility?.is_eligible || false;
  const spinsUsed = eligibility?.spins_used || 0;
  const maxSpins = 1; // From config
  
  const pendingReward = rewards.find(r => 
    r.metadata?.status?.value?.startsWith('PENDING')
  );
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="text-lg font-semibold mb-4">Reward Eligibility</h3>
      
      <div className="space-y-4">
        {isEligible ? (
          <>
            <div className="text-center py-4 bg-green-50 rounded-lg">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-green-700">You're Eligible!</p>
              <p className="text-sm text-gray-600 mt-1">
                Spins used: {spinsUsed}/{maxSpins}
              </p>
            </div>
            
            {pendingReward && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Pending Reward</p>
                <p className="text-xs text-gray-600 mt-1">
                  Status: {pendingReward.metadata?.status?.value?.replace(/_/g, ' ')}
                </p>
              </div>
            )}
            
            {spinsUsed < maxSpins && !pendingReward && (
              <button className="w-full py-3 gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition">
                🎯 Spin the Reward Wheel
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600">Complete 60 days attendance streak to unlock rewards</p>
            <div className="mt-4 bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min((student.metadata?.attendance_summary?.current_streak || 0) / 60 * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {student.metadata?.attendance_summary?.current_streak || 0}/60 days
            </p>
          </div>
        )}
      </div>
    </div>
  );
}