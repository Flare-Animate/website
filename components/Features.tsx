"use client"

import React from 'react'
import MotionFadeInOnScroll from './MotionFadeInOnScroll'

function Features() {
    // const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // useEffect(() => {
    //     cardRefs.current.forEach((el, i) => {
    //         if (!el) return;
    //         const observer = new IntersectionObserver(
    //             ([entry]) => {
    //                 if (entry.isIntersecting) {
    //                     el.style.opacity = '1';
    //                     el.style.transform = 'translateY(0)';
    //                 }
    //             },
    //             { threshold: 0.1 }
    //         );
    //         observer.observe(el);
    //         return () => observer.disconnect();
    //     });
    // }, []);

    return (
        <section id="features">
            <div className="container">
                <span className="section-label">Capabilities</span>
                <h2>An animation editor<br />under active development</h2>
                <p className="section-desc">A look at the tools and workspace in the current Flare application. Feature support can vary between builds.</p>
                <div className="features-grid">
                    <MotionFadeInOnScroll className="feat-card">
                        <div className="feat-icon">🎯</div>
                        <div className="feat-title">Drawing workspace</div>
                        <p className="feat-desc">The editor brings drawing tools, a canvas, layers, and document settings into one workspace.</p>
                    </MotionFadeInOnScroll>
                    <MotionFadeInOnScroll className="feat-card">
                        <div className="feat-icon">📁</div>
                        <div className="feat-title">Timeline and layers</div>
                        <p className="feat-desc">Organize artwork in layers and work with frame-based animation in the timeline.</p>
                    </MotionFadeInOnScroll>
                    <MotionFadeInOnScroll className="feat-card">
                        <div className="feat-icon orange">🔧</div>
                        <div className="feat-title">Export settings</div>
                        <p className="feat-desc">The current interface lists SWF, HTML5 Canvas, GIF, and MP4 publishing options. Availability may vary by build.</p>
                    </MotionFadeInOnScroll>
                    <MotionFadeInOnScroll className="feat-card">
                        <div className="feat-icon orange">🆓</div>
                        <div className="feat-title">Open source</div>
                        <p className="feat-desc">The source code, build guides, and issue tracker are available on GitHub.</p>
                    </MotionFadeInOnScroll>
                </div>
            </div>
        </section>

    )
}

export default Features
