import Hero from '@/components/Hero';
import RoleCards from '@/components/RoleCards';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <RoleCards />
      <Footer />
    </main>
  );
}