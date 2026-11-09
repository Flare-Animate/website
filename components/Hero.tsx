import React from 'react'
import Ruler from './Ruler'
import { IoArrowDownOutline } from 'react-icons/io5'

function Hero() {
  return (
    <div className="hero relative min-h-[86vh] pt-20 pb-15 px-6 flex items-center justify-center text-center  overflow-hidden">
    {/* <div className="hero-bg absolute inset-0 z-0 "></div> */}
    <div className="hero-content relative z-2 max-w-190 ">
      <span className="eyebrow fade-in">Open-source animation editor</span>
      <h1 className="fade-in delay-1">Animation tools,<br/><span className="hl">built in the open.</span></h1>
      <p className="hero-sub fade-in delay-2">
        Flare is an animation editor in active development. Try the web version
        or check the available desktop builds; features and stability may change.
      </p>
      <div className="btn-group fade-in delay-3">
        <a href="https://flare-animate.github.io/Flare/" target="_blank" rel="noreferrer" className="btn btn-primary">Try the web version</a>
        <a href="#install" className="btn btn-ghost"><IoArrowDownOutline /> Desktop downloads</a>
        <a href="https://github.com/Flare-Animate/Flare" target="_blank" rel="noreferrer" className="btn btn-orange">View on GitHub</a>
      </div>
    </div>

    {/* <!-- Decorative timeline ruler --> */}
    {/* <div className="hero-ruler absolute h-9.5 flex items-center py-0 px-5 bg-(--panel2) border-t border-t-(--border) overflow-hidden z-1 bottom-0 left-0 right-0" id="ruler"></div> */}
  <Ruler />
  </div>

  )
}

export default Hero