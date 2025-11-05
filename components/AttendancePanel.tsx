'use client';

import { useState } from 'react';
import { Student } from '@/types';
import { QrCode, Check, X } from 'lucide-react';

interface AttendancePanelProps {
  students: Student[];
}

export default function AttendancePanel({ students }: AttendancePanelProps) {
  const [showQR, setShowQR] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});
  
  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'PRESENT' ? 'ABSENT' : 'PRESENT'
    }));
  };
  
  const markAllPresent = () => {
    const newAttendance: Record<string, 'PRESENT'> = {};
    students.forEach(s => {
      newAttendance[s.id] = 'PRESENT';
    });
    setAttendance(newAttendance);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Mark Attendance</h3>
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 px-4 py-2 bg-lecturer text-white rounded-lg hover:bg-green-600 transition"
        >
          <QrCode size={20} />
          Generate QR
        </button>
      </div>
      
      {showQR && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg text-center">
          <div className="w-48 h-48 bg-white border-2 border-lecturer mx-auto mb-3 flex items-center justify-center">
            <QrCode size={120} className="text-lecturer" />
          </div>
          <p className="text-sm text-gray-600">QR Code expires in 10 minutes</p>
        </div>
      )}
      
      <div className="mb-4 flex gap-2">
        <button
          onClick={markAllPresent}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm"
        >
          Mark All Present
        </button>
        <button
          onClick={() => setAttendance({})}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{student.metadata?.name}</p>
              <p className="text-sm text-gray-600">
                Roll: {student.metadata?.roll_no} | Class: {student.metadata?.class?.value}{student.metadata?.section}
              </p>
            </div>
            
            <button
              onClick={() => toggleAttendance(student.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                attendance[student.id] === 'PRESENT'
                  ? 'bg-green-100 text-green-700'
                  : attendance[student.id] === 'ABSENT'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {attendance[student.id] || 'Not Marked'}
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 bg-lecturer text-white rounded-lg font-medium hover:bg-green-600 transition">
        Submit Attendance
      </button>
    </div>
  );
}