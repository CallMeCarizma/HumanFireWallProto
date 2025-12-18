// src/components/EmailSimulator.jsx
import { useState } from 'react';

export default function EmailSimulator() {
  const [feedback, setFeedback] = useState(null);

  const checkEmail = async () => {
    try {
      const res = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailDomain: 'support@bankk.ru',
          hasAttachment: true,
          urgency: 'СРОЧНО!'
        })
      });
      const data = await res.json();
      setFeedback(data);
    } catch (e) {
      setFeedback({
        correct: false,
        explanation: '🚨 ФИШИНГ! Подозрительный домен + срочность + вложение.'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Проверьте письмо</h2>

      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <div className="font-bold">From: support@bankk.ru</div>
            <div className="text-sm text-gray-500">To: you@company.com</div>
          </div>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
            СРОЧНО!
          </span>
        </div>
        <div className="border-t pt-4">
          <p>
            Уважаемый клиент! Обновите пароль по{' '}
            <a href="#" className="text-phishing underline">
              этой ссылке
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-gray-500">📎 attachment.exe (1.2 МБ)</p>
        </div>
      </div>

      <button
        onClick={checkEmail}
        className="w-full bg-phishing text-white py-4 px-8 rounded-2xl font-bold text-lg"
      >
        Проверить на фишинг
      </button>

      {feedback && (
        <div
          className={`mt-8 p-6 rounded-2xl border-4 ${
            feedback.correct
              ? 'bg-green-100 border-safe'
              : 'bg-red-100 border-phishing'
          }`}
        >
          <h3
            className={`font-bold text-2xl mb-4 ${
              feedback.correct ? 'text-safe' : 'text-phishing'
            }`}
          >
            {feedback.correct ? '✅ Безопасно' : '🚨 ФИШИНГ!'}
          </h3>
          <p>{feedback.explanation}</p>
        </div>
      )}
    </div>
  );
}
