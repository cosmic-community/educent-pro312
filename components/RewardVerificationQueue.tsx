import { Reward } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';

interface RewardVerificationQueueProps {
  rewards: Reward[];
}

export default function RewardVerificationQueue({ rewards }: RewardVerificationQueueProps) {
  const pendingRewards = rewards.filter(r => r.metadata?.status?.value === 'PENDING_LECTURER');
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="text-lg font-semibold mb-4">Reward Verification Queue</h3>
      
      {pendingRewards.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">No pending verifications</p>
      ) : (
        <div className="space-y-3">
          {pendingRewards.map((reward) => {
            const student = typeof reward.metadata?.student === 'object' 
              ? reward.metadata.student 
              : null;
              
            return (
              <div key={reward.id} className="border rounded-lg p-4">
                <div className="mb-3">
                  <p className="font-medium">{reward.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Student: {student?.metadata?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Amount: ₹{reward.metadata?.prize?.amount || reward.metadata?.default_amount || 0}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Verify</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                    <XCircle size={16} />
                    <span className="text-sm font-medium">Reject</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}