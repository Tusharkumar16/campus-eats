import { ImageResponse } from "next/og";

type IconOptions = {
  size: number;
  labelSize: number;
};

export function renderPwaIcon({ size, labelSize }: IconOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top right, #34d399 0%, #0f172a 55%, #020617 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: size * 0.06,
            borderRadius: size * 0.18,
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: size * 0.03,
          }}
        >
          <div
            style={{
              width: size * 0.34,
              height: size * 0.34,
              borderRadius: size * 0.08,
              background: "rgba(255,255,255,0.12)",
              border: "2px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: size * 0.16,
              fontWeight: 700,
            }}
          >
            CE
          </div>
          <div
            style={{
              fontSize: labelSize,
              fontWeight: 700,
              letterSpacing: size * 0.01,
            }}
          >
            Campus Eats
          </div>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
