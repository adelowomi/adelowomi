export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminUserData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAdminUserData {
  name: string;
  email: string;
  password?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class AdminUserService {
  private baseUrl = "/api/admin/users";

  async getUsers(): Promise<ApiResponse<AdminUser[]>> {
    try {
      const response = await fetch(this.baseUrl);
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Failed to fetch admin users",
      };
    }
  }

  async getUser(id: string): Promise<ApiResponse<AdminUser>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Failed to fetch admin user",
      };
    }
  }

  async createUser(data: CreateAdminUserData): Promise<ApiResponse<AdminUser>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Failed to create admin user",
      };
    }
  }

  async updateUser(
    id: string,
    data: UpdateAdminUserData
  ): Promise<ApiResponse<AdminUser>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Failed to update admin user",
      };
    }
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Failed to delete admin user",
      };
    }
  }
}

export const adminUserService = new AdminUserService();
