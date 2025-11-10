import {
  Hero,
  BeliefStatement,
  CaseReview,
  CaseTypes,
  HowItWorks,
  ProvenResults,
  Testimonials,
  FAQ,
  WhyInjuro,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <BeliefStatement />
      <ProvenResults />
      <CaseTypes />
      <WhyInjuro />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CaseReview />
    </main>
  );
}
