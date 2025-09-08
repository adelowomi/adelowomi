"use client";

import React, { useState, useEffect } from "react";

// Simple SVG icons
const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4V16M4 10H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 1.5a1.5 1.5 0 0 1 2.12 2.12L8 9.24 5 10l.76-3L11.5 1.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4h12M5.33 4V2.67a1.33 1.33 0 0 1 1.34-1.34h2.66a1.33 1.33 0 0 1 1.34 1.34V4m2 0v8.67a1.33 1.33 0 0 1-1.34 1.33H4.67a1.33 1.33 0 0 1-1.34-1.33V4h9.34z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 17v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
import AddAdminModal from "./AddAdminModal";
import EditAdminModal from "./EditAdminModal";
import DeleteAdminModal from "./DeleteAdminModal";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const AdminUsersView = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: AdminUser) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleUserAdded = () => {
    fetchUsers();
    setShowAddModal(false);
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUserDeleted = () => {
    fetchUsers();
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Admin Users
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Manage admin users and permissions
          </p>
        </div>
        <button
          onClick={handleAddUser}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base self-start sm:self-auto"
        >
          <PlusIcon />
          <span className="hidden sm:inline">Add Admin</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-300 font-medium text-sm sm:text-base">
                  Admin
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-300 font-medium text-sm sm:text-base">
                  Email
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-300 font-medium text-sm sm:text-base">
                  Role
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-gray-300 font-medium text-sm sm:text-base hidden sm:table-cell">
                  Created
                </th>
                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 text-gray-300 font-medium text-sm sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400">
                        <UserIcon />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm sm:text-base">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-300 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                    {user.email}
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs sm:text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-400 text-sm hidden sm:table-cell">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit admin"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete admin"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && !loading && (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-500 mx-auto mb-4">
              <svg
                width="32"
                height="32"
                className="sm:w-12 sm:h-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38 41v-5a10 10 0 0 0-10-10H20a10 10 0 0 0-10 10v5M28 16a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              No admin users found
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onUserAdded={handleUserAdded}
        />
      )}

      {showEditModal && selectedUser && (
        <EditAdminModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteAdminModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
};

export default AdminUsersView;
