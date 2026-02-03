import styles from "./style.module.css";

export default function Blog() {
  return (
    <>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <section className={styles.firstsection}>
          <h1>Blog</h1>
          <div>
            <h2>Todas as postagens</h2>
            <button className={styles.filterbutton}>...</button>
          </div>
        </section>
        <section className={styles.cardsection}>
          <div className={styles.upcards}>
            <div className={styles.card}>
              <div className={styles.cardpic}>
                <h3>Mindset</h3>
              </div>
              <div className={styles.card_desc}>
                <h2 className={styles.date}>12 de Dezembro, 2025</h2>
                <h1>Titulo</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorum tempore aliquam iste, aperiam asperiores quibusdam praesentium voluptatem ipsa minus molestiae impedit explicabo rerum consequatur esse soluta adipisci. Error, sit!</p>
                <h2 className={styles.articlebutton}>Ler artigo →</h2>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardpic}>
                <h3>Crescimento</h3>
              </div>
              <div className={styles.card_desc}>
                <h2 className={styles.date}>23 de Novembro, 2025</h2>
                <h1>Titulo</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorum tempore aliquam iste, aperiam asperiores quibusdam praesentium voluptatem ipsa minus molestiae impedit explicabo rerum consequatur esse soluta adipisci. Error, sit!</p>
                <h2 className={styles.articlebutton}>Ler artigo →</h2>
              </div>
            </div>
          </div>
          <div className={styles.downcards}>
            <div className={styles.card}>
              <div className={styles.cardpic}>
                <h3>Relacionamento</h3>
              </div>
              <div className={styles.card_desc}>
                <h2 className={styles.date}>11 de maio, 2025</h2>
                <h1>Titulo</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorum tempore aliquam iste, aperiam asperiores quibusdam praesentium voluptatem ipsa minus molestiae impedit explicabo rerum consequatur esse soluta adipisci. Error, sit!</p>
                <h2 className={styles.articlebutton}>Ler artigo →</h2>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardpic}>
                <h3>Propósito</h3>
              </div>
              <div className={styles.card_desc}>
                <h2 className={styles.date}>21 de janeiro, 2025</h2>
                <h1>Titulo</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorum tempore aliquam iste, aperiam asperiores quibusdam praesentium voluptatem ipsa minus molestiae impedit explicabo rerum consequatur esse soluta adipisci. Error, sit!</p>
                <h2 className={styles.articlebutton}>Ler artigo →</h2>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}></footer>
    </>
  ) 
}