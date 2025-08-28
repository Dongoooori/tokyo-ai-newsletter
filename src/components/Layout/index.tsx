import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="p-4">
      <Header />
      <main className="pt-60">
        <CategoryList />
        <div className="flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;