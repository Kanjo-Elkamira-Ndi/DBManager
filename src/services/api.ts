import type { User, PaginatedResponse, ApiResponse, DashboardStats } from '../types';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'your-api-key';

function getHeaders( ): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };
}


/**
 
 * 
 * TODO: Replace with actual API endpoint
 * const response = await fetch(`${API_BASE_URL}/users?...`)
 */
export async function getUsers(
  page: number = 1,
  pageSize: number = 10,
  filters?: Record<string, any>
): Promise<ApiResponse<PaginatedResponse<User>>> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users?page=${page}&pageSize=${pageSize}`, {
    //   headers: getHeaders(),
    // });
    // const data = await response.json();

    // PLACEHOLDER: Mock response
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      data: {
        data: [
          {
            id: '1',
            name: 'Jane Doe',
            email: 'jane@example.com',
            position: 'Manager',
            office: 'NYC',
            age: 32,
            startDate: '2021-01-12',
            salary: 145000,
            status: 'ACTIVE',
          },
        ],
        total: 100,
        page,
        pageSize,
        totalPages: Math.ceil(100 / pageSize),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch users',
      },
    };
  }
}

/**
 * Get a single user by ID
 * TODO: Replace with actual API endpoint
 */
export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    //   headers: getHeaders(),
    // });

    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      success: true,
      data: {
        id: userId,
        name: 'Jane Doe',
        email: 'jane@example.com',
        position: 'Manager',
        office: 'NYC',
        age: 32,
        startDate: '2021-01-12',
        salary: 145000,
        status: 'ACTIVE',
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch user',
      },
    };
  }
}

/**
 * Create a new user
 * TODO: Replace with actual API endpoint
 */
export async function createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users`, {
    //   method: 'POST',
    //   headers: getHeaders(),
    //   body: JSON.stringify(userData),
    // });

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      data: {
        id: `user-${Date.now()}`,
        ...userData,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create user',
      },
    };
  }
}

/**
 * Update a user
 * TODO: Replace with actual API endpoint
 */
export async function updateUser(
  userId: string,
  userData: Partial<User>
): Promise<ApiResponse<User>> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    //   method: 'PUT',
    //   headers: getHeaders(),
    //   body: JSON.stringify(userData),
    // });

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      data: {
        id: userId,
        name: userData.name || 'Jane Doe',
        email: userData.email || 'jane@example.com',
        position: userData.position || 'Manager',
        office: userData.office || 'NYC',
        age: userData.age || 32,
        startDate: userData.startDate || '2021-01-12',
        salary: userData.salary || 145000,
        status: userData.status || 'ACTIVE',
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update user',
      },
    };
  }
}

/**
 * Delete a user
 * TODO: Replace with actual API endpoint
 */
export async function deleteUser(userId: string): Promise<ApiResponse<{ success: boolean }>> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    //   method: 'DELETE',
    //   headers: getHeaders(),
    // });

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      data: { success: true },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete user',
      },
    };
  }
}

/**
 * Get dashboard statistics
 * TODO: Replace with actual API endpoint
 */
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/stats`, {
    //   headers: getHeaders(),
    // });

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      data: {
        totalCurators: 1284,
        activeNow: 42,
        newRegistrations: 156,
        pendingReviews: 8,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch stats',
      },
    };
  }
}