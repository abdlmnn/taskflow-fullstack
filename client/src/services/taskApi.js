const api_url = "http://localhost:5000/api/tasks";

export const getTasks = async (search = "", status = "all") => {
  let url = `${api_url}?search=${search}&status=${status}`;

  const res = await fetch(url);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch tasks");
  }

  console.log(result.message);

  return result.data;
};

export const createTask = async (data) => {
  const res = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create task");
  }

  console.log(result.message);

  return result.data;
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${api_url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update task");
  }

  console.log(result.message);

  return result.data;
};

export const deleteTask = async (id) => {
  const res = await fetch(`${api_url}/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete task");
  }

  console.log(result.message);

  return result;
};
