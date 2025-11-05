import { getStudents, getAttendanceRecords, getRewards } from '@/lib/cosmic';
import AttendancePanel from '@/components/AttendancePanel';
import RewardVerificationQueue from '@/components/RewardVerificationQueue';

export default async function LecturerDashboard() {
  const [students, attendanceRecords, rewards] = await Promise.all([
    getStudents(),
    getAttendanceRecords(),
    getRewards(),
  ]);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-lecturer">Lecturer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage attendance and verify rewards</p>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Attendance Panel */}
          <AttendancePanel students={students} />
          
          {/* Class Analytics */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Class Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-lecturer">{students.length}</p>
                <p className="text-sm text-gray-600 mt-1">Total Students</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-student">85%</p>
                <p className="text-sm text-gray-600 mt-1">Avg Attendance</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-principal">{rewards.filter(r => r.metadata?.status?.value === 'PENDING_LECTURER').length}</p>
                <p className="text-sm text-gray-600 mt-1">Pending Verifications</p>
              </div>
            </div>
          </div>
          
          {/* Recent Attendance */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Attendance Records</h3>
            <div className="space-y-3">
              {attendanceRecords.slice(0, 3).map((record) => (
                <div key={record.id} className="border-l-4 border-lecturer pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Class {record.metadata?.class}{record.metadata?.section}</p>
                      <p className="text-sm text-gray-600">{new Date(record.metadata?.date || '').toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      record.metadata?.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.metadata?.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {record.metadata?.entries?.length || 0} students marked
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - 4 cols */}
        <div className="lg:col-span-4">
          {/* Reward Verification Queue */}
          <RewardVerificationQueue rewards={rewards} />
        </div>
      </div>
    </div>
  );
}