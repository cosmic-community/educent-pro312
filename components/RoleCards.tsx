'use client';

import { GraduationCap, UserCheck, Users, Crown } from 'lucide-react';

const roles = [
  {
    title: 'Student Panel',
    description: 'Access Learning Dashboard',
    icon: GraduationCap,
    color: 'bg-student',
    textColor: 'text-student',
    href: '/dashboard/student',
  },
  {
    title: 'Lecturer Panel',
    description: 'Manage Classes & Attendance',
    icon: UserCheck,
    color: 'bg-lecturer',
    textColor: 'text-lecturer',
    href: '/dashboard/lecturer',
  },
  {
    title: 'Parent Panel',
    description: 'Track Child Progress',
    icon: Users,
    color: 'bg-parent',
    textColor: 'text-parent',
    href: '#',
  },
  {
    title: 'Principal Panel',
    description: 'Institute Management',
    icon: Crown,
    color: 'bg-principal',
    textColor: 'text-principal',
    href: '/dashboard/principal',
  },
];

export default function RoleCards() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
          <p className="text-gray-600">Access role-specific features and dashboards</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <a
                key={role.title}
                href={role.href}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border border-gray-100 group"
              >
                <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${role.textColor}`}>{role.title}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}