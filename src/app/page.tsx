import Layout from '@/components/Layout';
import NewsList from '@/components/NewsList';
import { getAllNotionPages } from '@/lib/notion';

export default async function Home() {
  const { ids, properties } = await getAllNotionPages();
  
  return (
    <Layout>
      <NewsList properties={properties} />
    </Layout>
  );
}
