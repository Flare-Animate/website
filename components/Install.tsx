"use client";

import { useEffect, useState } from "react";

type Channel = "stable" | "nightly";
type Platform = "windows" | "macos" | "linux" | "android" | "unknown";
type Architecture = "arm64" | "x64";
type Status = "loading" | "ready" | "unavailable" | "error";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  name: string | null;
  tag_name: string;
  assets: ReleaseAsset[];
};

function getDeviceInfo(): { platform: Platform; architecture: Architecture } {
  const userAgent = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  const platform: Platform = /android/.test(userAgent)
    ? "android"
    : /windows/.test(userAgent)
      ? "windows"
      : /macintosh|mac os/.test(userAgent)
        ? "macos"
        : /linux/.test(userAgent)
          ? "linux"
          : "unknown";

  return {
    platform,
    architecture: /arm64|aarch64|arm\b/.test(userAgent) ? "arm64" : "x64",
  };
}

function findDownload(
  release: GitHubRelease,
  platform: Platform,
  architecture: Architecture,
): ReleaseAsset | undefined {
  const extensions: Record<Exclude<Platform, "unknown">, string[]> = {
    windows: [".msi", "-portable.zip"],
    macos: [".dmg"],
    linux: [".appimage", ".deb", ".rpm", ".flatpak", ".tar.gz"],
    android: [".apk"],
  };

  if (platform === "unknown") {
    return undefined;
  }

  if (platform === "android") {
    return (
      release.assets.find((asset) =>
        asset.name.toLowerCase().endsWith("flare-android-universal.apk"),
      ) ||
      release.assets.find((asset) =>
        asset.name
          .toLowerCase()
          .includes(
            architecture === "arm64"
              ? "flare-android-arm64-v8a.apk"
              : "flare-android-x86_64.apk",
          ),
      )
    );
  }

  const assets = release.assets.filter((asset) =>
    asset.name.toLowerCase().includes(`-${platform}-${architecture}`),
  );
  const preferred = extensions[platform].map((extension) =>
    assets.find((asset) => asset.name.toLowerCase().endsWith(extension)),
  );

  return preferred.find((asset) => asset !== undefined);
}

export default function Install() {
  const [channel, setChannel] = useState<Channel>("stable");
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [architecture, setArchitecture] = useState<Architecture>("x64");
  const [status, setStatus] = useState<Status>("loading");
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [download, setDownload] = useState<ReleaseAsset | undefined>();

  useEffect(() => {
    let active = true;
    const device = getDeviceInfo();
    setPlatform(device.platform);
    setArchitecture(device.architecture);
    setStatus("loading");
    setRelease(null);
    setDownload(undefined);

    const endpoint =
      channel === "nightly"
        ? "https://api.github.com/repos/Flare-Animate/Flare/releases/tags/nightly"
        : "https://api.github.com/repos/Flare-Animate/Flare/releases/latest";

    async function loadRelease() {
      try {
        const response = await fetch(endpoint, {
          headers: { Accept: "application/vnd.github+json" },
        });

        if (response.status === 404) {
          if (active) {
            setStatus("unavailable");
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}`);
        }

        const latestRelease = (await response.json()) as GitHubRelease;
        const asset = findDownload(
          latestRelease,
          device.platform,
          device.architecture,
        );

        if (active) {
          setRelease(latestRelease);
          setDownload(asset);
          setStatus(asset ? "ready" : "unavailable");
        }
      } catch (error) {
        console.error("Could not load Flare release information.", error);
        if (active) {
          setStatus("error");
        }
      }
    }

    void loadRelease();
    return () => {
      active = false;
    };
  }, [channel]);

  const releasePage =
    channel === "nightly"
      ? "https://github.com/Flare-Animate/Flare/releases/tag/nightly"
      : "https://github.com/Flare-Animate/Flare/releases";
  const platformName =
    platform === "macos"
      ? "macOS"
      : platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <section id="install">
      <div className="container">
        <span className="section-label">Downloads</span>
        <h2>Get Flare</h2>
        <p className="section-desc">
          Choose a release channel to find a build for your device. Nightly
          builds may be unstable and can change frequently.
        </p>

        <div className="release-options" role="group" aria-label="Release channel">
          <label className="release-option">
            <input
              type="radio"
              name="release-channel"
              value="stable"
              checked={channel === "stable"}
              onChange={() => setChannel("stable")}
            />
            Latest stable
          </label>
          <label className="release-option">
            <input
              type="radio"
              name="release-channel"
              value="nightly"
              checked={channel === "nightly"}
              onChange={() => setChannel("nightly")}
            />
            Nightly
          </label>
        </div>

        <div className="release-download" aria-live="polite">
          {status === "loading" && <p>Checking for the latest {channel} build…</p>}
          {status === "ready" && release && download && (
            <>
              <p>
                {release.name || release.tag_name} · {platformName} (
                {architecture})
              </p>
              <a className="btn btn-primary" href={download.browser_download_url}>
                Download {download.name}
              </a>
            </>
          )}
          {status === "unavailable" && (
            <p>
              {release
                ? `No ${platformName} build is listed for this release.`
                : channel === "stable"
                  ? "There is no stable release available yet."
                  : "Release information is not available right now."}{" "}
              Choose another channel or browse the release files.
            </p>
          )}
          {status === "error" && (
            <p>
              Could not check GitHub for release information. You can browse
              release files directly.
            </p>
          )}
        </div>

        <div className="release-links">
          <a href={releasePage} target="_blank" rel="noreferrer">
            Browse {channel} release files on GitHub →
          </a>
          <a
            href="https://flare-animate.github.io/Flare/"
            target="_blank"
            rel="noreferrer"
          >
            Try the web version →
          </a>
        </div>

        <div className="build-guides">
          <h3>Build from source</h3>
          <p>
            Prefer to compile Flare yourself? Follow the guide for your
            platform.
          </p>
          <div className="build-guide-links">
            <a href="https://github.com/Flare-Animate/Flare/blob/HEAD/docs/how_to_build_win.md" target="_blank" rel="noreferrer">Windows</a>
            <a href="https://github.com/Flare-Animate/Flare/blob/HEAD/docs/how_to_build_macosx.md" target="_blank" rel="noreferrer">macOS</a>
            <a href="https://github.com/Flare-Animate/Flare/blob/HEAD/docs/how_to_build_linux.md" target="_blank" rel="noreferrer">Linux</a>
            <a href="https://github.com/Flare-Animate/Flare/blob/HEAD/docs/how_to_build_bsd.md" target="_blank" rel="noreferrer">BSD</a>
          </div>
        </div>
      </div>
    </section>
  );
}
