function Trips() {
  return (
    <main className="trips-page">
      <header className="app-header">
        <h1>Travel Notes</h1>

        <p>
          Пользователь: <span>user@mail.com</span>
        </p>
      </header>

      <section className="trips-section">
        <div className="trips-section__top">
          <h2>Мои путешествия</h2>

          <button type="button">
            Добавить
          </button>
        </div>

        <div className="trips-list">
          <article className="trip-card">
            <h3>Поездка в Японию</h3>
            <p>Посетить Токио, Киото и парк Нара.</p>

            <div className="trip-card__actions">
              <button type="button">Редактировать</button>
              <button type="button">Удалить</button>
            </div>
          </article>

          <article className="trip-card">
            <h3>Путешествие в Италию</h3>
            <p>Рим, Флоренция, Венеция и местная кухня.</p>

            <div className="trip-card__actions">
              <button type="button">Редактировать</button>
              <button type="button">Удалить</button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Trips;