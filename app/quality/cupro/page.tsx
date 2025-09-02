import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';

export default function CuproPage() {
  return (
    <Container>
      <div className="flex gap-8 py-4 md:py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <h1 className="block md:hidden text-2xl sm:text-3xl font-extrabold text-center mb-10 uppercase tracking-wider">CUPRO</h1>
          <p className="text-gray-600">Coming Soon.</p>
        </main>
      </div>
    </Container>
  );
}