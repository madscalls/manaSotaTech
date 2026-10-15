import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Belong from './components/Belong/Belong.jsx';
import Events from './components/Events/Events.jsx';
import Connect from './components/Connect/Connect.jsx';
import Conduct from './components/Conduct/Conduct.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Belong />
        <Events />
        <Connect />
        <Conduct />
      </main>
      <Footer />
    </>
  );
}
