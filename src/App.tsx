import Hero from "./components/Hero";
import Products from "./components/Products";
import Mission from "./components/Mission";
import GetInTouch from "./components/GetInTouch";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Products />
      <Mission />
      <GetInTouch />
      <Footer />
    </div>
  );
}

export default App;
