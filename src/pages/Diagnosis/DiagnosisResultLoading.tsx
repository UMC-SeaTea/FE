// DiagnosisResultLoading.tsx
import waveBack from "../../assets/Waves/diagnosis_result/wave_back.png";
import waveMiddle from "../../assets/Waves/diagnosis_result/wave_middle.png";
import waveFront from "../../assets/Waves/diagnosis_result/wave_front.png";

export default function DiagnosisResultLoading() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
      

      <style>{`
        @keyframes waveSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes waveMedium {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes waveFast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-28px);
          }
        }
      `}</style>


      <img
        src={waveBack}
        alt=""
        className="
          absolute bottom-0 left-[-300px]
          w-[1200px]
          z-10
        "
        style={{
          animation: "waveSlow 10s ease-in-out infinite",
        }}
      />


      <img
        src={waveMiddle}
        alt=""
        className="
          absolute bottom-[-20px] left-[-200px]
          w-[1200px]
          z-20
        "
        style={{
          animation: "waveMedium 8s ease-in-out infinite",
        }}
      />


      <img
        src={waveFront}
        alt=""
        className="
          absolute bottom-[-40px] left-[-100px]
          w-[1200px]
          z-30
        "
        style={{
          animation: "waveFast 6s ease-in-out infinite",
        }}
      />


      <div className="absolute inset-0 flex items-center justify-center z-40">
        <p className="font-title text-title-4 leading-[28px] text-white">
          Your Tasting Note is …
        </p>
      </div>
    </main>
  );
}
