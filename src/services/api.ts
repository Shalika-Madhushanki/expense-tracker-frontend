const API_BASE_URL = "http://localhost:8080/api";

const handleApiResponse = async (response: any) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Catch JSON parsing errors
    const errorMessage = errorData?.errorMessage || "Something went wrong";
    throw new Error(errorMessage);
  }
  if (response.status === 204 || response.status === 201) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

export const apiCall = async (
  endpoint: string,
  method: string,
  body: any = null,
  headers = {},
) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (method !== "GET" && method !== "HEAD") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await handleApiResponse(response);
  } catch (error) {
    console.error("API call failed:", error.message);
    throw error;
  }
};
