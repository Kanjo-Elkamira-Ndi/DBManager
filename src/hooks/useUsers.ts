import { useState, useEffect, useCallback } from 'react';
import type { User, PaginatedResponse } from '../types';import { getUsers } from '../services/api';

export function useUsers(initialPage: number = 1, pageSize: number = 10) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await getUsers(page, pageSize);

    if (response.success && response.data) {
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages);
    } else {
      setError(response.error?.message || 'Failed to fetch users');
    }

    setLoading(false);
  }, [page, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    page,
    totalPages,
    setPage,
    refetch: fetchUsers,
  };
}