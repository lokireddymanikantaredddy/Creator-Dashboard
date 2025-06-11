export const nextjsLessons = [
  {
    id: 1,
    title: 'Next.js Introduction',
    content: 'Next.js is a React framework that enables features like server-side rendering, static site generation, and API routes with zero configuration.',
    code: `// Basic Next.js page
// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to Next.js" />
      </Head>

      <main>
        <h1>Welcome to Next.js!</h1>
        <p>Get started by editing pages/index.js</p>
      </main>
    </div>
  );
}`,
    quiz: {
      question: 'What is a key feature of Next.js?',
      options: [
        'Server-side rendering',
        'Mobile development',
        'Database management',
        'State management'
      ],
      answer: 'Server-side rendering'
    }
  },
  {
    id: 2,
    title: 'Routing and Navigation',
    content: 'Next.js has a file-system based router built on the concept of pages. Files in the pages directory automatically become routes.',
    code: `// Dynamic routes - pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Post: {id}</h1>;
}

// Navigation using Link component
import Link from 'next/link';

function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/posts/[id]" as="/posts/1">
        First Post
      </Link>
    </nav>
  );
}`,
    quiz: {
      question: 'How are routes created in Next.js?',
      options: [
        'Through files in the pages directory',
        'Using a routes configuration file',
        'Through manual route setup',
        'Using a routing library'
      ],
      answer: 'Through files in the pages directory'
    }
  },
  {
    id: 3,
    title: 'Data Fetching',
    content: 'Next.js provides multiple ways to fetch data for your pages: getStaticProps, getServerSideProps, and client-side fetching.',
    code: `// Static Site Generation (SSG)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: { data },
    revalidate: 60 // ISR - revalidate every 60 seconds
  };
}

// Server-side Rendering (SSR)
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const response = await fetch(\`https://api.example.com/posts/\${params.id}\`);
  const data = await response.json();

  return {
    props: { data }
  };
}

// Client-side Fetching with SWR
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div>Hello {data.name}!</div>;
}`,
    quiz: {
      question: 'Which function is used for Server-side Rendering in Next.js?',
      options: [
        'getServerSideProps',
        'getStaticProps',
        'getInitialProps',
        'getProps'
      ],
      answer: 'getServerSideProps'
    }
  },
  {
    id: 4,
    title: 'API Routes',
    content: 'Next.js allows you to create API endpoints as Node.js serverless functions using the pages/api directory.',
    code: `// pages/api/users.js
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ users: ['John', 'Jane'] });
      break;
    case 'POST':
      // Create new user
      const { name } = req.body;
      res.status(201).json({ message: \`Created user: \${name}\` });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}

// Using API routes in components
async function createUser(name) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name })
  });
  return response.json();
}`,
    quiz: {
      question: 'Where should API route files be placed in Next.js?',
      options: [
        'pages/api directory',
        'api directory',
        'routes directory',
        'server directory'
      ],
      answer: 'pages/api directory'
    }
  },
  {
    id: 5,
    title: 'Deployment and Optimization',
    content: 'Next.js includes built-in performance optimizations and can be easily deployed to various platforms.',
    code: `// Image Optimization
import Image from 'next/image';

function Avatar() {
  return (
    <Image
      src="/avatar.png"
      alt="User Avatar"
      width={64}
      height={64}
      priority
    />
  );
}

// Environment Variables
console.log(process.env.NEXT_PUBLIC_API_URL);

// Custom _app.js for global styles
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  }
};`,
    quiz: {
      question: 'Which component is used for optimized images in Next.js?',
      options: [
        'next/image',
        'next/img',
        'next/picture',
        'next/media'
      ],
      answer: 'next/image'
    }
  }
]; 