import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBadges from './components/TrustBadges'
import About from './components/About'
import Trainer from './components/Trainer'
import Courses from './components/Courses'
import BridalMakeup from './components/BridalMakeup'
import CourseIncludes from './components/CourseIncludes'
import WhyChooseUs from './components/WhyChooseUs'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import FloatingButtons from './components/FloatingButtons'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <About />
        <Trainer />
        <Courses />
        <BridalMakeup />
        <CourseIncludes />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
