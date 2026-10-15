import Header from './components/Header/Header.jsx';
import Faq from './components/Faq/Faq.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function FaqPage() {
  return (
    <>
      <Header current="faq" />
      <main id="top">
        <Faq />
      </main>
      <Footer />
    </>
  );
}
