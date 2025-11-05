import { getInstitutes, getUsers, getRewards, getNotices } from '@/lib/cosmic';
import { User, Notice, Reward } from '@/types';
import InstituteOverview from '@/components/InstituteOverview';

export default async function PrincipalDashboard() {
  const [institutes, users, rewards, notices] = await Promise.all([
    getInstitutes(),
    getUsers(),
    getRewards(),
    getNotices(),
  ]);
  
  const institute = institutes[0]; // Demo: using first institute
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-principal">Principal Dashboard</h1>
        <p className="text-gray-600 mt-2">Institute Management & Oversight</p>
      </div>
      
      {/* Institute Overview */}
      {institute && <InstituteOverview institute={institute} />}
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column - 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Staff Management */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Staff Overview</h3>
            <div className="space-y-3">
              {users.filter((u: User) => u.metadata?.role?.value === 'LECTURER').slice(0, 5).map((lecturer: User) => (
                <div key={lecturer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {lecturer.metadata?.avatar?.imgix_url ? (
                      <img 
                        src={`${lecturer.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={lecturer.metadata?.full_name || ''}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-lecturer/20 flex items-center justify-center">
                        <span className="text-lecturer font-semibold">
                          {lecturer.metadata?.full_name?.[0] || 'L'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{lecturer.metadata?.full_name}</p>
                      <p className="text-sm text-gray-600">{lecturer.metadata?.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    lecturer.metadata?.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {lecturer.metadata?.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Notices */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Published Notices</h3>
              <button className="text-principal hover:underline text-sm">View All</button>
            </div>
            <div className="space-y-3">
              {notices.slice(0, 3).map((notice: Notice) => (
                <div key={notice.id} className="border-l-4 border-principal pl-4 py-2">
                  <p className="font-medium">{notice.metadata?.title || notice.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Target: {notice.metadata?.target_audience?.join(', ') || 'All'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          {/* Reward Review */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Rewards Pending Review</h3>
            <div className="space-y-3">
              {rewards
                .filter((r: Reward) => r.metadata?.status?.value === 'PENDING_PRINCIPAL')
                .slice(0, 5)
                .map((reward: Reward) => (
                  <div key={reward.id} className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-sm">{reward.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Amount: ₹{reward.metadata?.prize?.amount || reward.metadata?.default_amount || 0}
                    </p>
                    <button className="mt-2 text-xs text-principal hover:underline">
                      Review →
                    </button>
                  </div>
                ))}
              {rewards.filter((r: Reward) => r.metadata?.status?.value === 'PENDING_PRINCIPAL').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No pending rewards</p>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Institute Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Staff:</span>
                <span className="font-bold">{users.filter((u: User) => u.metadata?.role?.value === 'LECTURER').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Notices:</span>
                <span className="font-bold">{notices.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Reviews:</span>
                <span className="font-bold text-principal">
                  {rewards.filter((r: Reward) => r.metadata?.status?.value === 'PENDING_PRINCIPAL').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}