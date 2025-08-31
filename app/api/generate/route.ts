import { NextRequest, NextResponse } from 'next/server';
// npm install replicate
import Replicate from "replicate";

// Inisialisasi Replicate dengan API Token Anda
// PENTING: Simpan API Token di environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const userPrompt = formData.get('prompt') as string | null;

    if (!userPrompt) {
      return NextResponse.json({ message: 'Perintah tidak boleh kosong.' }, { status: 400 });
    }

    let fullPrompt = userPrompt;

    // Jika ada file, baca isinya dan tambahkan ke dalam prompt
    if (file) {
      const fileContent = await file.text();
      fullPrompt = `
        Berdasarkan konten file berikut:
        ---
        ${fileContent}
        ---
        Lakukan perintah ini: "${userPrompt}"
      `;
    }

    const input = {
      top_k: 50,
      top_p: 0.9,
      prompt: "How is perplexity measured for LLMs and why is it useful?",
      max_tokens: 512,
      min_tokens: 0,
      temperature: 0.6,
      system_prompt: "You are a helpful assistant.",
      presence_penalty: 0,
      frequency_penalty: 0
    };

    for await (const event of replicate.stream("ibm-granite/granite-3.2-8b-instruct", { input })) {
    process.stdout.write(event.toString());
    };

    const output = await replicate.run(
      "ibm-granite/granite-3.2-8b-instruct",
      { input }
    );
    
    const resultText = Array.isArray(output) ? output.join("") : String(output);

    // Kembalikan hasil dari AI
    return NextResponse.json({ result: resultText });

  } catch (error) {
    console.error('Error di API route:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan di server' }, { status: 500 });
  }
}
