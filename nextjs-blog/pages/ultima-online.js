import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/ultima-online.module.css';

const pageTitle = 'Module 11 – Game of the Week: Ultima IV / Ultima Online';

export default function UltimaOnline() {
  return (
    <div className={styles.page}>
      <Layout>
        <Head>
          <title>{pageTitle} — {siteTitle}</title>
        </Head>

        <Link href="/" className={styles.homeButton}>
          Return to home
        </Link>

        <h1>{pageTitle}</h1>

        <section className={styles.section}>
          <h2>Play / Try the Games</h2>
          <ul>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Ultima_IV:_Quest_of_the_Avatar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ultima IV: Quest of the Avatar – overview and platform list
              </a>{' '}
              (check GOG.com or other legal stores for downloads)
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Ultima_Online" target="_blank" rel="noopener noreferrer">
                Ultima Online – overview and official links
              </a>{' '}
              (links out to current official servers and clients)
            </li>
            <li>
              <a href="https://www.uoguide.com/Getting_Started" target="_blank" rel="noopener noreferrer">
                Ultima Online – Getting Started guide
              </a>{' '}
              (how to create an account, install, and play)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Graphic Design / Art Resources</h2>
          <ul>
            <li>
              <a href="http://andrea.net/uo/general/art/" target="_blank" rel="noopener noreferrer">
                Andrea’s Ultima Online Art Page – analysis of UO art style
              </a>
            </li>
            <li>
              <a
                href="https://www.raphkoster.com/2017/09/28/ultima-onlines-influence/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ultima Online’s Influence – world scale, tiles, and visual design notes
              </a>
            </li>
            <li>
              <a
                href="https://www.reddit.com/r/ultimaonline/comments/5rbntc/what_do_you_think_about_ultima_online_2d_graphics/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discussion: Ultima Online 2D Graphics
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>History / Background Reading</h2>
          <ul>
            <li>
              <a href="https://www.uoguide.com/History_of_Ultima_Online" target="_blank" rel="noopener noreferrer">
                History of Ultima Online – UOGuide timeline
              </a>
            </li>
            <li>
              <a
                href="https://massivelyop.com/2022/09/03/the-game-archaeologist-how-ultima-online-got-made/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Game Archaeologist: How Ultima Online Got Made
              </a>
            </li>
            <li>
              <a
                href="https://www.raphkoster.com/2022/09/24/ultima-onlines-25th-anniversary/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ultima Online’s 25th Anniversary – retrospective by Raph Koster
              </a>
            </li>
            <li>
              <a
                href="https://extralives.wordpress.com/2013/03/05/from-the-pages-of-the-past-games-of-yesteryear-ultima-iv-quest-of-the-avatar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                From the pages of the past: Ultima IV – Quest of the Avatar
              </a>
            </li>
          </ul>
        </section>
      </Layout>
    </div>
  );
}
