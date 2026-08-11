/**
 * Sends a clip to the browser's own fullscreen player.
 *
 * Preferred over a custom modal for video: the native player already has the
 * scrubber, the exit affordance and the keyboard handling, and it actually fills
 * the screen. A modal cannot promise that here — these cards animate on hover, so
 * they carry a transform, and a transformed ancestor becomes the containing block
 * for any `position: fixed` child, which traps an overlay inside the card.
 *
 * Controls are switched on for the duration and off again on exit, so the inline
 * card keeps its clean autoplaying frame.
 */
export function playFullscreen(video: HTMLVideoElement | null) {
  if (!video) return;

  video.controls = true;

  const restore = () => {
    if (document.fullscreenElement) return;
    video.controls = false;
    document.removeEventListener("fullscreenchange", restore);
  };
  document.addEventListener("fullscreenchange", restore);

  // iOS Safari does not implement requestFullscreen on arbitrary elements, but
  // video carries its own entry point.
  const legacy = video as HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
  };

  const request = video.requestFullscreen?.();

  if (request) {
    request.catch(() => {
      legacy.webkitEnterFullscreen?.();
    });
  } else {
    legacy.webkitEnterFullscreen?.();
  }

  video.play().catch(() => {});
}
