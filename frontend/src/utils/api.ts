export async function apiFetch<T>(url: string, method: string = 'GET', data?: unknown, token?: string): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  };
  const res = await fetch(url, options);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'API error');
  return result;
} 