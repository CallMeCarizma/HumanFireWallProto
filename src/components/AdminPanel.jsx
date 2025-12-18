export default function AdminPanel() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold">📊 Админ-панель</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg"><h3 className="font-semibold mb-4">Сессий</h3><p className="text-4xl font-bold text-phishing">247</p></div>
        <div className="bg-white p-8 rounded-2xl shadow-lg"><h3 className="font-semibold mb-4">Точность</h3><p className="text-4xl font-bold text-safe">78%</p></div>
        <div className="bg-white p-8 rounded-2xl shadow-lg"><h3 className="font-semibold mb-4">Пользователей</h3><p className="text-4xl font-bold">42</p></div>
      </div>
    </div>
  );
}
