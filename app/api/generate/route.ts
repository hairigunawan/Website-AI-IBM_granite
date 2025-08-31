import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json({ error: "Prompt kosong." }, { status: 400 });
    }

    const modelName =
      model === "pro"
        ? "ibm-granite/granite-3.2-8b-instruct" // Pro
        : "ibm-granite/granite-3.2-8b-instruct-lite"; // Free

    const input = {
      top_k: 50,
      top_p: 0.9,
      prompt: prompt.trim(),
      max_tokens: 512,
      min_tokens: 0,
      temperature: 0.6,
      system_prompt: "You are a helpful assistant.",
      presence_penalty: 0,
      frequency_penalty: 0,
    };

    // 🔹 Streaming dari Replicate
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of replicate.stream(modelName, { input })) {
            controller.enqueue(new TextEncoder().encode(event.toString()));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
