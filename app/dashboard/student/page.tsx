import { getStudents, getNotices, getRewards } from '@/lib/cosmic';
import StreakCard from '@/components/StreakCard';
import NoticesWidget from '@/components/NoticesWidget';
import RewardEligibility from '@/components/RewardEligibility';

export default async function StudentDashboard() {
  const [students, notices, rewards] = await Promise.all([
    getStudents(),
    getNotices(),
    getRewards(),
  ]);
  
  const student = students[0]; // Demo: using first student
  
  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">No Student Data Available</h1>
          <p className="mt-2 text-gray-600">Please check your Cosmic bucket configuration.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-student">Welcome back, {student.metadata?.name || 'Student'}!</h1>
        <p className="text-gray-600 mt-2">Class {student.metadata?.class?.value}{student.metadata?.section}</p>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Streak and Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StreakCard 
              days={student.metadata?.attendance_summary?.current_streak || 0}
              lastMarkedAt={student.metadata?.attendance_summary?.last_marked || ''}
            />
            
            {/* Attendance Stats */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Days:</span>
                  <span className="font-medium">{student.metadata?.attendance_summary?.total_days || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Present Days:</span>
                  <span className="font-medium text-green-600">{student.metadata?.attendance_summary?.present_days || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Percentage:</span>
                  <span className="font-bold text-student">{student.metadata?.attendance_summary?.percentage?.toFixed(2) || 0}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-student pl-4">
                <p className="font-medium">Mathematics</p>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-student h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">75%</span>
                </div>
              </div>
              <div className="border-l-4 border-student pl-4">
                <p className="font-medium">Science</p>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-student h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">82%</span>
                </div>
              </div>
              <div className="border-l-4 border-student pl-4">
                <p className="font-medium">English</p>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-student h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          {/* Reward Eligibility */}
          <RewardEligibility 
            student={student}
            rewards={rewards.filter(r => 
              typeof r.metadata?.student === 'object' && 
              r.metadata?.student?.id === student.id
            )}
          />
          
          {/* Notices */}
          <NoticesWidget notices={notices} />
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-student text-white rounded-lg hover:bg-blue-700 transition">
                📚 Access Study Materials
              </button>
              <button className="w-full py-2 px-4 border border-student text-student rounded-lg hover:bg-blue-50 transition">
                🤖 AI Study Buddy
              </button>
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                📝 Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}