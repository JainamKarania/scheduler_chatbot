const BASE_URL = "http://127.0.0.1:8000/api";

export const sendMessage = async (query: string, user_id: number) => {
  const res = await fetch(`${BASE_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, user_id }),
  });

  return res.json();
};

export const getTasks = async (user_id: number) => {
  const res = await fetch(`${BASE_URL}/tasks/user/${user_id}`);
  return res.json();
};

export const getAppointments = async (user_id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/appointments/user/${user_id}`
  );
  return res.json();
};