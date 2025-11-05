import { Notice } from '@/types';
import { Bell } from 'lucide-react';

interface NoticesWidgetProps {
  notices: Notice[];
}

export default function NoticesWidget({ notices }: NoticesWidgetProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-700';
      case 'HIGH': return 'bg-orange-100 text-orange-700';
      case 'NORMAL': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Notices</h3>
        <Bell className="text-gray-400" size={20} />
      </div>
      
      <div className="space-y-3">
        {notices.slice(0, 3).map((notice) => (
          <div key={notice.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-start justify-between">
              <p className="font-medium text-sm">{notice.metadata?.title || notice.title}</p>
              <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(notice.metadata?.priority?.value)}`}>
                {notice.metadata?.priority?.value || 'NORMAL'}
              </span>
            </div>
            {notice.metadata?.expiry_date && (
              <p className="text-xs text-gray-500 mt-1">
                Expires: {new Date(notice.metadata.expiry_date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
        
        {notices.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No notices available</p>
        )}
      </div>
      
      {notices.length > 3 && (
        <button className="w-full mt-4 text-sm text-blue-600 hover:underline">
          View all notices →
        </button>
      )}
    </div>
  );
}