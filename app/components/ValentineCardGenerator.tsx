"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, ArrowLeft, Send } from "lucide-react";

export default function ValentineCardGenerator() {

  const [step,setStep]=useState(1);
  const [recipient,setRecipient]=useState("");
  const [message,setMessage]=useState("");
  const [theme,setTheme]=useState("romantic");
  const [alignment,setAlignment]=useState<"left"|"center"|"right">("center");
  const [font,setFont]=useState("serif");

  const [stickers,setStickers]=useState<
    {id:number;x:number;y:number;emoji:string}[]
  >([]);

  const stickerOptions=["❤️","🌹","⭐","💖","💘","✨","🎀","💐"];

  const addSticker=(emoji:string)=>{
    setStickers(prev=>[
      ...prev,
      {id:Date.now(),x:120,y:120,emoji}
    ]);
  };

  const moveSticker=(id:number,x:number,y:number)=>{
    setStickers(prev =>
      prev.map(s=>s.id===id?{...s,x,y}:s)
    );
  };

  const handleReset=()=>{
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
    setStickers([]);
  };

  /* DOWNLOAD IMAGE */

  const handleDownloadImage=async()=>{
    const html2canvas=(await import("html2canvas")).default;
    const node=document.querySelector("[data-card-inner]") as HTMLElement;
    if(!node) return;

    const canvas=await html2canvas(node,{scale:2});
    const url=canvas.toDataURL();

    const a=document.createElement("a");
    a.href=url;
    a.download="card.png";
    a.click();
  };

  /* DOWNLOAD PDF */

  const handleDownloadPDF=async()=>{
    const html2canvas=(await import("html2canvas")).default;
    const {jsPDF}=await import("jspdf");

    const node=document.querySelector("[data-card-inner]") as HTMLElement;
    if(!node) return;

    const canvas=await html2canvas(node,{scale:2});
    const img=canvas.toDataURL();

    const pdf=new jsPDF({unit:"px",format:[400,500]});
    pdf.addImage(img,"PNG",0,0,400,500);
    pdf.save("card.pdf");
  };

  const handleEmail=()=>{
    window.location.href=`mailto:?subject=Valentine Card&body=${message}`;
  };

  /* ================================================= */

  return (
    <main className="flex flex-col items-center p-6 max-w-6xl mx-auto">

      {/* STEP BAR */}
      <div className="flex gap-8 mb-10">
        {["Personalize","Preview","Send"].map((l,i)=>(
          <div key={i} className={step>=i+1?"font-bold":"text-gray-400"}>
            {i+1}. {l}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step===1&&(
        <div className="grid md:grid-cols-2 gap-10 w-full">

          <div className="flex flex-col gap-4">

            <input
              value={recipient}
              onChange={e=>setRecipient(e.target.value)}
              placeholder="Recipient Name"
              className="p-3 border rounded"
            />

            <textarea
              value={message}
              onChange={e=>setMessage(e.target.value)}
              placeholder="Message"
              className="p-3 border rounded"
            />

            <select value={theme} onChange={e=>setTheme(e.target.value)} className="p-3 border rounded">
              <option value="romantic">Romantic</option>
              <option value="dark">Dark</option>
              <option value="pastel">Pastel</option>
            </select>

            <select value={font} onChange={e=>setFont(e.target.value)} className="p-3 border rounded">
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans</option>
              <option value="cursive">Cursive</option>
            </select>

            <div className="flex gap-2">
              {["left","center","right"].map(a=>(
                <button key={a} onClick={()=>setAlignment(a as any)} className="border p-2 flex-1">
                  {a}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={handleReset} className="border p-3 flex-1">Reset</button>
              <button onClick={()=>setStep(2)} className="bg-black text-white p-3 flex-1">
                Preview →
              </button>
            </div>
          </div>

          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
            font={font}
            stickers={stickers}
            moveSticker={moveSticker}
          />
        </div>
      )}

      {/* STEP 2 */}
      {step===2&&(
        <div className="text-center w-full">

          <h2 className="text-3xl font-bold mb-6">Preview</h2>

          {/* sticker panel */}
          <div className="flex gap-3 justify-center mb-6 flex-wrap">
            {stickerOptions.map(s=>(
              <button key={s} onClick={()=>addSticker(s)} className="text-2xl border px-3 py-2 rounded">
                {s}
              </button>
            ))}
          </div>

          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
            font={font}
            stickers={stickers}
            moveSticker={moveSticker}
          />

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={()=>setStep(1)} className="border px-6 py-3">
              <ArrowLeft/> Back
            </button>

            <button onClick={()=>setStep(3)} className="bg-black text-white px-6 py-3">
              Continue <Send/>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step===3&&(
        <div className="text-center">

          <h2 className="text-3xl font-bold mb-8">Share</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <button onClick={handleDownloadImage} className="border p-6"><Download/> PNG</button>
            <button onClick={handleDownloadPDF} className="border p-6"><FileText/> PDF</button>
            <button onClick={handleEmail} className="border p-6"><Mail/> Email</button>
          </div>
        </div>
      )}
    </main>
  );
}
