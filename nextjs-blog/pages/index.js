// pages/index.js
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts-json'; // your JSON-based data
import Link from 'next/link';

export default function Home({ allPostsData }) {
  return (
    <div style={{ backgroundColor: 'green', minHeight: '100vh', padding: '1rem' }}>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        {/* Intro Section */}
        <section className={utilStyles.headingMd}>
          <p>Здравствуйте. Меня зовут Сундар Пичаи. Я веб-разработчик из Санта-Розы, Калифорния.</p>
          <p>
            (Пичаи перешёл в Google в 2004 году, где он возглавлял направления менеджмента и
            инновационной деятельности линеек клиент-ориентированных продуктов Google, в том числе Google Chrome
            и Chrome OS, а также в значительной степени отвечал за Google Drive.{' '}
            <a href="https://nextjs.org/learn" style={{ fontSize: 'x-large' }}>
              our Next.js tutorial
            </a>.)
          </p>
        </section>

        {/* Blog Section */}
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, title, date }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`} style={{ fontSize: 'x-large' }}>
                  {title}
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  {date} {/* display division directly instead of Date component */}
                </small>
              </li>
            ))}
          </ul>
        </section>

        {/* Extra Links Section */}
        <section className={utilStyles.headingMd}>
          <h2>Absolute URLs</h2>
          <p>
            <a
              href="https://www.w3.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 'x-large' }}
            >
              W3C
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 'x-large' }}
            >
              Google
            </a>
          </p>

          <h2>Relative URLs</h2>
          <p>
            <a href="https://react.dev/learn" style={{ fontSize: 'x-large' }}>
              react
            </a>
          </p>
          <p>
            <a
              href="https://ru.wikipedia.org/wiki/%D0%9F%D0%B8%D1%87%D0%B0%D0%B8,_%D0%A1%D1%83%D0%BD%D0%B4%D0%B0%D1%80"
              style={{ fontSize: 'x-large' }}
            >
              s. pichai
            </a>
          </p>
        </section>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
