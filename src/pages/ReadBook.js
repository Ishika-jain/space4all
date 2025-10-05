import React, { useEffect, useRef, useState } from 'react';

export default function ReadBook() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPageRotation = (pageIndex, totalPages) => {
    const startPercent = pageIndex / totalPages;
    const endPercent = (pageIndex + 1) / totalPages;
    
    if (scrollProgress < startPercent) return 0;
    if (scrollProgress > endPercent) return -180;
    
    const pageProgress = (scrollProgress - startPercent) / (endPercent - startPercent);
    return pageProgress * -180;
  };

  const getPageZIndex = (pageIndex, totalPages, rotation) => {
    if (rotation < -90) return 0;
    return totalPages - pageIndex;
  };

  const getLeftPageOpacity = (pageIndex, totalPages) => {
    const startPercent = pageIndex / totalPages;
    const endPercent = (pageIndex + 1) / totalPages;
    
    if (scrollProgress < startPercent) return 0;
    if (scrollProgress > endPercent) return 1;
    
    const pageProgress = (scrollProgress - startPercent) / (endPercent - startPercent);
    return pageProgress > 0.5 ? 1 : 0;
  };

  const bookRotationY = Math.sin(scrollProgress * Math.PI) * 6;
  const bookRotationX = Math.sin(scrollProgress * Math.PI * 2) * -2;
  const bookScale = 1 - scrollProgress * 0.03;

  const rightPages = [
    {
      title: "The Dynamic Sun",
      content: (
        <>
          <p>Our star is far from static. The Sun's surface churns and boils with convective currents, transporting heat from the core to the surface at speeds of thousands of kilometers per hour.</p>
          <p>These movements create complex magnetic fields that twist and tangle, storing enormous amounts of energy. When these fields suddenly snap and reconfigure, they release that energy in explosive outbursts.</p>
          <h3>A Nuclear Powerhouse</h3>
          <p>At its core, the Sun fuses 600 million tons of hydrogen into helium every second, releasing the energy equivalent of 100 billion nuclear bombs. This continuous nuclear reaction has been burning for 4.6 billion years.</p>
        </>
      ),
      pageNum: 2
    },
    {
      title: "Magnetic Mysteries",
      content: (
        <>
          <p>Sunspots are windows into the Sun's powerful magnetic field. They appear in pairs or groups, with opposite magnetic polarities—like the poles of a magnet.</p>
          <p>Some sunspot groups grow to enormous sizes, spanning distances greater than the diameter of Jupiter. The largest recorded sunspot group could have swallowed multiple Earths with room to spare.</p>
          <h3>Predicting Solar Activity</h3>
          <p>Scientists monitor sunspot numbers to predict solar activity. Higher sunspot counts typically mean more solar flares and coronal mass ejections, which can impact satellites, power grids, and communications on Earth.</p>
        </>
      ),
      pageNum: 4
    },
    {
      title: "The Power of Flares",
      content: (
        <>
          <p>The energy released in the largest solar flares equals billions of megatons of TNT. In just a few minutes, they emit as much energy as the Sun normally radiates in several days.</p>
          <h3>Classification System</h3>
          <p>Solar flares are classified by their X-ray brightness: C-class (small), M-class (medium), and X-class (large). Each class is ten times more powerful than the previous one.</p>
          <div className="quote">
            "A single X-class flare releases the energy equivalent of a billion hydrogen bombs exploding simultaneously."
          </div>
          <p>The most powerful flare ever recorded occurred on November 4, 2003, saturating instruments at X28+ class—possibly even stronger.</p>
        </>
      ),
      pageNum: 6
    },
    {
      title: "Coronal Ejections",
      content: (
        <>
          <div className="illustration-container">
            <div className="particle" style={{top: '50px', left: '150px', animationDelay: '0s'}}></div>
            <div className="particle" style={{top: '100px', left: '300px', animationDelay: '1s'}}></div>
            <div className="particle" style={{top: '30px', left: '500px', animationDelay: '0.5s'}}></div>
          </div>
          <p>Coronal Mass Ejections (CMEs) are massive expulsions of plasma and magnetic field from the Sun's corona. A single CME can contain a billion tons of matter traveling at millions of kilometers per hour.</p>
          <p>When directed at Earth, CMEs can trigger geomagnetic storms that disrupt satellite operations, radio communications, and electrical power grids.</p>
        </>
      ),
      pageNum: 8
    },
    {
      title: "Magnetosphere Dynamics",
      content: (
        <>
          <p>Earth's magnetosphere extends about 60,000 kilometers toward the Sun but trails behind Earth for millions of kilometers on the night side, creating a long "magnetotail."</p>
          <h3>When Shields Fail</h3>
          <p>During severe geomagnetic storms, the magnetosphere can be compressed, allowing solar particles to penetrate deeper into Earth's atmosphere. This can cause spectacular auroras at lower latitudes than usual.</p>
          <div className="quote">
            "Without our magnetic shield, the solar wind would have stripped away our atmosphere billions of years ago, leaving Earth as barren as Mars."
          </div>
        </>
      ),
      pageNum: 10
    },
    {
      title: "Living With Solar Weather",
      content: (
        <>
          <p>In our modern, technology-dependent world, understanding and predicting solar weather has become crucial. Space weather forecasters monitor the Sun 24/7, watching for signs of impending eruptions.</p>
          <h3>Protecting Our Technology</h3>
          <p>Power companies can take preventive measures when warned of incoming CMEs. Airlines reroute polar flights to avoid radiation exposure. Satellites can be placed in protective modes.</p>
          <p>As we expand further into space with plans for lunar bases and Mars missions, understanding solar weather becomes even more critical for protecting astronauts and equipment.</p>
        </>
      ),
      pageNum: 12
    },
    {
      title: "Conclusion",
      content: (
        <>
          <p>Solar weather is a reminder of our intimate connection to the cosmos. The same nuclear reactions that power the Sun create the environment that makes life on Earth possible—yet they also pose challenges we must understand and prepare for.</p>
          <p>As our technology advances and we venture further into space, our relationship with solar weather will only deepen. The Sun that gives us life also demands our respect and vigilance.</p>
          <div className="quote">
            "In understanding the Sun, we understand ourselves—children of a star, living in its embrace, forever dancing to its cosmic rhythm."
          </div>
          <p style={{textAlign: 'center', marginTop: '40px', fontStyle: 'italic'}}>~ The End ~</p>
        </>
      ),
      pageNum: 13
    }
  ];

  const leftPages = [
    {
      title: "Introduction",
      content: (
        <>
          <p>For billions of years, our Sun has been the source of all life on Earth. Its warm rays nurture our planet, driving weather patterns and sustaining the intricate web of life.</p>
          <p>Yet beneath its serene appearance lies a tempestuous beast—a roiling mass of nuclear fury that constantly unleashes powerful forces into the cosmos.</p>
          <h3>What is Solar Weather?</h3>
          <p>Solar weather refers to the various phenomena occurring on and around the Sun that can affect Earth and the entire solar system. These include sunspots, solar flares, coronal mass ejections, and the ever-present solar wind.</p>
        </>
      ),
      pageNum: 1
    },
    {
      title: "Sunspots",
      content: (
        <>
          <p>Sunspots are dark regions on the Sun's surface where intense magnetic fields prevent hot plasma from reaching the surface. Though they appear dark, they are still incredibly hot—around 3,500°C.</p>
          <h3>The Solar Cycle</h3>
          <p>The number of sunspots varies in an approximately 11-year cycle. During solar maximum, the Sun's surface may host dozens of sunspot groups. At solar minimum, weeks may pass without a single spot.</p>
          <div className="quote">
            "The Sun's heartbeat pulses with an 11-year rhythm that shapes space weather throughout our cosmic neighborhood."
          </div>
        </>
      ),
      pageNum: 3
    },
    {
      title: "Solar Flares",
      content: (
        <>
          <div className="illustration-container">
            <div className="sun"></div>
            <div className="solar-flare" style={{top: '58px', right: '90px', transform: 'rotate(-25deg)'}}></div>
            <div className="solar-flare" style={{top: '58px', right: '90px', transform: 'rotate(25deg)', animationDelay: '1s'}}></div>
          </div>
          <p>Solar flares are sudden, intense bursts of electromagnetic radiation from the Sun's atmosphere. They occur when magnetic energy built up in the solar atmosphere is suddenly released.</p>
        </>
      ),
      pageNum: 5
    },
    {
      title: "Solar Wind",
      content: (
        <>
          <p>The solar wind is a continuous stream of charged particles flowing from the Sun's corona. This plasma travels at speeds ranging from 250 to 750 kilometers per second.</p>
          <h3>The Heliosphere</h3>
          <p>The solar wind extends far beyond the planets, creating a vast bubble called the heliosphere. This region shields our solar system from interstellar radiation and cosmic rays.</p>
          <div className="quote">
            "An invisible river of plasma connects the Sun to every planet in our solar system."
          </div>
        </>
      ),
      pageNum: 7
    },
    {
      title: "Earth's Shield",
      content: (
        <>
          <div className="illustration-container">
            <div className="orbit">
              <div className="earth"></div>
            </div>
          </div>
          <p>Our planet's magnetic field, generated by the churning of molten iron in Earth's outer core, forms a protective magnetosphere. This invisible shield deflects most of the solar wind's charged particles.</p>
        </>
      ),
      pageNum: 9
    },
    {
      title: "The Aurora",
      content: (
        <>
          <div className="illustration-container">
            <div className="aurora" style={{top: '50px', left: '150px'}}></div>
            <div className="aurora" style={{top: '80px', left: '350px', animationDelay: '2.5s'}}></div>
          </div>
          <p>When solar particles penetrate Earth's magnetic shield near the poles, they collide with atmospheric gases, creating spectacular light displays known as aurora borealis in the north and aurora australis in the south.</p>
        </>
      ),
      pageNum: 11
    }
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Georgia', serif;
          background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%);
          color: #2c2c2c;
          overflow-x: hidden;
          height: 500vh;
        }

        .book-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          perspective: 2500px;
          z-index: 10;
        }

        .book {
          width: 1800px;
          height: 900px;
          position: relative;
          transform-style: preserve-3d;
          display: flex;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
        }

        .book-half {
          width: 900px;
          height: 900px;
          position: relative;
          transform-style: preserve-3d;
        }

        .page {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #f8f5ed 0%, #fefdfb 50%, #f9f6ee 100%);
          padding: 60px 70px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          backface-visibility: hidden;
          box-shadow: inset 0 0 50px rgba(139, 69, 19, 0.05);
          overflow: hidden;
        }

        .page::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 100%);
          pointer-events: none;
        }

        .page-left {
          border-radius: 15px 0 0 15px;
          text-align: left;
          border-right: 1px solid rgba(139, 69, 19, 0.15);
        }

        .page-left::after {
          right: 0;
        }

        .page-right {
          border-radius: 0 15px 15px 0;
          text-align: left;
          transform-origin: left center;
          border-left: 1px solid rgba(139, 69, 19, 0.15);
        }

        .page-right::after {
          left: 0;
          background: linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 100%);
        }

        .page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.02) 2px, rgba(139, 69, 19, 0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.02) 2px, rgba(139, 69, 19, 0.02) 4px);
          pointer-events: none;
          opacity: 0.3;
        }

        .page h2 {
          font-size: 2.8rem;
          margin-bottom: 25px;
          color: #3d2817;
          font-weight: normal;
          border-bottom: 3px solid #d4a574;
          padding-bottom: 15px;
          display: inline-block;
        }

        .page h3 {
          font-size: 1.8rem;
          margin: 25px 0 15px 0;
          color: #4a2c17;
          font-weight: normal;
        }

        .page p {
          font-size: 1.18rem;
          line-height: 2;
          margin: 15px 0;
          color: #3a3a3a;
          text-align: justify;
          text-indent: 30px;
        }

        .page p:first-of-type {
          text-indent: 0;
        }

        .page-number {
          position: absolute;
          bottom: 40px;
          font-size: 1.1rem;
          color: #8b6f47;
          font-style: italic;
        }

        .page-left .page-number {
          left: 60px;
        }

        .page-right .page-number {
          right: 60px;
        }

        .cover-page {
          background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #cd853f 100%);
          color: white;
          justify-content: center;
          align-items: center;
          text-align: center;
          border: none;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.3);
        }

        .cover-page::before {
          background: none;
        }

        .cover-page::after {
          display: none;
        }

        .cover-page h1 {
          color: #ffe4b5;
          font-size: 5rem;
          text-shadow: 4px 4px 12px rgba(0,0,0,0.7);
          letter-spacing: 4px;
        }

        .cover-page .subtitle {
          color: #ffd4a3;
          font-size: 1.8rem;
          margin-top: 20px;
          font-style: italic;
          text-indent: 0;
        }

        .back-cover {
          background: linear-gradient(135deg, #cd853f 0%, #a0522d 50%, #8b4513 100%);
          color: white;
          justify-content: center;
          align-items: center;
          text-align: center;
          border: none;
        }

        .back-cover::before,
        .back-cover::after {
          display: none;
        }

        .back-cover h2 {
          color: #ffe4b5;
          border: none;
          font-size: 3rem;
        }

        .spine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(to bottom, #5c3317 0%, #3d2213 50%, #5c3317 100%);
          box-shadow: 
            inset 4px 0 8px rgba(0,0,0,0.5),
            inset -4px 0 8px rgba(0,0,0,0.5),
            0 0 20px rgba(0,0,0,0.4);
          z-index: 100;
          border-radius: 3px;
        }

        .spine::before {
          content: '';
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 80%;
          background: rgba(255,215,0,0.3);
          box-shadow: 0 0 5px rgba(255,215,0,0.5);
        }

        .flourish {
          font-size: 2rem;
          color: #cd853f;
          margin: 20px 0;
          text-align: center;
        }

        .quote {
          font-style: italic;
          font-size: 1.2rem;
          color: #5a5a5a;
          border-left: 4px solid #cd853f;
          padding-left: 20px;
          margin: 25px 0;
          text-indent: 0 !important;
        }

        .scroll-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffa500;
          font-size: 1.1rem;
          z-index: 100;
          animation: bounce 2s infinite;
          text-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
          opacity: ${scrollProgress > 0.05 ? 0 : 1};
          transition: opacity 0.5s;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        .sun {
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, #ffeb3b, #ff9800);
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 0 60px rgba(255, 152, 0, 0.9);
          animation: pulse 3s infinite;
          top: 50px;
          right: 100px;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 60px rgba(255, 152, 0, 0.9); }
          50% { transform: scale(1.08); box-shadow: 0 0 90px rgba(255, 152, 0, 1); }
        }

        .solar-flare {
          position: absolute;
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #ff9800, #ff4500, transparent);
          animation: flare 2s infinite;
        }

        @keyframes flare {
          0%, 100% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #ffa500, #ff6b00);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
          animation: float-right 3s infinite;
        }

        @keyframes float-right {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 1; }
          50% { transform: translateY(-60px) translateX(40px); opacity: 0.3; }
        }

        .aurora {
          position: absolute;
          width: 250px;
          height: 180px;
          background: linear-gradient(180deg, transparent, rgba(0, 255, 100, 0.5), rgba(100, 200, 255, 0.5), transparent);
          filter: blur(25px);
          animation: wave 5s infinite;
        }

        @keyframes wave {
          0%, 100% { transform: skewX(0deg) translateX(0); opacity: 0.7; }
          25% { transform: skewX(12deg) translateX(25px); opacity: 1; }
          75% { transform: skewX(-12deg) translateX(-25px); opacity: 1; }
        }

        .orbit {
          position: absolute;
          width: 160px;
          height: 160px;
          border: 3px dashed rgba(205, 133, 63, 0.4);
          border-radius: 50%;
          animation: rotate 10s linear infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .earth {
          width: 45px;
          height: 45px;
          background: radial-gradient(circle at 35% 35%, #4dabf7, #1971c2, #0c4a7a);
          border-radius: 50%;
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 25px rgba(73, 171, 247, 0.7);
        }

        .earth::after {
          content: '';
          position: absolute;
          width: 15px;
          height: 15px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          top: 8px;
          left: 12px;
        }

        .illustration-container {
          position: relative;
          width: 100%;
          height: 200px;
          margin: 30px 0;
        }

        @media (max-width: 1650px) {
          .book {
            width: 90vw;
            height: auto;
            aspect-ratio: 2 / 1;
          }
          
          .book-half {
            width: 45vw;
            height: auto;
          }
          
          .page {
            padding: 40px 50px;
          }
          
          .page h2 {
            font-size: 2.2rem;
          }
          
          .page p {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="scroll-indicator">
        ☀️ Scroll to turn pages ☀️
      </div>

      <div className="book-container">
        <div 
          className="book" 
          style={{
            transform: `rotateY(${bookRotationY}deg) rotateX(${bookRotationX}deg) scale(${bookScale})`
          }}
        >
          <div className="spine"></div>
          
          {/* Left half of book */}
          <div className="book-half">
            {/* Cover */}
            <div className="page page-left cover-page" style={{zIndex: 0}}>
              <h1>☀️<br/>Solar Weather<br/>☀️</h1>
              <div className="flourish" style={{color: '#ffe4b5'}}>✦ ✧ ⋆ ✧ ✦</div>
              <p className="subtitle">A Journey Through the Sun's Mighty Forces</p>
              <p style={{marginTop: '50px', fontSize: '1.2rem', textIndent: 0, color: '#ffd4a3'}}>An exploration of cosmic phenomena</p>
            </div>

            {/* Left pages that appear as right pages turn */}
            {leftPages.map((page, index) => {
              const opacity = getLeftPageOpacity(index, rightPages.length);
              return (
                <div 
                  key={`left-${index}`}
                  className="page page-left" 
                  style={{
                    zIndex: index + 1,
                    opacity
                  }}
                >
                  <h2>{page.title}</h2>
                  {page.content}
                  <div className="page-number">{page.pageNum}</div>
                </div>
              );
            })}

            {/* Back cover */}
            <div className="page page-left back-cover" style={{zIndex: leftPages.length + 1, opacity: getLeftPageOpacity(leftPages.length, rightPages.length)}}>
              <h2>Our Cosmic Bond</h2>
              <div className="flourish" style={{color: '#ffd4a3'}}>✦ ⋆ ✦</div>
              <p style={{textIndent: 0, color: '#ffd4a3'}}>The Sun and Earth exist in an eternal dance, bound by invisible forces that shape our existence and protect our world.</p>
              <div className="quote" style={{borderLeftColor: '#ffe4b5', color: '#ffe4b5', textAlign: 'center', border: 'none', padding: 0, marginTop: '40px'}}>
                "We are all made of star stuff, forever connected to the cosmos."
              </div>
            </div>
          </div>

          {/* Right half of book */}
          <div className="book-half">
            {rightPages.map((page, index) => {
              const rotation = getPageRotation(index, rightPages.length);
              const zIndex = getPageZIndex(index, rightPages.length, rotation);
              
              return (
                <div 
                  key={`right-${index}`}
                  className="page page-right" 
                  style={{
                    transform: `rotateY(${rotation}deg)`,
                    transformOrigin: 'left center',
                    zIndex
                  }}
                >
                  <h2>{page.title}</h2>
                  {page.content}
                  <div className="page-number">{page.pageNum}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}