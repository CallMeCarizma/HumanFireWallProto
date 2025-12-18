// src/components/EmailSimulator.jsx
import { useState, useMemo } from 'react';

const EMAIL_TEMPLATES = [
  { id: 1, from: 'support@bankk.ru', to: 'you@company.com',
    subject: 'СРОЧНО! Обновите пароль',
    body: 'Уважаемый клиент! Ваш аккаунт заблокирован. Срочно перейдите по ссылке и введите данные карты для разблокировки.',
    attachment: 'secure_update.exe',
    isPhishing: true,
    explanation: 'Подозрительный домен, срочность, запрос данных карты и .exe вложение.'
  },
  { id: 2, from: 'hr@company.com', to: 'you@company.com',
    subject: 'Обновление политики отпуска на 2025 год',
    body: 'Коллеги, во вложении — обновлённая политика отпусков. Пожалуйста, ознакомьтесь в удобное время.',
    attachment: 'vacation_policy_2025.pdf',
    isPhishing: false,
    explanation: 'Официальный домен компании, отсутствие срочности и запросов чувствительных данных, PDF-документ.'
  },
  { id: 3, from: 'security@pay-service.com', to: 'you@company.com',
    subject: 'Подтверждение подозрительной транзакции',
    body: 'Мы заметили подозрительную транзакцию. Если это были не вы, немедленно перейдите по ссылке и введите данные карты.',
    attachment: null,
    isPhishing: true,
    explanation: 'Неясный домен, давление срочностью, запрос введения данных карты через ссылку.'
  },
  { id: 4, from: 'it-support@company.com', to: 'you@company.com',
    subject: 'Плановые работы на сервере',
    body: 'Сегодня с 19:00 до 21:00 возможны кратковременные перебои в работе почты. Никаких действий от вас не требуется.',
    attachment: null,
    isPhishing: false,
    explanation: 'Официальный домен ИТ, информирование без ссылок и запросов учётных данных.'
  },
  { id: 5, from: 'promo@onlineshop-win.com', to: 'you@company.com',
    subject: 'Вы выиграли подарок за участие в опросе!',
    body: 'Поздравляем! Пройдите короткий опрос и введите данные карты для получения кэшбэка.',
    attachment: null,
    isPhishing: true,
    explanation: 'Незнакомый домен, обещание приза, запрос данных карты — типичный baiting/фишинг.'
  },
  { id: 6, from: 'kollega@company.com', to: 'you@company.com',
    subject: 'Презентация для завтрашней встречи',
    body: 'Привет! Во вложении черновая презентация, посмотри, пожалуйста, когда будет время.',
    attachment: 'presentation_draft.pptx',
    isPhishing: false,
    explanation: 'Внутренний адрес, рабочий контекст, нормальный формат файла, нет ссылок и срочности.'
  },
  { id: 7, from: 'admin@mail-support.com', to: 'you@company.com',
    subject: 'Превышен лимит почтового ящика',
    body: 'Ваш почтовый ящик почти переполнен. Чтобы не потерять письма, войдите в систему по ссылке и подтвердите логин и пароль.',
    attachment: null,
    isPhishing: true,
    explanation: 'Домен не совпадает с корпоративным, есть ссылка на «вход» и запрос логина/пароля.'
  },
  { id: 8, from: 'no-reply@calendar-service.com', to: 'you@company.com',
    subject: 'Напоминание о встрече',
    body: 'Напоминаем о встрече сегодня в 15:00. Это автоматическое уведомление, не отвечайте на него.',
    attachment: null,
    isPhishing: false,
    explanation: 'Типичное сервисное уведомление, нет ссылок для ввода данных, стандартный текст.'
  },
  { id: 9, from: 'ceo-company@outlook.com', to: 'you@company.com',
    subject: 'Срочно перевести деньги партнёру',
    body: 'Срочно переведи 300 000 руб. на указанный счёт. Потом объясню, не отвечай никому об этом.',
    attachment: null,
    isPhishing: true,
    explanation: 'Подмена личности руководителя, срочность, запрос денежного перевода, внешний домен.'
  },
  { id: 10, from: 'buhgalter@company.com', to: 'you@company.com',
    subject: 'Сверка по командировочным',
    body: 'Коллеги, пришлите, пожалуйста, чеки за последнюю командировку до пятницы. Файлы можно приложить ответным письмом.',
    attachment: null,
    isPhishing: false,
    explanation: 'Внутренний адрес, нормальный рабочий запрос, нет ссылок и требований вводить конфиденциальные данные на стороннем сайте.'
  }
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function EmailSimulator() {
  const [sequence, setSequence] = useState(() => shuffleArray(EMAIL_TEMPLATES));
  const [currentIndex, setCurrentIndex] = useState(0);

  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  const [results, setResults] = useState([]); // { emailId, result, userAnswer }

  const currentEmail = sequence[currentIndex];
  const totalPhishingInPool = useMemo(
    () => EMAIL_TEMPLATES.filter((e) => e.isPhishing).length,
    []
  );

  const applyAnswer = (type, userThinksPhishing = null) => {
    const exists = results.find((r) => r.emailId === currentEmail.id);
    if (exists) return;
    setResults((prev) => [
      ...prev,
      { emailId: currentEmail.id, result: type, userAnswer: userThinksPhishing }
    ]);
  };

  const handleAnswer = (userThinksPhishing) => {
    if (answered) return;
    const isCorrect = userThinksPhishing === currentEmail.isPhishing;
    setFeedback({
      correct: isCorrect,
      explanation: currentEmail.explanation,
      userAnswer: userThinksPhishing,
      skipped: false
    });
    setAnswered(true);
    applyAnswer(isCorrect ? 'correct' : 'wrong', userThinksPhishing);
  };

  const handleSkip = () => {
    if (answered) return;
    setFeedback({
      correct: false,
      explanation: 'Письмо пропущено. В реальной жизни пропуск может быть как безопасным, так и рискованным — важно уметь принимать решение.',
      userAnswer: null,
      skipped: true
    });
    setAnswered(true);
    applyAnswer('skipped', null);
  };

  const nextEmail = () => {
    setFeedback(null);
    setAnswered(false);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= sequence.length) {
        setSequence(shuffleArray(EMAIL_TEMPLATES));
        setResults([]);
        return 0;
      }
      return next;
    });
  };

  const prevEmail = () => {
    setFeedback(null);
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
    const emailForIndex = sequence[currentIndex === 0 ? 0 : currentIndex - 1];
    const exists = results.find((r) => r.emailId === emailForIndex.id);
    setAnswered(!!exists);
  };

  const correctCount = results.filter((r) => r.result === 'correct').length;
  const wrongCount = results.filter((r) => r.result === 'wrong').length;
  const skippedCount = results.filter((r) => r.result === 'skipped').length;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">Почтовый тренажёр</h2>
      <p className="text-center text-gray-600 mb-8">
        В цикле 10 писем в случайном порядке. Отвечайте, пропускайте, анализируйте итоги.
      </p>

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
            <p className="mt-2 text-sm text-gray-500">📎 {currentEmail.attachment}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <button
          onClick={() => handleAnswer(true)}
          disabled={answered}
          className={`w-full py-3 px-4 rounded-2xl font-semibold ${
            answered ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-phishing text-white hover:bg-red-600'
          }`}
        >
          Это фишинг
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={answered}
          className={`w-full py-3 px-4 rounded-2xl font-semibold ${
            answered ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Обычное письмо
        </button>
        <button
          onClick={handleSkip}
          disabled={answered}
          className={`w-full py-3 px-4 rounded-2xl font-semibold ${
            answered ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Пропустить
        </button>
      </div>

      {feedback && (
        <div
          className={`mt-4 p-6 rounded-2xl border-4 ${
            feedback.skipped
              ? 'bg-yellow-50 border-yellow-400'
              : feedback.correct
              ? 'bg-green-100 border-safe'
              : 'bg-red-100 border-phishing'
          }`}
        >
          <h3
            className={`font-bold text-2xl mb-2 ${
              feedback.skipped
                ? 'text-yellow-700'
                : feedback.correct
                ? 'text-safe'
                : 'text-phishing'
            }`}
          >
            {feedback.skipped
              ? '⏭ Письмо пропущено'
              : feedback.correct
              ? '✅ Верно!'
              : '❌ Неверно'}
          </h3>
          <p className="mb-2">{feedback.explanation}</p>
          {!feedback.skipped && (
            <p className="text-sm text-gray-600">
              Ваш ответ: {feedback.userAnswer ? '«Фишинг»' : '«Обычное письмо»'}.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={prevEmail}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-2xl border text-sm font-medium ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          ← Назад
        </button>

        <span className="text-sm text-gray-500">
          Письмо {currentIndex + 1} из {sequence.length}
        </span>

        <button
          onClick={nextEmail}
          className="px-4 py-2 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium"
        >
          Следующее →
        </button>
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow p-6 text-sm text-gray-700">
        <h4 className="font-semibold mb-2">Итоги текущего цикла (10 писем)</h4>
        <p>Всего писем в цикле: {sequence.length}</p>
        <p>Отвечено (включая пропуски): {results.length}</p>
        <p>Правильных ответов: {correctCount}</p>
        <p>Неправильных ответов: {wrongCount}</p>
        <p>Пропущено писем: {skippedCount}</p>
        <p className="mt-1">
          Правильно найдено фишинговых писем: {
            results.filter(
              (r) =>
                r.result === 'correct' &&
                EMAIL_TEMPLATES.find((e) => e.id === r.emailId)?.isPhishing
            ).length
          } из {totalPhishingInPool}
        </p>
      </div>
    </div>
  );
}
