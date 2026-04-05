import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

const companies = [
  {
    name: 'Apple',
    url: 'https://www.apple.com/',
    revenue: 'Roughly $390 billion per year (about $0.39 trillion USD)',
  },
  {
    name: 'Alphabet (Google)',
    url: 'https://abc.xyz/',
    revenue: 'Roughly $350 billion per year (about $0.35 trillion USD)',
  },
  {
    name: 'Microsoft',
    url: 'https://www.microsoft.com/',
    revenue: 'Roughly $245 billion per year (about $0.25 trillion USD)',
  },
  {
    name: 'NVIDIA',
    url: 'https://www.nvidia.com/',
    revenue: 'Roughly $130 billion per year (about $0.13 trillion USD)',
  },
];

export default function TechCompanies() {
  return (
    <div style={{ backgroundColor: 'green', minHeight: '100vh', padding: '1rem' }}>
      <Layout>
        <Head>
          <title>Top tech companies — {siteTitle}</title>
        </Head>

        <section className={utilStyles.headingMd}>
          <p>
            <Link href="/" style={{ fontSize: 'x-large' }}>
              ← Back to home
            </Link>
          </p>

          <h1 className={utilStyles.headingLg}>Major computer &amp; platform companies</h1>
          <p className={utilStyles.lightText}>
            Each name links to the company&apos;s site. Revenue is approximate, recent full-year scale,
            shown in billions with a trillion-range equivalent (not market cap).
          </p>

          <ul className={utilStyles.list} style={{ marginTop: '1.5rem' }}>
            {companies.map(({ name, url, revenue }) => (
              <li className={utilStyles.listItem} key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'x-large' }}>
                  {name}
                </a>
                <p style={{ margin: '0.35rem 0 1rem' }}>{revenue}</p>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </div>
  );
}
