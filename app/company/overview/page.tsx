import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';

export default function OverviewPage() {
  return (
    <Container>
      <div className="flex gap-8 py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <p className="text-gray-600">Comming Soon.</p>
        </main>
      </div>
    </Container>
  );
}
