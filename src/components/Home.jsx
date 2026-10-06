import { useState } from "react";

/* Images live in src/assets/images/ — file names (and upper/lower case) must match exactly */
import bangle from "../assets/images/bangle.png";
import earings from "../assets/images/earings.png";
import necklace from "../assets/images/necklace.png";
import ring from "../assets/images/ring.png";
import chain from "../assets/images/chain.PNG";
import jhumka from "../assets/images/jhumka.png";
import crystal from "../assets/images/crystal.png";

const PRODUCTS = [
  { id: 1, name: "Golden Bangle", price: 21549, img: bangle },
  { id: 2, name: "Diamond Earrings", price: 18999, img: earings },
  { id: 3, name: "Golden Necklace", price: 32499, img: necklace },
  { id: 4, name: "Diamond Ring", price: 26549, img: ring },
  { id: 5, name: "Golden Chain", price: 15999, img: chain },
  { id: 6, name: "Traditional Jhumka", price: 12499, img: jhumka },
  { id: 7, name: "Crystal Necklace", price: 29999, img: crystal },
];

const rupee = (n) => "₹" + n.toLocaleString("en-IN");

export default function App() {
  const [active, setActive] = useState(null); // index of opened product
  const [cart, setCart] = useState(0);

  const mid = (PRODUCTS.length - 1) / 2;

  return (
    <>
      <style>{css}</style>
      <main className="app">
        {active === null ? (
          <section className="home">
            <header className="heading">
              <p>The Ultimate</p>
              <h1>COLLECTIONS</h1>
            </header>

            <div className="fan">
              {PRODUCTS.map((p, i) => {
                const o = i - mid;
                return (
                  <button
                    key={p.id}
                    className="card"
                    style={{ "--o": o, "--z": 50 - Math.abs(o) }}
                    onClick={() => setActive(i)}
                    aria-label={`View ${p.name}`}
                  >
                    <img src={p.img} alt={p.name} draggable="false" />
                  </button>
                );
              })}
            </div>

            <p className="hint">Click a card to view details</p>
          </section>
        ) : (
          <section className="detail">
            <button className="back" onClick={() => setActive(null)}>
              ‹ Back
            </button>

            <div className="detail-grid">
              {/* stacked cards – click to go to next item */}
              <div
                className="stack"
                onClick={() => setActive((active + 1) % PRODUCTS.length)}
                title="Next piece"
              >
                {[2, 1, 0].map((k) => {
                  const p = PRODUCTS[(active + k) % PRODUCTS.length];
                  return (
                    <div
                      key={p.id}
                      className="stack-card"
                      style={{ "--k": k }}
                    >
                      <img src={p.img} alt={p.name} draggable="false" />
                    </div>
                  );
                })}
              </div>

              <div className="info" key={PRODUCTS[active].id}>
                <h2>{PRODUCTS[active].name}</h2>
                <p className="price">{rupee(PRODUCTS[active].price)}</p>
                <button className="cart" onClick={() => setCart(cart + 1)}>
                  ADD TO CART{cart > 0 ? ` (${cart})` : ""}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Inter:wght@400;500;600&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%}
body{font-family:'Inter',system-ui,sans-serif;overflow:hidden;background:#93bdd0}

/* edge-to-edge cover background */
.app{
  position:fixed;inset:0;width:100vw;height:100vh;height:100dvh;
  background:#93bdd0 center/cover no-repeat;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
}
.home,.detail{width:100%;height:100%;position:relative}

/* ---------- HOME ---------- */
.home{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:clamp(24px,6vh,64px);
}
.heading{text-align:center;color:#111}
.heading p{font-size:clamp(11px,1vw,14px);font-weight:500;margin-bottom:6px}
.heading h1{
  font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;
  font-size:clamp(40px,6vw,96px);letter-spacing:.01em;line-height:1;
}

.fan{
  --w:clamp(110px,13vw,230px);
  --step:calc(var(--w) * .72);
  position:relative;width:100%;height:calc(var(--w) * 1.4);
}
.card{
  position:absolute;left:50%;top:50%;
  width:var(--w);aspect-ratio:3/4;
  margin:calc(var(--w) * -.67) 0 0 calc(var(--w) * -.5);
  border:0;border-radius:14px;padding:10px;cursor:pointer;
  background:rgba(255,255,255,.28);
  box-shadow:0 14px 30px rgba(20,50,70,.18);
  z-index:var(--z);
  transform:
    translateX(calc(var(--o) * var(--step)))
    translateY(calc(var(--o) * var(--o) * 5px))
    rotate(calc(var(--o) * 3.5deg));
  transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s;
}
.card img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
.card:hover,.card:focus-visible{
  z-index:100;outline:none;
  box-shadow:0 22px 40px rgba(20,50,70,.3);
  transform:
    translateX(calc(var(--o) * var(--step)))
    translateY(-22px) rotate(0deg) scale(1.1);
}
.hint{font-size:11px;color:rgba(0,0,0,.45)}

/* ---------- DETAIL ---------- */
.back{
  position:absolute;top:24px;left:24px;z-index:5;
  background:#111;color:#fff;border:0;border-radius:6px;
  padding:8px 14px;font-size:12px;cursor:pointer;
}
.detail-grid{
  height:100%;max-width:1100px;margin:0 auto;padding:0 6vw;
  display:grid;grid-template-columns:1fr 1fr;align-items:center;
  gap:clamp(24px,6vw,100px);
}
.stack{
  --w:clamp(220px,28vw,400px);
  position:relative;width:var(--w);aspect-ratio:3/4;
  justify-self:end;cursor:pointer;
}
.stack-card{
  position:absolute;inset:0;background:#f7f7f7;border-radius:18px;padding:6%;
  box-shadow:0 18px 40px rgba(20,50,70,.25);
  transform:translate(calc(var(--k) * 4%),calc(var(--k) * 3%)) rotate(calc(var(--k) * 2.5deg));
  filter:brightness(calc(1 - var(--k) * .06));
  transition:transform .4s ease;
}
.stack-card img{width:100%;height:100%;object-fit:contain}
.stack:hover .stack-card:nth-child(3){transform:translate(-2%,-1%)}

.info{animation:fade .45s ease both}
@keyframes fade{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}
.info h2{
  font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;
  font-size:clamp(28px,3.4vw,48px);color:#111;text-transform:uppercase;
}
.price{font-weight:600;font-size:clamp(16px,1.5vw,22px);margin:14px 0 20px;color:#111}
.cart{
  width:min(100%,320px);background:#111;color:#fff;border:0;border-radius:6px;
  padding:14px;font-size:12px;letter-spacing:.08em;cursor:pointer;
  box-shadow:0 10px 24px rgba(0,0,0,.25);transition:transform .2s;
}
.cart:hover{transform:translateY(-2px)}

/* ---------- RESPONSIVE ---------- */
@media (max-width:760px){
  .fan{--w:clamp(80px,22vw,130px);--step:calc(var(--w) * .55)}
  .detail-grid{grid-template-columns:1fr;justify-items:center;align-content:center;text-align:center;gap:40px}
  .stack{justify-self:center;--w:min(60vw,300px)}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;
