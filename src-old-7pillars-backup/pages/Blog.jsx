import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

function Blog() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Header />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-textMuted mb-12">
            Coming soon...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
