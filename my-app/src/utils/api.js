export const apiCall = async (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const isFormData = body instanceof FormData;
    const defaultHeaders = isFormData
      ? headers
      : { "content-type": "application/json", ...headers };

    console.log("the url: ", url);
    const options = {
      method,
      headers: defaultHeaders,
      body: isFormData ? body : body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // If the response is not JSON, return text (useful for debugging)
      const text = await response.text();
      console.error("Unexpected response (not JSON):", text);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error(`API ERROR: ${error.message}`);
    throw error;
  }
};
