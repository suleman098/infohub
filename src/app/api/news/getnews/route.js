export async function GET(request) {
  const url = "https://newsapi.org/v2/top-headlines";
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;


  const { searchParams } = new URL(request.url);
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
