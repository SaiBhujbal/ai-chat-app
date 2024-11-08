import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body to extract the message
    const { message } = await request.json();

    // Check if the message is empty
    if (!message) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    // Define the API Gateway URL
    const apiGatewayUrl = process.env.API_GATEWAY_URL;
    if (!apiGatewayUrl) {
      return NextResponse.json({ error: "API Gateway URL is not defined." }, { status: 500 });
    }

    // Log the URL and request details for debugging
    console.log("Sending request to API Gateway:", apiGatewayUrl);

    // Make a POST request to the API Gateway endpoint
    const response = await fetch(apiGatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: "user-session-id",  // Replace with dynamic session ID if available
        user_input: message             // Use "user_input" to match Lambda's expected input
      })
    });

    console.log("Response status from API Gateway:", response.status);

    // Check if the response was not successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error data from API Gateway:", errorData);
      return NextResponse.json({ error: errorData.error || "Error from API Gateway" }, { status: response.status });
    }

    // Process the response body if request was successful
    const data = await response.json();
    console.log("Received data from API Gateway:", data);

    // Return the processed response to the client
    return NextResponse.json({ response: data.response });

  } catch (error) {
    console.error("Error connecting to the API Gateway:", error);
    return NextResponse.json({ error: "Error connecting to the API Gateway." }, { status: 500 });
  }
}
