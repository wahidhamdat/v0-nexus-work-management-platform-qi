import type { CSSProperties } from "react"
import { Kicker } from "@/components/primitives"
import type { SiteContent } from "@/lib/content/types"

/**
 * Five steps drawn as a hash chain. Each link seals — glyph filled, connector
 * drawn, body brought to full opacity — as it passes the centre of the screen,
 * and the counter beside the verdict keeps the tally.
 */
export function Method({ content }: { content: SiteContent }) {
  const { method } = content

  return (
    <section className="section method" id="method" data-case aria-labelledby="method-h">
      <div className="shift">
        <div className="split">
          <div className="method__head">
            <div className="reveal">
              <Kicker head={method} />
            </div>

            <h2
              className="verdict verdict--narrow reveal"
              id="method-h"
              style={{ "--i": 1 } as CSSProperties}
            >
              {method.verdict}
            </h2>

            <p className="method__count mono reveal" style={{ "--i": 2 } as CSSProperties}>
              {method.chainLabel} — <span className="latin" data-chaincount suppressHydrationWarning>
                0
              </span>
              <span className="latin">/{method.links.length}</span>
            </p>
          </div>

          <div className="chain">
            {method.links.map((link, i) => {
              const last = i === method.links.length - 1
              return (
                <div
                  key={link.num}
                  className={`chain__link${last ? " chain__link--last" : ""}`}
                  data-link
                >
                  <div className="chain__spine">
                    <span className="chain__glyph" />
                    {last ? null : <span className="chain__conn" />}
                  </div>
                  <div className="chain__body">
                    <p className="chain__num latin">{link.num}</p>
                    <h3 className="chain__title">{link.title}</h3>
                    <p className="chain__text">{link.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
