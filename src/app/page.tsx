"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", formData);
      setResult(response.data.probability + " - " + response.data.reason);
    } catch {
      setResult("Error analyzing image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Scam Detector</h1>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
        className="mb-4"
      />
      <button 
        onClick={handleUpload} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Check Scam
      </button>
      {result && <p className="mt-4 text-lg font-medium">{result}</p>}
    </div>
  );
}

