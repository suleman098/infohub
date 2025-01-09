export async function GET(request) {
  const url = "https://newsapi.org/v2/everything";
  const apiKey = "ef4c3a54f35c40998220ab80b52c1efe";

  const { searchParams } = new URL(request.url);

  // Default to English if language is not provided
  const language = searchParams.get("language") || "en";
  searchParams.set("language", language);

  // Limit the results to 20 by default, or use the provided value
  const pageSize = searchParams.get("pageSize") || "20";
  searchParams.set("pageSize", pageSize);

  // Optionally, filter by country if provided (e.g., "us", "gb", etc.)
  const country = searchParams.get("country");
  if (country) {
    searchParams.set("country", country);
  }

  // Add the API key to the search params
  searchParams.append("apiKey", apiKey);

  try {
    const response = await fetch(`${url}?${searchParams.toString()}`);
    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Error fetching news" }), {
      status: 500,
    });
  }
}
