import Hero from "./components/Hero";
import Products from "./components/Products";
import Mission from "./components/Mission";
import GetInTouch from "./components/GetInTouch";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Products />
      <Mission />
      <Reviews />
      <GetInTouch />
      <Footer />
    </div>
  );
}

export default App;
