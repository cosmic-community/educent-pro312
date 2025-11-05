import { Institute } from '@/types';

interface InstituteOverviewProps {
  institute: Institute;
}

export default function InstituteOverview({ institute }: InstituteOverviewProps) {
  const config = institute.metadata?.config;
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          {institute.metadata?.logo?.imgix_url && (
            <img
              src={`${institute.metadata.logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={institute.metadata?.name || ''}
              className="w-20 h-20 rounded-lg"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{institute.metadata?.name}</h2>
            <p className="text-gray-600">Campus Code: {institute.metadata?.campus_code}</p>
            <p className="text-sm text-gray-500">{institute.metadata?.board?.value} Board</p>
          </div>
        </div>
        
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
          institute.metadata?.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {institute.metadata?.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Attendance Threshold</p>
          <p className="text-2xl font-bold text-principal">{config?.attendance_threshold || 75}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Reward Eligibility</p>
          <p className="text-2xl font-bold text-principal">{config?.reward_eligibility_days || 60} days</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Max Spins/Year</p>
          <p className="text-2xl font-bold text-principal">{config?.max_spin_per_year || 1}</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-3">Features Enabled</h3>
        <div className="flex flex-wrap gap-2">
          {config?.features?.ai_study_buddy && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              🤖 AI Study Buddy
            </span>
          )}
          {config?.features?.parent_notifications && (
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              📱 Parent Notifications
            </span>
          )}
          {config?.features?.digital_rewards && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              🎁 Digital Rewards
            </span>
          )}
        </div>
      </div>
    </div>
  );
}