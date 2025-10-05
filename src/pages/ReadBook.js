// import React from 'react'

// function ReadBook() {
//   return (
//     <div>ReadBook</div>
//   )
// }

// export default ReadBook

// "use client";

// import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const pages = [
//   { title: "The Digital Solar Chronicles", subtitle: "A Journey Through Space Weather", content: "Scroll down to start your cosmic adventure...", type: "cover" },
//   { title: "Chapter 1", subtitle: "The Sun's Fury", content: "Solar flares are massive explosions on the Sun's surface releasing energy that can affect Earth’s magnetic field." },
//   { title: "Chapter 2", subtitle: "Magnetic Storms", content: "Disturbances in Earth's magnetic field caused by solar wind. These storms can disrupt communication and power grids." },
//   { title: "Chapter 3", subtitle: "Auroras", content: "Charged particles from the Sun interact with Earth’s atmosphere, creating breathtaking light shows near the poles." },
//   { title: "Chapter 4", subtitle: "Space Weather Forecasting", content: "Scientists monitor the Sun using satellites to predict solar storms and protect our technology." },
//   { title: "Chapter 5", subtitle: "Impact on Technology", content: "Solar weather can affect satellites, GPS systems, and even ground-based power systems, making forecasting critical." },
//   { title: "Chapter 6", subtitle: "Exploration & Discovery", content: "Space agencies study solar weather to understand its effects on astronauts and future interplanetary travel." },
//   { title: "The End", subtitle: "", content: "Thank you for exploring the amazing world of solar weather!", type: "back" },
// ];

// export default function ReadBook() {
//   useEffect(() => {
//     const spreads = gsap.utils.toArray(".spread");

//     spreads.forEach((spread, i) => {
//       ScrollTrigger.create({
//         trigger: spread,
//         start: "top center",
//         end: "bottom center",
//         scrub: 1,
//         onUpdate: (self) => {
//           const rotation = self.progress * -180;
//           gsap.set(spread.querySelector(".right-page"), {
//             rotationY: rotation,
//             transformOrigin: "left center",
//             backfaceVisibility: "hidden",
//           });
//         },
//       });
//     });

//     // subtle book rotation
//     ScrollTrigger.create({
//       trigger: ".scroll-container",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 1,
//       onUpdate: (self) => {
//         gsap.set(".book", {
//           rotationY: self.progress * 5,
//           rotationX: self.progress * -2,
//         });
//       },
//     });
//   }, []);

//   return (
//     <div className="scroll-container" style={{ background: "#0a0f23", fontFamily: "Georgia, serif", overflowX: "hidden" }}>
//       {/* height = number of spreads * 100vh so scrolling works */}
//       <div style={{ height: `${(pages.length / 2) * 100}vh` }} />

//       <div
//         className="book"
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           perspective: "1500px",
//           width: "900px",
//           height: "600px",
//         }}
//       >
//         {pages.reduce((acc, page, idx) => {
//           if (idx % 2 === 0 && idx + 1 < pages.length) {
//             const left = pages[idx];
//             const right = pages[idx + 1];

//             acc.push(
//               <div
//                 key={idx}
//                 className="spread"
//                 style={{
//                   display: "flex",
//                   width: "100%",
//                   height: "100%",
//                   position: "absolute",
//                   transformStyle: "preserve-3d",
//                   zIndex: pages.length - idx,
//                 }}
//               >
//                 {/* Left Page */}
//                 <div
//                   className="left-page"
//                   style={{
//                     width: "50%",
//                     height: "100%",
//                     background: left.type === "cover" ? "linear-gradient(145deg, #8B4513, #A0522D)" : "#f5f5f5",
//                     borderRight: "1px solid #ddd",
//                     padding: "40px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderRadius: "10px 0 0 10px",
//                     boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   <h1 style={{ fontSize: left.type === "cover" ? "3rem" : "2rem", color: left.type === "cover" ? "#FFE4B5" : "#1a1a1a" }}>{left.title}</h1>
//                   <h2 style={{ fontSize: "1.5rem", margin: "20px 0" }}>{left.subtitle}</h2>
//                   <p style={{ fontSize: "1rem", maxWidth: "90%", textAlign: "center" }}>{left.content}</p>
//                 </div>

//                 {/* Right Page */}
//                 <div
//                   className="right-page"
//                   style={{
//                     width: "50%",
//                     height: "100%",
//                     background: right.type === "back" ? "#f5f5f5" : "#fefefe",
//                     borderLeft: "1px solid #ddd",
//                     padding: "40px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderRadius: "0 10px 10px 0",
//                     boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   <h1 style={{ fontSize: "2rem", color: "#1a1a1a" }}>{right.title}</h1>
//                   <h2 style={{ fontSize: "1.2rem", margin: "20px 0" }}>{right.subtitle}</h2>
//                   <p style={{ fontSize: "1rem", maxWidth: "90%", textAlign: "center" }}>{right.content}</p>
//                 </div>
//               </div>
//             );
//           }
//           return acc;
//         }, [])}
//       </div>

//       {/* Scroll Indicator */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "30px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           color: "#fff",
//           fontSize: "1rem",
//           zIndex: 100,
//           animation: "bounce 2s infinite",
//         }}
//       >
//         ↓ Scroll to turn pages ↓
//       </div>

//       <style>{`
//         @keyframes bounce {
//           0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
//           40% { transform: translateX(-50%) translateY(-10px); }
//           60% { transform: translateX(-50%) translateY(-5px); }
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function Flipbook() {
//   const [currentPage, setCurrentPage] = useState(0);
//   const totalPages = 1;

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div>
//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body, html {
//           font-family: 'Crimson Text', 'Georgia', serif;
//         }
//         .body-container {
//           background: linear-gradient(135deg, #2d1b00 0%, #1a0f00 100%);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 100vh;
//           padding: 20px;
//           perspective: 2000px;
//         }
//         .book-container {
//           position: relative;
//           width: 900px;
//           height: 600px;
//           transform-style: preserve-3d;
//         }
//         .book {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           transform-style: preserve-3d;
//           box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
//         }
//         .page {
//           position: absolute;
//           width: 50%;
//           height: 100%;
//           background: linear-gradient(to right, #faf8f3 0%, #fff 5%, #fff 95%, #f5f3ee 100%);
//           transform-style: preserve-3d;
//           transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
//           box-shadow: inset -3px 0 10px rgba(0,0,0,0.05), 5px 0 15px rgba(0,0,0,0.2);
//         }
//         .page.left {
//           left: 0;
//           transform-origin: right center;
//         }
//         .page.right {
//           right: 0;
//           transform-origin: left center;
//         }
//         .page.flipped {
//           transform: rotateY(-180deg);
//           box-shadow: inset 3px 0 10px rgba(0,0,0,0.05), -5px 0 15px rgba(0,0,0,0.2);
//         }
//         .page-content, .page-back {
//           padding: 60px 50px;
//           height: 100%;
//           overflow: hidden;
//           backface-visibility: hidden;
//         }
//         .page-back {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(to left, #faf8f3 0%, #fff 5%, #fff 95%, #f5f3ee 100%);
//           transform: rotateY(180deg);
//         }
//         .page-number {
//           position: absolute;
//           bottom: 30px;
//           font-size: 14px;
//           color: #666;
//         }
//         .page.left .page-number { left: 50px; }
//         .page.right .page-number { right: 50px; }
//         h1 { font-size: 28px; margin-bottom: 20px; color: #2c2416; font-weight: 600; }
//         h2 { font-size: 20px; margin: 25px 0 15px; color: #3d3427; font-weight: 600; }
//         p { font-size: 16px; line-height: 1.8; color: #1a1a1a; text-align: justify; margin-bottom: 15px; }
//         .spine {
//           position: absolute;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 20px;
//           height: 100%;
//           background: linear-gradient(to right, #8b7355 0%, #6d5a46 50%, #8b7355 100%);
//           box-shadow: inset 0 0 10px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.5);
//           z-index: 10;
//         }
//         .controls {
//           position: absolute;
//           bottom: -80px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           gap: 20px;
//         }
//         button {
//           padding: 12px 30px;
//           font-size: 16px;
//           background: #8b7355;
//           color: white;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: all 0.3s;
//           font-family: inherit;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.3);
//         }
//         button:hover {
//           background: #6d5a46;
//           transform: translateY(-2px);
//           box-shadow: 0 6px 15px rgba(0,0,0,0.4);
//         }
//         button:disabled {
//           background: #ccc;
//           cursor: not-allowed;
//           transform: none;
//         }
//       `}</style>

//       <div className="body-container">
//         <div className="book-container">
//           <div className="book">
//             <div className="spine"></div>

//             {/* Left Page */}
//             <div className="page left">
//               <div className="page-content">
//                 <h1>The Art of Reading</h1>
//                 <p>Books have been humanity's faithful companions through the ages, vessels of knowledge, emotion, and imagination. Each page turned is a step into another world, another perspective, another life.</p>
//                 <p>In the quiet rustle of paper and the gentle weight of a book in hand, we find a sanctuary from the chaos of modern life. Reading is not merely the act of processing words; it is a meditation, a journey, a transformation.</p>
//                 <div className="page-number">2</div>
//               </div>
//             </div>

//             {/* Right Page */}
//             <div className={`page right ${currentPage === 1 ? "flipped" : ""}`}>
//               <div className="page-content">
//                 <h2>The Magic Within</h2>
//                 <p>Every reader discovers their own magic within the pages. Some find adventure, others find solace. Some seek knowledge, while others chase dreams they've yet to name.</p>
//                 <p>The beauty of a book lies not just in what the author wrote, but in what the reader brings to it—their experiences, their hopes, their unique lens through which they interpret every word.</p>
//                 <p>As you turn each page, you're not just reading a story; you're participating in an ancient ritual of human connection.</p>
//                 <div className="page-number">3</div>
//               </div>
//               <div className="page-back">
//                 <h2>A New Chapter</h2>
//                 <p>When we turn the page, we embrace uncertainty. We don't know what comes next, yet we trust the journey. This is the essence of reading—and perhaps of life itself.</p>
//                 <p>Each chapter brings new characters, new conflicts, new resolutions. We grow with every page, learning lessons we didn't know we needed, discovering truths we always felt but couldn't articulate.</p>
//                 <p>The next page awaits, full of promise and possibility. All we must do is turn it.</p>
//                 <div className="page-number">4</div>
//               </div>
//             </div>
//           </div>

//           <div className="controls">
//             <button onClick={handlePrev} disabled={currentPage === 0}>← Previous</button>
//             <button onClick={handleNext} disabled={currentPage === totalPages}>Next →</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ReadBook.css";

export default function ReadBook() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rightPages = [
      "#right-page-1",
      "#right-page-2",
      "#right-page-3",
      "#right-page-4",
      "#right-page-5",
      "#right-page-6",
      "#right-page-7",
    ];

    const leftPages = [
      "#left-page-1",
      "#left-page-2",
      "#left-page-3",
      "#left-page-4",
      "#left-page-5",
      "#left-page-6",
    ];

    // Set initial visibility - only cover visible on left
    leftPages.forEach((page, index) => {
      gsap.set(page, {
        opacity: 0,
        zIndex: index + 1,
      });
    });

    // Animate each right page turn
    rightPages.forEach((page, index) => {
      const startPercent = (index / rightPages.length) * 100;
      const endPercent = ((index + 1) / rightPages.length) * 100;

      ScrollTrigger.create({
        trigger: "body",
        start: `${startPercent}%`,
        end: `${endPercent}%`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const rotation = progress * -180;

          gsap.set(page, {
            rotationY: rotation,
            transformOrigin: "left center",
          });

          if (progress > 0.5) {
            gsap.set(page, { zIndex: 0 });
          } else {
            gsap.set(page, { zIndex: rightPages.length - index });
          }
        },
      });

      // Show corresponding left page when right page is turned
      if (index < leftPages.length) {
        ScrollTrigger.create({
          trigger: "body",
          start: `${startPercent}%`,
          end: `${endPercent}%`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress > 0.5) {
              gsap.set(leftPages[index], {
                opacity: 1,
                zIndex: index + 10,
              });
            } else {
              gsap.set(leftPages[index], { opacity: 0 });
            }
          },
        });
      }
    });

    // Book rotation and scale
    ScrollTrigger.create({
      trigger: "body",
      start: "0%",
      end: "100%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".book", {
          rotationY: Math.sin(progress * Math.PI) * 6,
          rotationX: Math.sin(progress * Math.PI * 2) * -2,
          scale: 1 - progress * 0.03,
        });
      },
    });

    // Scroll indicator hide/show
    ScrollTrigger.create({
      trigger: "body",
      start: "5%",
      onEnter: () =>
        gsap.to(".scroll-indicator", { opacity: 0, duration: 0.5 }),
      onLeaveBack: () =>
        gsap.to(".scroll-indicator", { opacity: 1, duration: 0.5 }),
    });

    // Particle animation CSS injection
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float-right {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 1; }
        50% { transform: translateY(-60px) translateX(40px); opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <div class="scroll-indicator">☀️ Scroll to turn pages ☀️</div>

      <div class="book-container">
        <div class="book" id="book">
          <div class="spine"></div>

          <div className="book-half" id="left-half">
            <div className="page page-left cover-page" style={{ zIndex: 0 }}>
              <h1>
                ☀️
                <br />
                Solar Weather
                <br />
                ☀️
              </h1>
              <div className="flourish" style={{ color: "#ffe4b5" }}>
                ✦ ✧ ⋆ ✧ ✦
              </div>
              <p className="subtitle">
                A Journey Through the Sun's Mighty Forces
              </p>
              <p
                style={{
                  marginTop: "50px",
                  fontSize: "1.2rem",
                  textIndent: 0,
                  color: "#ffd4a3",
                }}
              >
                An exploration of cosmic phenomena
              </p>
            </div>

            <div
              className="page page-left"
              id="left-page-1"
              style={{ zIndex: 1 }}
            >
                <h2>The Dynamic Sun</h2>
              <p>
                The Sun’s surface boils with powerful currents carrying heat from its core. These movements twist magnetic fields until they snap, releasing immense bursts of energy.
              </p>
              <h3>A Nuclear Powerhouse</h3>
              <p>
                At core, the Sun fuses 600 million tons of hydrogen into
                helium every second, releasing the energy equivalent of 100
                billion nuclear bombs. This nuclear reaction has been
                burning for 4.6B years.
              </p>
              <div className="page-number">2</div>
            </div>

            <div
              className="page page-left"
              id="left-page-2"
              style={{ zIndex: 2 }}
            >
              <h2>Sunspots</h2>
              <p>
                Sunspots are regions on the Sun's surface where intense
                magnetic fields prevent hot plasma from reaching the surface.
                Though they appear dark, they are incredibly hot—around
                3,500°C.
              </p>
              <h3>The Solar Cycle</h3>
              <p>
                The number of sunspots varies in an approximately 11-year cycle.
                During solar maximum, the Sun's surface may host dozens of
                sunspot groups. At solar minimum, weeks may pass without a
                single spot.
              </p>
              {/* <div className="quote">
                "The Sun's heartbeat pulses with an 11-year rhythm that shapes
                space weather throughout our cosmic neighborhood."
              </div> */}
              <div className="page-number">4</div>
            </div>

            <div
              className="page page-left"
              id="left-page-3"
              style={{ zIndex: 3 }}
            >
              <h2>Solar Flares</h2>
              <div className="illustration-container">
                <div className="sun"></div>
                {/* <div
                  className="solar-flare"
                  style={{
                    top: "108px",
                    right: "240px",
                    transform: "rotate(-25deg)",
                  }}
                ></div>
                <div
                  className="solar-flare"
                  style={{
                    top: "208px",
                    right: "240px",
                    transform: "rotate(25deg)",
                    animationDelay: "1s",
                  }}
                ></div> */}
              </div>
              <p>
                Solar flares are sudden, intense bursts of electromagnetic
                radiation from the Sun's atmosphere. They occur when magnetic
                energy built up in the solar atmosphere is suddenly released.
              </p>
              <div className="page-number">6</div>
            </div>

            <div
              className="page page-left"
              id="left-page-4"
              style={{ zIndex: 4 }}
            >
              <h2>Solar Wind</h2>
              <p>
                The solar wind is a continuous stream of charged particles
                flowing from the Sun's corona. This plasma travels at speeds
                ranging from 250 to 750 kilometers per second.
              </p>
              <h3>The Heliosphere</h3>
              <p>
                The solar wind extends far beyond the planets, creating a vast
                bubble called the heliosphere. This region shields our solar
                system from interstellar radiation and cosmic rays.
              </p>
              <div className="quote">
                "An invisible river of plasma connects the Sun to every planet
                in our solar system."
              </div>
              <div className="page-number">8</div>
            </div>

            <div
              className="page page-left"
              id="left-page-5"
              style={{ zIndex: 5 }}
            >
            <h2>Earth's Shield</h2>
              <div className="illustration-container">
                <div className="orbit">
                  <div className="earth"></div>
                </div>
              </div>
              <p>
                Our planet's magnetic field, generated by the churning of molten
                iron in Earth's outer core, forms a protective magnetosphere.
                This invisible shield deflects most of the solar wind's charged
                particles.
              </p>
              <div className="page-number">10</div>
            </div>

            <div
              className="page page-left"
              id="left-page-6"
              style={{ zIndex: 6 }}
            >
              <h2>The Aurora</h2>
              <div className="illustration-container">
                <div
                  className="aurora"
                  style={{ top: "50px", left: "150px" }}
                ></div>
                <div
                  className="aurora"
                  style={{ top: "80px", left: "350px", animationDelay: "2.5s" }}
                ></div>
              </div>
              <p>
                When solar particles penetrate Earth's magnetic shield near the
                poles, they collide with atmospheric gases, creating spectacular
                light displays known as aurora borealis in the north and aurora
                australis in the south.
              </p>
              <div className="page-number">12</div>
            </div>

            <div className="page page-left back-cover" style={{ zIndex: 7 }}>
              <h2
                style={{ color: "#ffe4b5", border: "none", fontSize: "3rem" }}
              >
                Our Cosmic Bond
              </h2>
              <div className="flourish" style={{ color: "#ffd4a3" }}>
                ✦ ⋆ ✦
              </div>
              <p style={{ textIndent: 0, color: "#ffd4a3" }}>
                The Sun and Earth exist in an eternal dance, bound by invisible
                forces that shape our existence and protect our world.
              </p>
              <div
                className="quote"
                style={{
                  borderLeftColor: "#ffe4b5",
                  color: "#ffe4b5",
                  textAlign: "center",
                  border: "none",
                  padding: 0,
                  marginTop: "40px",
                }}
              >
                "We are all made of star stuff, forever connected to the
                cosmos."
              </div>
            </div>
          </div>

          <div className="book-half" id="right-half">
            <div
              className="page page-right"
              id="right-page-1"
              style={{ zIndex: 7 }}
            >

              <h2>Introduction</h2>
              <p>
                For billions of years, our Sun has been the source of all life
                on Earth. Its warm rays nurture our planet, driving weather
                patterns and sustaining the intricate web of life.
              </p>
              
              <h3>What is Solar Weather?</h3>
              <p>
                Solar weather refers to the various phenomena occurring on and
                around the Sun that can affect Earth and the entire solar
                system. These include sunspots, solar flares, coronal mass
                ejections, and the ever-present solar wind.
              </p>
              <div className="page-number">1</div>


            
            </div>

            <div
              className="page page-right"
              id="right-page-2"
              style={{ zIndex: 6 }}
            >
              <h2>Magnetic Mysteries</h2>
              <p>
                Sunspots are windows into the Sun's powerful magnetic field.
                They appear in pairs or groups, with opposite magnetic
                polarities—like the poles of a magnet.
              </p>
              {/* <p>
                Some sunspot groups grow to enormous sizes, spanning distances
                greater than the diameter of Jupiter. The largest recorded
                sunspot group could have swallowed multiple Earths with room to
                spare.
              </p> */}
              <h3>Predicting Solar Activity</h3>
              <p>
                Scientists monitor sunspot numbers to predict solar activity.
                Higher sunspot counts typically mean more solar flares and
                coronal mass ejections, which can impact satellites, power
                grids, and communications on Earth.
              </p>
              <div className="page-number">3</div>
            </div>

            <div
              className="page page-right"
              id="right-page-3"
              style={{ zIndex: 5 }}
            >
              <h2>The Power of Flares</h2>
              <p>
                The energy released in the largest solar flares equals billions
                of megatons of TNT. In just a few minutes, they emit as much
                energy as the Sun normally radiates in several days.
              </p>
              <h3>Classification System</h3>
              <p>
                Solar flares are classified by their X-ray brightness: C-class
                (small), M-class (medium), and X-class (large). Each class is
                ten times more powerful than the previous one.
              </p>
              <div className="quote">
                "A single X-class flare releases the energy equivalent of a
                billion hydrogen bombs exploding simultaneously."
              </div>
              <p>
                The most powerful flare ever recorded occurred on November 4,
                2003, saturating instruments at X28+ class—possibly even
                stronger.
              </p>
              <div className="page-number">5</div>
            </div>

            <div
              className="page page-right"
              id="right-page-4"
              style={{ zIndex: 4 }}
            >
              <h2>Coronal Ejections</h2>
              <div
                className="particle"
                style={{
                  top: "200px",
                  left: "150px",
                  animation: "float-right 3s infinite",
                }}
              ></div>
              <div
                className="particle"
                style={{
                  top: "250px",
                  left: "300px",
                  animation: "float-right 4s infinite 1s",
                }}
              ></div>
              <div
                className="particle"
                style={{
                  top: "180px",
                  left: "500px",
                  animation: "float-right 3.5s infinite 0.5s",
                }}
              ></div>
              <p>
                Coronal Mass Ejections (CMEs) are massive expulsions of plasma
                and magnetic field from the Sun's corona. A single CME can
                contain a billion tons of matter traveling at millions of
                kilometers per hour.
              </p>
              <p>
                When directed at Earth, CMEs can trigger geomagnetic storms that
                disrupt satellite operations, radio communications, and
                electrical power grids.
              </p>
              <div className="page-number">7</div>
            </div>

            <div
              className="page page-right"
              id="right-page-5"
              style={{ zIndex: 3 }}
            >
              <h2>Magnetosphere Dynamics</h2>
              <p>
                Earth's magnetosphere extends about 60,000 kilometers toward the
                Sun but trails behind Earth for millions of kilometers on the
                night side, creating a long "magnetotail."
              </p>
              <h3>When Shields Fail</h3>
              <p>
                During severe geomagnetic storms, the magnetosphere can be
                compressed, allowing solar particles to penetrate deeper into
                Earth's atmosphere. This can cause spectacular auroras at lower
                latitudes than usual.
              </p>
              <div className="quote">
                "Without our magnetic shield, the solar wind would have stripped
                away our atmosphere billions of years ago, leaving Earth as
                barren as Mars."
              </div>
              <div className="page-number">9</div>
            </div>

            <div
              className="page page-right"
              id="right-page-6"
              style={{ zIndex: 2 }}
            >
              <h2>Living With Solar Weather</h2>
              <p>
                In our modern, technology-dependent world, understanding and
                predicting solar weather has become crucial. Space weather
                forecasters monitor the Sun 24/7, watching for signs of
                impending eruptions.
              </p>
              <h3>Protecting Our Technology</h3>
              <p>
                Power companies can take preventive measures when warned of
                incoming CMEs. Airlines reroute polar flights to avoid radiation
                exposure. Satellites can be placed in protective modes.
              </p>
              <p>
                As we expand further into space with plans for lunar bases and
                Mars missions, understanding solar weather becomes even more
                critical for protecting astronauts and equipment.
              </p>
              <div className="page-number">11</div>
            </div>

            <div
              className="page page-right"
              id="right-page-7"
              style={{ zIndex: 1 }}
            >
              <h2>Conclusion</h2>
              <p>
                Solar weather is a reminder of our intimate connection to the
                cosmos. The same nuclear reactions that power the Sun create the
                environment that makes life on Earth possible—yet they also pose
                challenges we must understand and prepare for.
              </p>
              <p>
                As our technology advances and we venture further into space,
                our relationship with solar weather will only deepen. The Sun
                that gives us life also demands our respect and vigilance.
              </p>
              <div className="quote">
                "In understanding the Sun, we understand ourselves—children of a
                star, living in its embrace, forever dancing to its cosmic
                rhythm."
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "40px",
                  fontStyle: "italic",
                }}
              >
                ~ The End ~
              </p>
              <div className="page-number">13</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
