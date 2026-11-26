import { useEffect } from "react";

/**
 * Shown in place of the whole site while `RESTRICTIONS.attackMode` is on
 * (src/config/restrictions.ts). A self-contained page: no masthead, no footer,
 * no data, and nothing from the rest of the site that could fail.
 */
export function AttackPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Institute for Educational Accountability | Under attack";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    const before = robots.content;
    robots.content = "noindex, nofollow";
    return () => {
      document.title = prev;
      if (created) robots?.remove();
      else if (robots) robots.content = before;
    };
  }, []);

  return (
    <main className="atk" role="alert" aria-live="assertive">
      <div className="atk-grid" aria-hidden="true" />
      <div className="atk-rings" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="atk-inner">
        <p className="atk-eyebrow">Institute for Educational Accountability</p>

        <div className="atk-badge">
          <span className="atk-dot" aria-hidden="true" />
          Status: Access suspended
        </div>

        <h1 className="atk-title">
          <span>The Institute</span>
          <span>is under</span>
          <span className="atk-hot">attack.</span>
        </h1>

        <p className="atk-lead">
          IEA is under attack. For that reason, this website is inaccessible at this time.
        </p>

        <dl className="atk-status">
          <div>
            <dt>Public website</dt>
            <dd className="atk-bad">Inaccessible</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd className="atk-bad">Suspended</dd>
          </div>
        </dl>

        <div className="atk-contact">
          <p className="atk-label">Official correspondence</p>
          <p>
            <a href="mailto:officeofthepresident@ieainstitute.org">officeofthepresident@ieainstitute.org</a>
          </p>
          <p>
            <a href="mailto:founder@ieainstitute.org">founder@ieainstitute.org</a>
          </p>
        </div>
      </div>

      <div className="atk-ticker" aria-hidden="true">
        <div className="atk-ticker-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              {Array.from({ length: 6 }).map((__, i) => (
                <b key={i}>ACCESS SUSPENDED &nbsp;&#9670;&nbsp; IEA IS UNDER ATTACK &nbsp;&#9670;&nbsp; </b>
              ))}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
