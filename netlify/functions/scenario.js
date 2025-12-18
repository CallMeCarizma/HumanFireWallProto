exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  const { emailDomain, hasAttachment, urgency } = JSON.parse(event.body);
  const isPhishing = !emailDomain.includes('company.com') || hasAttachment || urgency === 'СРОЧНО!';
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correct: !isPhishing,
      explanation: isPhishing ? '🚨 ФИШИНГ! Подозрительный домен + срочность + вложение.' : '✅ Безопасно.'
    })
  };
};
