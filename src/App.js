import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "./components";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";
import About from "./pages/About.jsx";
import Team from "./components/Team.jsx";
import Contact from "./pages/Contact.jsx";
import Commingsoon from "./components/commingsoon.jsx";
const App = () => {
  return (
    <Router>
      <main className="relative">
        {/* Navigation Bar */}
        <Nav />

        {/* Define Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <section className="xl:padding-l wide:padding-r padding-b">
                  <Hero />
                </section>
                <section className="padding">
                  <PopularProducts />
                </section>
                <section className="padding">
                  <SuperQuality />
                </section>
                <section className="padding-x py-10">
                  <Services />
                </section>
                <section className="padding">
                  <SpecialOffer />
                </section>
                <section className="bg-white padding">
                  <CustomerReviews />
                </section>
                <section className="padding-x sm:py-32 py-16 w-full">
                  <Subscribe />
                  <section className="padding-x sm:py-32 py-16 w-full">
                  <About />
                </section>
                </section>
              </>
            }
          />

          {/* Products Page */}
          <Route
            path="/products"
            element={
              <section className="padding">
                <PopularProducts />
              </section>
            }
            />
            <Route
            path="/about"
            element={
              <section className="padding">
                <About />
              </section>
            }
          />
           <Route
            path="/team"
            element={
              <section className="padding">
                <Team />
              </section>
            }
          />
           <Route
            path="/contact"
            element={
              <section className="padding">
                <Contact />
              </section>
            }
          />
<Route
            path="/commingsoon"
            element={
              <section className="padding">
                <Commingsoon />
              </section>
            }
          />
          {/* Add other routes if needed */}
        </Routes>

        {/* Footer (Always visible) */}
        <section className="bg-black padding-x padding-t pb-8">
          <Footer />
        </section>
      </main>
    </Router>
  );
};

export default App;
