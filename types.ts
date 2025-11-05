// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
}

// Institute type
export interface Institute extends CosmicObject {
  type: 'institutes';
  metadata: {
    name?: string;
    campus_code?: string;
    board?: {
      key?: string;
      value?: string;
    };
    principal_email?: string;
    contact_phone?: string;
    address?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    is_active?: boolean;
    config?: {
      attendance_threshold?: number;
      reward_eligibility_days?: number;
      max_spin_per_year?: number;
      features?: {
        ai_study_buddy?: boolean;
        parent_notifications?: boolean;
        digital_rewards?: boolean;
      };
    };
  };
}

// User type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name?: string;
    email?: string;
    username?: string;
    role?: {
      key?: string;
      value?: UserRole;
    };
    institute?: Institute | string;
    phone?: string;
    dob?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    is_active?: boolean;
    mfa_enabled?: boolean;
  };
}

// Student type
export interface Student extends CosmicObject {
  type: 'students';
  metadata: {
    name?: string;
    roll_no?: string;
    class?: {
      key?: string;
      value?: string;
    };
    section?: string;
    institute?: Institute | string;
    parent_connect_code?: string;
    dob?: string;
    attendance_summary?: {
      total_days?: number;
      present_days?: number;
      percentage?: number;
      current_streak?: number;
      longest_streak?: number;
      last_marked?: string;
    };
    reward_eligibility?: {
      is_eligible?: boolean;
      eligibility_date?: string;
      spins_used?: number;
      last_spin_date?: string | null;
    };
    upi_encrypted?: string;
  };
}

// Attendance type
export interface Attendance extends CosmicObject {
  type: 'attendance';
  metadata: {
    institute?: Institute | string;
    class?: string;
    section?: string;
    date?: string;
    marked_by?: User | string;
    entries?: Array<{
      student_id: string;
      roll_no: string;
      status: string;
      timestamp: string;
    }>;
    qr_used?: boolean;
    verified?: boolean;
  };
}

// Reward type
export interface Reward extends CosmicObject {
  type: 'rewards';
  metadata: {
    student?: Student | string;
    institute?: Institute | string;
    request_date?: string;
    eligibility_window?: {
      start_date?: string;
      end_date?: string;
      attendance_percentage?: number;
    };
    seed_hash?: string;
    prize_type?: {
      key?: string;
      value?: string;
    };
    prize?: {
      name?: string;
      amount?: number;
      description?: string;
    };
    default_amount?: number;
    status?: {
      key?: string;
      value?: RewardStatus;
    };
    approvals?: Array<any>;
  };
}

// Notice type
export interface Notice extends CosmicObject {
  type: 'notices';
  metadata: {
    title?: string;
    content?: string;
    institute?: Institute | string;
    target_audience?: string[];
    priority?: {
      key?: string;
      value?: string;
    };
    posted_by?: User | string;
    attachments?: any[];
    expiry_date?: string;
  };
}

// Type literals
export type UserRole = 'STUDENT' | 'LECTURER' | 'PARENT' | 'PRINCIPAL' | 'MAIN_ADMIN';
export type RewardStatus = 'PENDING_LECTURER' | 'PENDING_PRINCIPAL' | 'PENDING_ADMIN' | 'APPROVED' | 'DISBURSED' | 'REJECTED';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Auth types
export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  institute?: string;
}

// Error helper
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}