import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#193026",
          borderRadius: "50%",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 8c5 0 8 3.5 8 8.5S21 24 16 24c-1.8 0-3.3-.5-4.5-1.3C10 21.6 9 19.5 9 17c0-5 3-9 7-9Z"
            fill="#b9d3c3"
          />
          <path d="M16 10.5V22" stroke="#193026" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="16" cy="18.5" r="1.6" fill="#e6a838" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
