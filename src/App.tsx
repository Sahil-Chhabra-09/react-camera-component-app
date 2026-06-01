import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveDemo from './components/LiveDemo';
import PropsTable from './components/PropsTable';
import ApiReference from './components/ApiReference';
import CodeExamples from './components/CodeExamples';
import BrowserCompat from './components/BrowserCompat';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveDemo />
        <PropsTable />
        <ApiReference />
        <CodeExamples />
        <BrowserCompat />
      </main>
      <Footer />
    </>
  );
}
