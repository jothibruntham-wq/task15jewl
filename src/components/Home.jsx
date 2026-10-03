import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/effect-cards";
import "../assets/style/style.css";

// Load every image in the folder (no exact file names needed)
const images = import.meta.glob(
  "../assets/images/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,avif,svg}",
  { eager: true, import: "default" }
);

const fallback = Object.values(images)[0] || "";

// find an image whose file name starts with a keyword (case-insensitive)
const pick = (start) => {
  const key = Object.keys(images).find((p) =>
    p.split("/").pop().toLowerCase().startsWith(start)
  );
  return key ? images[key] : fallback;
};

const ITEMS = [
  { name: "Nova Crystal", price: "₹14,849", img: pick("ear") },
  { name: "Zenith Dark", price: "₹21,549", img: pick("bang") },
  { name: "Lumina Gold", price: "₹24,949", img: pick("barc") },
  { name: "Aurora Pearl", price: "₹18,299", img: pick("neck") },
  { name: "Solis Ring", price: "₹9,999", img: pick("ring") },
];

export default function Home() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  // intro: tiles fan out from the center, then collapse into the stack
  useEffect(() => {
    const ctx = gsap.context(() => {
      const row = root.current.querySelector(".coll-row");
      const cx = row.offsetWidth / 2;
      gsap
        .timeline()
        .from(".coll-head", { y: -20, opacity: 0, duration: 0.8 })
        .from(
          ".tile",
          {
            x: (i, t) => cx - (t.offsetLeft + t.offsetWidth / 2),
            rotation: (i) => (i - 2) * 10,
            scale: 0.6,
            opacity: 0,
            duration: 0.8,
            stagger: 0.45, // one card at a time
            ease: "back.out(1.4)",
          },
          "-=0.2"
        )
        .to(
          ".tile",
          {
            x: (i, t) => cx - (t.offsetLeft + t.offsetWidth / 2),
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.in",
          },
          "+=0.8"
        )
        .to(".coll-main", { opacity: 1, duration: 0.5 }, "-=0.3")
        .from(
          ".coll .swiper",
          { scale: 0.7, y: 30, duration: 0.7, ease: "back.out(1.6)" },
          "<"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  // animate product info on slide change
  useEffect(() => {
    gsap.fromTo(
      ".info > *",
      { x: 24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section className="coll" ref={root}>
      <div className="coll-head">
        <small>The Ultimate</small>
        <h1>COLLECTIONS</h1>
      </div>

      <div className="coll-row">
        {ITEMS.map((it) => (
          <div className="tile" key={it.name}>
            <img src={it.img} alt={it.name} />
          </div>
        ))}
      </div>

      <div className="coll-main">
        <Swiper
          effect="cards"
          modules={[EffectCards]}
          grabCursor
          cardsEffect={{ perSlideOffset: 7, perSlideRotate: 2, slideShadows: false }}
          onSlideChange={(s) => setActive(s.activeIndex)}
        >
          {ITEMS.map((it) => (
            <SwiperSlide key={it.name}>
              <img src={it.img} alt={it.name} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="info">
          <h2>{ITEMS[active].name}</h2>
          <p>{ITEMS[active].price}</p>
          <button>ADD TO CART</button>
          <div className="handle">@ARTLYSOFTSTUDIO</div>
        </div>
      </div>
    </section>
  );
}
