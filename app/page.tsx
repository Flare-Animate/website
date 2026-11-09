import AppScreenshot from "@/components/AppScreenshot";
import Contribute from "@/components/Contribute";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Install from "@/components/Install";
import ProjectStatus from "@/components/ProjectStatus";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppScreenshot />
        <div className="divider" />
        <Features />
        <div className="divider" />
        <ProjectStatus />
        <div className="divider" />
        <Install />
        <div className="divider" />
        <Contribute />
      </main>
        <Footer />
    </>
  );
}
