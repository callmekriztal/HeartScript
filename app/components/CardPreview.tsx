"use client";

interface Props {
  recipient: string;
  message: string;
  theme: string;
  alignment: "left" | "center" | "right";
  font: string;
  stickers: { id:number; x:number; y:number; emoji:string }[];
  moveSticker:(id:number,x:number,y:number)=>void;
}

export default function CardPreview({
  recipient,
  message,
  theme,
  alignment,
  font,
  stickers,
  moveSticker
}: Props) {

  const themeStyles: Record<string,string> = {
    romantic:"bg-gradient-to-br from-pink-500 via-rose-500 to-[#800020]",
    dark:"bg-gradient-to-br from-gray-800 via-gray-900 to-black",
    pastel:"bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"
  };

  const alignmentClasses = {
    left:"items-start text-left",
    center:"items-center text-center",
    right:"items-end text-right"
  };

  return (
    <div className="relative flex items-center justify-center min-h-[520px] w-full">

      {/* glow blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-16 right-16 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-16 left-16 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:2s]" />
      </div>

      {/* glass container */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-xl">

        <h3 className="text-center text-xs tracking-[0.25em] text-gray-500 font-semibold mb-6">
          VALENTINE CARD PREVIEW
        </h3>

        {/* CARD */}
        <div
          data-card-inner
          className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl"
        >

          {/* theme */}
          <div className="absolute inset-0">
            <div className={`absolute inset-0 ${themeStyles[theme]}`} />
          </div>

          {/* dots */}
          <div className="absolute inset-0 opacity-15 dots-overlay" />

          {/* content */}
          <div
            className={`absolute inset-0 flex flex-col justify-center text-white px-8 py-10 ${alignmentClasses[alignment]}`}
          >
            <div className="mb-5 text-3xl">❤️</div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug">
              Dear{" "}
              <span className="italic underline decoration-rose-200 underline-offset-4">
                {recipient || "Someone Special"}
              </span>,
            </h2>

            <p
              style={{ fontFamily: font }}
              className="mt-5 text-base opacity-95 leading-relaxed max-w-xs"
            >
              {message || "Your beautiful message will appear here..."}
            </p>

            <div className="italic text-xl mt-6">With Love ✨</div>
          </div>

          {/* STICKERS */}
          {stickers.map(sticker=>(
            <div
              key={sticker.id}
              onMouseDown={(e)=>{
                e.preventDefault();

                const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();

                const startX = e.clientX;
                const startY = e.clientY;

                const startLeft = sticker.x;
                const startTop = sticker.y;

                const move = (ev:MouseEvent)=>{
                  const dx = ev.clientX - startX;
                  const dy = ev.clientY - startY;

                  let x = startLeft + dx;
                  let y = startTop + dy;

                  x = Math.max(0, Math.min(x, rect.width-40));
                  y = Math.max(0, Math.min(y, rect.height-40));

                  moveSticker(sticker.id,x,y);
                };

                const stop = ()=>{
                  window.removeEventListener("mousemove",move);
                  window.removeEventListener("mouseup",stop);
                };

                window.addEventListener("mousemove",move);
                window.addEventListener("mouseup",stop);
              }}
              style={{
                position:"absolute",
                left:sticker.x,
                top:sticker.y,
                fontSize:"32px",
                cursor:"grab",
                userSelect:"none"
              }}
            >
              {sticker.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
