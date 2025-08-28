import Layout from '@/components/Layout';
import NewsList from '@/components/NewsList';
import { getNotionPageContentByCategory } from '@/lib/notion';

export default async function CategoryPage({ 
  params 
}: { 
  params: { category: string } 
}) {
  const categoryData = await getNotionPageContentByCategory(params.category);
  console.log(categoryData)
  
  return (
    <Layout>
      <NewsList properties={categoryData} />
    </Layout>
  );
}