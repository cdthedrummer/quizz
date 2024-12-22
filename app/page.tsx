'use client';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-blue-900">✨ Build Your Character!</h1>
          <p className="text-lg text-blue-700">
            Discover your strengths and find ways to level up in real life!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
          {/* Quiz content will go here */}
          <p className="text-center text-xl">Ready to begin your journey? 🚀</p>
        </div>
      </div>
    </main>
  );
}