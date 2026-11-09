import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

import { Container } from "@/components/site/Container";
import { Notice } from "@/components/site/Notice";
import { Reveal } from "@/components/site/Reveal";
import { Rule, AccentRule } from "@/components/site/Rule";
import { TallyEmbed } from "@/components/site/TallyEmbed";
import { SEO, applySeo } from "@/lib/seo";

type Lang = "en" | "ne";

/**
 * The two Tally forms. `dynamicHeight=1` lets Tally resize each iframe to fit.
 * The Nepali form is a separate Tally form, not a translation layer.
 */
const FORMS: Record<Lang, { src: string; title: string }> = {
  en: {
    src: "https://tally.so/embed/jebGBx?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    title: "Student Experiences and Educational Equity",
  },
  ne: {
    src: "https://tally.so/embed/Eq5oXL?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    title: "विद्यार्थीको अनुभव र शैक्षिक समानता",
  },
};

/** Everything the page says around the form, in each language. */
const COPY: Record<
  Lang,
  { eyebrow: string; intro: string; noticeLabel: string; notice: string }
> = {
  en: {
    eyebrow: "Student survey",
    intro:
      "This form collects students' experiences and perspectives on how they are treated and assisted in school, and on possible differences associated with skin colour, ethnicity or geographical background.",
    noticeLabel: "Confidentiality notice",
    notice:
      "This form is confidential, not anonymous. Respondents may provide their real name or use an alias. Responses will be handled confidentially and will not be publicly attributed to individual respondents without their permission.",
  },
  ne: {
    eyebrow: "विद्यार्थी सर्वेक्षण",
    intro:
      "यो फारमले विद्यार्थीहरूलाई विद्यालयमा कसरी व्यवहार गरिन्छ र सहयोग गरिन्छ, साथै छालाको रङ, जातीयता वा भौगोलिक पृष्ठभूमिसँग सम्बन्धित सम्भावित भिन्नताहरूबारे उनीहरूका अनुभव र विचारहरू सङ्कलन गर्छ।",
    noticeLabel: "गोपनीयता सूचना",
    notice:
      "यो फारम गोप्य हो, तर अज्ञात (अनामिक) होइन। उत्तरदाताले आफ्नो वास्तविक नाम दिन सक्नुहुन्छ वा उपनाम प्रयोग गर्न सक्नुहुन्छ। उत्तरहरू गोप्य रूपमा सम्हालिनेछन् र उत्तरदाताको अनुमति बिना व्यक्तिगत रूपमा सार्वजनिक रूपमा उल्लेख गरिने छैन।",
  },
};

const CHOICES: { lang: Lang; name: string; hint: string; hintLang: Lang }[] = [
  { lang: "en", name: "English", hint: "Take the survey in English", hintLang: "en" },
  { lang: "ne", name: "नेपाली", hint: "सर्वेक्षण नेपालीमा भर्नुहोस्", hintLang: "ne" },
];

/**
 * An unlisted page: reachable by its address, linked from nowhere on the site,
 * left out of the sitemap, and marked `noindex, nofollow` (in the page head and
 * in an `X-Robots-Tag` header). It is not access-controlled; anyone with the
 * link can open it.
 *
 * It opens on a language choice. The choice lives in the address
 * (`/forms?lang=ne`), so it can be shared and the browser's Back button returns
 * to the choice. Neither form is requested until one is chosen.
 *
 * The forms are Tally's, embedded unchanged; see `components/site/TallyEmbed.tsx`.
 */
export function FormsPage() {
  useEffect(() => applySeo(SEO.forms), []);

  const [params] = useSearchParams();
  const raw = params.get("lang");
  const lang: Lang | null = raw === "en" || raw === "ne" ? raw : null;

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink" lang={lang ?? "en"}>
                {COPY[lang ?? "en"].eyebrow}
              </span>
            </div>
            <h1
              tabIndex={-1}
              lang={lang ?? "en"}
              className="type-title measure mt-5 text-ink outline-none"
            >
              {FORMS[lang ?? "en"].title}
            </h1>
            {lang === null && (
              <p lang="ne" className="type-heading measure mt-3 text-ink-muted">
                {FORMS.ne.title}
              </p>
            )}
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10 md:mt-12" />

        {lang === null ? (
          <Reveal className="py-10 md:py-14" delayMs={60}>
            <section aria-labelledby="choose-language">
              <h2 id="choose-language" className="type-heading measure text-ink">
                Which language would you like to use for this survey?
              </h2>
              <p lang="ne" className="type-body-lg measure mt-2 text-ink-muted">
                तपाईं यो सर्वेक्षणका लागि कुन भाषा प्रयोग गर्न चाहनुहुन्छ?
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-6">
                {CHOICES.map((c) => (
                  <li key={c.lang}>
                    <Link
                      to={`?lang=${c.lang}`}
                      lang={c.lang}
                      hrefLang={c.lang}
                      className="group flex h-full min-h-36 flex-col justify-between rounded-md border border-rule-soft bg-surface/70 p-6 transition-[border-color,background-color,transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:border-bronze hover:bg-bronze-wash hover:shadow-[0_10px_30px_-18px_rgb(19_26_44/0.45)] focus-visible:-translate-y-0.5 md:p-8"
                    >
                      <span className="type-heading text-ink">{c.name}</span>
                      <span className="mt-6 flex items-center justify-between gap-4">
                        <span lang={c.hintLang} className="type-body text-ink-muted">
                          {c.hint}
                        </span>
                        <span
                          aria-hidden="true"
                          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-bronze/60 text-bronze-ink transition-[transform,background-color,color] duration-300 group-hover:translate-x-1 group-hover:bg-bronze group-hover:text-canvas"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ) : (
          <div lang={lang}>
            <Reveal className="pt-8 md:pt-10" delayMs={60}>
              <p className="type-body-lg measure text-ink-muted">{COPY[lang].intro}</p>

              {/* Switch language without going back to the choice page. */}
              <nav
                aria-label="Language / भाषा"
                className="mt-6 inline-flex rounded-full border border-rule-soft bg-surface/70 p-1"
              >
                {CHOICES.map((c) => {
                  const active = c.lang === lang;
                  return (
                    <Link
                      key={c.lang}
                      to={`?lang=${c.lang}`}
                      lang={c.lang}
                      hrefLang={c.lang}
                      replace
                      aria-current={active ? "true" : undefined}
                      className={
                        "type-label rounded-full px-5 py-2 transition-colors duration-300 " +
                        (active
                          ? "bg-ink text-canvas"
                          : "text-bronze-ink hover:bg-bronze-wash")
                      }
                    >
                      {c.name}
                    </Link>
                  );
                })}
              </nav>
            </Reveal>

            <Reveal className="py-8 md:py-10" delayMs={90}>
              <Notice tone="info" label={COPY[lang].noticeLabel} className="max-w-[46rem]">
                {COPY[lang].notice}
              </Notice>
            </Reveal>

            <Reveal className="pb-14 md:pb-20" delayMs={120}>
              {/* `key` gives each language its own iframe; Tally's script is shared. */}
              <TallyEmbed
                key={lang}
                src={FORMS[lang].src}
                title={FORMS[lang].title}
                eager
              />
            </Reveal>
          </div>
        )}
      </div>
    </Container>
  );
}
