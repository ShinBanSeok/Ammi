import Container from '@/components/Container';
import SubPageSidebar from '@/components/SubPageSidebar';

export default function OverviewPage() {
  return (
    <Container>
      <div className="flex gap-8 py-20">
        <SubPageSidebar />
        <main className="flex-1">
          <h1 className="mb-6 text-3xl font-semibold uppercase tracking-wide">Company · Overview</h1>
          <p className="text-gray-600">Write your company overview here.</p>
        </main>
      </div>
    </Container>
  );
}