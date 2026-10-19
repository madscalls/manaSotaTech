import Header from './components/Header/Header.jsx';
import Privacy from './components/Privacy/Privacy.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function PrivacyPage() {
  return (
    <>
      <Header current="privacy" />
      <main id="top">
        <Privacy />
      </main>
      <Footer />
    </>
  );
}
