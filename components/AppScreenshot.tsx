import Image from "next/image";

export default function AppScreenshot() {
  return (
    <div className="mockup-wrap">
      <figure className="app-window">
        <Image
          src="/flare-screenshot.png"
          alt="Flare's animation editor showing its canvas, tools, timeline, and properties panel."
          width={1912}
          height={948}
          priority
          className="app-screenshot"
        />
        <figcaption className="screenshot-caption">
          Screenshot of Flare&apos;s animation editor
        </figcaption>
      </figure>
    </div>
  );
}
