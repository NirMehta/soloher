import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "Is it safe to travel alone as a woman?",
    answer:
      "Safety is highly destination- and situation-dependent, so there is no universal yes or no answer. SoloHer gives you a confidence read (High, Moderate, or Low) for your specific destination and time, plus practical guidance to support your judgment — not replace it.",
  },
  {
    question: "What are the best travel safety tips for women?",
    answer:
      "The strongest habits span planning ahead, staying reachable, trusting local guidance, and keeping your instincts sharp. For destination-specific detail, generate a SoloHer guide and check the safety cards tailored to where you're going.",
  },
  {
    question: "Which destinations are safest for solo female travelers?",
    answer:
      "Safety varies more by city and region than by country alone. SoloHer's safety snapshots are built to reflect that nuance, so you get a confidence level and notes grounded in the exact place and time you plan to visit.",
  },
  {
    question: "How does SoloHer help solo female travelers?",
    answer:
      "SoloHer creates AI-powered safety snapshots for any destination, lets you share your plan with someone you trust, and gently nudges you to check in as 'I'm Safe' after your trip — all framed around confidence and connection, not surveillance or restriction.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ — SoloHer</title>
        <meta
          name="description"
          content="Common questions about solo female travel safety and how SoloHer helps women travel with confidence."
        />
        <link rel="canonical" href="https://soloher.lovable.app/faq" />
        <meta property="og:title" content="FAQ — SoloHer" />
        <meta
          property="og:description"
          content="Common questions about solo female travel safety and how SoloHer helps women travel with confidence."
        />
        <meta property="og:url" content="https://soloher.lovable.app/faq" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="max-w-lg mx-auto px-4 py-6 sm:px-6 sm:py-12">
        <section className="mb-6 sm:mb-10 text-center">
          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl mb-3">
            Frequently asked questions
          </h1>
          <p className="mx-auto max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
            Honest answers about solo travel safety and how SoloHer works.
          </p>
        </section>

        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <section
              key={index}
              className="rounded-2xl border border-border/60 bg-card p-4 sm:p-6 shadow-card"
            >
              <h2 className="font-display text-base sm:text-lg text-foreground mb-2">
                {faq.question}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQPage;
