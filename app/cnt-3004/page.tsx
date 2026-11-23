import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageTitle, Tags } from "@/components/site/Prose";
import { assignments, courseReflection } from "@/content/cnt-3004";

export const dynamic = "force-static";

// Direct-link class deliverable. Do not add it to global navigation, retrieval,
// llms.txt, or the sitemap. No robots.txt block: crawlers must see this noindex.
export const metadata: Metadata = {
  title: "CNT 3004 · Course Portfolio",
  description: "Adan Rojas’s reflections on Computer Network Concepts coursework.",
  alternates: { canonical: "/cnt-3004" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const reflectionFields = [
  ["experience", "My experience"],
  ["concepts", "Skills & concepts"],
  ["challenge", "The challenge"],
  ["takeaway", "My takeaway"],
] as const;

const actionClass = "inline-flex min-h-11 items-center justify-center rounded-(--radius) border border-line bg-surface px-3 py-2 text-sm font-medium text-ink no-underline transition-colors hover:bg-raised";

export default function CoursePortfolioPage() {
  return (
    <Page>
      <PageTitle
        eyebrow="Adan Rojas · University of Central Florida"
        title="CNT 3004"
        lede="Computer Network Concepts"
      />

      <p className="-mt-4 mb-8 max-w-(--measure) leading-relaxed">
        From tracing a request to understanding how TCP recovers from loss,
        this course connected networking theory with the traffic, tools, and
        security decisions behind everyday systems. These reflections bring
        together what I practiced and what I take forward.
      </p>

      <nav aria-label="On this page" className="mb-12 border-y border-line py-4">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">On this page</p>
        <ul className="flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
          <li><a className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href="#assignments">Assignments</a></li>
          <li><a className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href="#course-reflection">Quizzes & discussions</a></li>
          <li><a className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href="#portfolio">Already in my portfolio</a></li>
        </ul>
      </nav>

      <section id="assignments" aria-labelledby="assignments-title" className="scroll-mt-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="assignments-title" className="text-xl font-semibold">Assignment reflections</h2>
          <span className="font-mono text-xs text-muted">Homework 1–6</span>
        </div>
        <nav aria-label="Jump to an assignment" className="mb-8">
          <ul className="flex list-none flex-wrap gap-2 p-0">
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <a href={`#${assignment.id}`} className={actionClass}>{assignment.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {assignments.map((assignment) => (
            <article key={assignment.id} id={assignment.id} aria-labelledby={`${assignment.id}-title`} className="scroll-mt-8 border-t border-line pt-7">
              <header className="mb-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-accent">{assignment.label}</p>
                <h3 id={`${assignment.id}-title`} className="mb-4 text-lg font-semibold">{assignment.title}</h3>
                <Tags items={assignment.topics} />
              </header>
              <div className="space-y-8">
                {assignment.parts.map((part, index) => (
                  <div key={part.title ?? index}>
                    {part.title && <h4 className="mb-4 font-semibold">{part.title}</h4>}
                    <dl className="space-y-5">
                      {reflectionFields.map(([field, label]) => (
                        <div key={field} className={field === "takeaway" ? "rounded-(--radius) border-l-2 border-accent bg-raised px-4 py-3" : ""}>
                          <dt className="mb-1 font-mono text-xs text-muted">{label}</dt>
                          <dd className="m-0 max-w-(--measure) leading-relaxed">{part[field]}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="course-reflection" aria-labelledby="course-reflection-title" className="mt-12 scroll-mt-8 border-t border-line pt-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">Across the semester</p>
        <h2 id="course-reflection-title" className="mb-5 text-xl font-semibold">Quizzes & discussions</h2>
        <p className="max-w-(--measure) leading-relaxed">{courseReflection}</p>
      </section>

      <section id="portfolio" aria-labelledby="portfolio-title" className="mt-12 scroll-mt-8 border-t border-line pt-8">
        <h2 id="portfolio-title" className="mb-3 text-xl font-semibold">Already in my portfolio</h2>
        <p className="mb-6 max-w-(--measure) text-muted">The following parts of my e-Portfolio are available in the existing sections.</p>
        <div className="space-y-6">
          <div className="rounded-(--radius) border border-line p-5">
            <h3 className="mb-2 text-lg font-semibold">Professional résumé</h3>
            <p className="mb-4 text-muted">My résumé is already available as a PDF in the portfolio.</p>
            <a className={actionClass} href="/Adan_Rojas_Resume.pdf">View résumé <span className="ml-2 font-mono text-xs text-muted">PDF ↗</span></a>
          </div>
          <div className="rounded-(--radius) border border-line p-5">
            <h3 className="mb-2 text-lg font-semibold">Certifications & activities</h3>
            <p className="mb-4 text-muted">My technology projects and extracurricular activities are already documented in Projects and Experience.</p>
            <div className="flex flex-wrap gap-2">
              <Link className={actionClass} href="/projects">View projects <span aria-hidden="true" className="ml-2">↗</span></Link>
              <Link className={actionClass} href="/experience">View activities <span aria-hidden="true" className="ml-2">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
