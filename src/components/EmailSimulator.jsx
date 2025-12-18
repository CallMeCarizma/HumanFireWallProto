import { useState } from 'react';

const EMAILS = [
  {
    id: 1,
    from: 'support@bankk.ru',
    to: 'you@company.com',
    subject: 'СРОЧНО! Обновите пароль',
    body: 'Уважаемый клиент! Ваш аккаунт заблокирован. Срочно перейдите по ссылке и введите данные карты.',
    attachment: 'attachment.exe',
    isPhishing: true,
    explanation: 'Подозрительный домен, срочность, запрос данных + .exe вложение.'
  },
  {
    id: 2,
    from: 'no-reply@company.com',
    to: 'you@company.com',
    subject: 'График корпоративных мероприятий',
    body: 'Коллеги, во вложении — план мероприятий на следующий месяц. Если есть вопросы, пишите HR.',
    attachment: 'events.pdf',
    isPhishing: false,
    explanation: 'Легитимный корпоративный домен, нет срочности, адекватное содержание, PDF.'
  },
  {
    id: 3,
    from: 'security@pay-service.com',
    to: 'you@company.com',
    subject: 'Подтверждение входа',
    body: 'Мы заметили вход из нового устройства. Если это были не вы — перейдите по ссылке для отмены операции.',
    attachment: null,
    isPhishing: true,
    explanation: 'Неясный домен, ссылка на «отмену» без деталей, классический фишинг-антифрод.'
  },
  {
    id: 4,
    from: 'it-support@company.com',
    to: 'you@company.com',
    subject: 'Плановые работы на сервере',
    body: 'Сегодня с 19:00 до 21:00 возможны кратковременные перебои в работе почты. Никаких действий от вас не требуется.',
    attachment: null,
    isPhishing: false,
    explanation: 'Официальный домен, информирование без ссылок и запросов данных.'
  }
];

export default function EmailSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const currentEmail = EMAILS[currentIndex];

  const handleAnswer = (userThinksPhishing) => {
    const isCorrect = userThinksPhishing === currentEmail.isPhishing;
    setFeedback({
      correct: isCorrect,
      explanation: currentEmail.explanation,
      userAnswer: userThinksPhishing
    });
  };

  const nextEmail = () => {
    setFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % EMAILS.length);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">Проверьте письма</h2>
      <p className="text-center text-gray-600 mb-8">
        Определите, какое письмо фишинговое, а какое — обычное рабочее.
      </p>

      {/* Письмо */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <div className="font-bold">From: {currentEmail.from}</div>
            <div className="text-sm text-gray-500">To: {currentEmail.to}</div>
          </div>
          {currentEmail.subject.toLowerCase().includes('срочно') && (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              СРОЧНО
            </span>
          )}
        </div>
        <div className="border-t pt-4">
          <p className="font-semibold mb-2">Тема: {currentEmail.subject}</p>
          <p>{currentEmail.body}</p>
          {currentEmail.attachment && (
            <p className="mt-2 text-sm text-gray-500">
              📎 {currentEmail.attachment}
            </p>
          )}
        </div>
      </div>

      {/* Кнопки выбора */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <button
          onClick={() => handleAnswer(true)}
          className="w-full bg-phishing text-white py-3 px-4 rounded-2xl font-semibold hover:bg-red-600"
        >
          Это фишинг
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-2xl font-semibold hover:bg-green-600"
        >
          Обычное письмо
        </button>
      </div>

      {/* Обратная связь */}
      {feedback && (
        <div
          className={`mt-4 p-6 rounded-2xl border-4 ${
            feedback.correct
              ? 'bg-green-100 border-safe'
              : 'bg-red-100 border-phishing'
          }`}
        >
          <h3
            className={`font-bold text-2xl mb-2 ${
              feedback.correct ? 'text-safe' : 'text-phishing'
            }`}
          >
            {feedback.correct ? '✅ Верно!' : '❌ Неверно'}
          </h3>
          <p className="mb-2">{feedback.explanation}</p>
          <p className="text-sm text-gray-600">
            Ваш ответ: {feedback.userAnswer ? '«Фишинг»' : '«Обычное письмо»'}.
          </p>
        </div>
      )}

      {/* Следующее письмо */}
      <div className="mt-6 text-center">
        <button
          onClick={nextEmail}
          className="inline-flex items-center px-6 py-2 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium"
        >
          Следующее письмо ({currentIndex + 1}/{EMAILS.length})
        </button>
      </div>
    </div>
  );
}
