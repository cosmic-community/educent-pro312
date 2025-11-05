import { createBucketClient } from '@cosmicjs/sdk';
import type { 
  Institute, 
  User, 
  Student, 
  Attendance, 
  Reward, 
  Notice,
  CosmicResponse
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch institutes
export async function getInstitutes(): Promise<Institute[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'institutes' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Institute[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching institutes:', error);
    throw new Error('Failed to fetch institutes');
  }
}

// Fetch all users (convenience function for backward compatibility)
export async function getUsers(): Promise<User[]> {
  return getUsersByRole();
}

// Fetch users by role
export async function getUsersByRole(role?: string): Promise<User[]> {
  try {
    const query: any = { type: 'users' };
    if (role) {
      query['metadata.role.value'] = role;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as User[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

// Fetch students
export async function getStudents(): Promise<Student[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'students' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Student[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students');
  }
}

// Fetch attendance records
export async function getAttendanceRecords(): Promise<Attendance[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'attendance' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    const records = response.objects as Attendance[];
    
    // Sort by date manually (newest first)
    return records.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime();
      const dateB = new Date(b.metadata?.date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching attendance:', error);
    throw new Error('Failed to fetch attendance records');
  }
}

// Fetch rewards
export async function getRewards(): Promise<Reward[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'rewards' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Reward[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching rewards:', error);
    throw new Error('Failed to fetch rewards');
  }
}

// Fetch notices
export async function getNotices(): Promise<Notice[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'notices' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    const notices = response.objects as Notice[];
    
    // Sort by creation date manually (newest first)
    return notices.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching notices:', error);
    throw new Error('Failed to fetch notices');
  }
}

// Get student by slug
export async function getStudentBySlug(slug: string): Promise<Student | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'students', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as Student;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching student:', error);
    throw new Error('Failed to fetch student');
  }
}

// Get reward by ID
export async function getRewardById(id: string): Promise<Reward | null> {
  try {
    const response = await cosmic.objects
      .findOne({ id })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as Reward;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching reward:', error);
    throw new Error('Failed to fetch reward');
  }
}