export async function GET(request) {
  const apiKey = "ef4c3a54f35c40998220ab80b52c1efe";

  // Extract the sources parameter from the query
  const url = new URL(request.url);
  const sources = url.searchParams.get("sources") || "bbc-news"; // Default to bbc-news if no source is passed

  const apiUrl = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: `Failed to fetch news from ${sources}` }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching news from the source" }),
      { status: 500 }
    );
  }
}
