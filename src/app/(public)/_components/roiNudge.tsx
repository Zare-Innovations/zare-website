import { Button } from "@mantine/core";
import Image from "next/image";
import ZareEstimatorModal from "./calculator-modal";

export default function RoiNudge() {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  items-center px-6">
        {/* LEFT IMAGE */}
        <div className="w-full flex justify-center">
          <div className=" rounded-xl overflow-hidden">
            <Image
              src="/rio.svg"
              alt="ROI Calculator Preview"
              width={600}
              height={400}
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            <span className="text-[#00A7CF]">COMPARE RATES</span> ACROSS BPO’S
            AND <span className="text-[#00A7CF]">HIRE SMARTER</span> WITH ZARE’S
            ROI CALCULATOR
          </h2>

          <p className="text-gray-600 max-w-lg leading-relaxed">
            Use Zare Insider to compare rates against competitive BPOs and help
            you understand the value and quality we give you for every single
            penny.
          </p>

          {/* <Button variant="outline" className="px-6 py-4 text-base font-semibold">
            Try Zare’s ROI Calculator Now
          </Button> */}
          <ZareEstimatorModal title=" Try Zare’s ROI Calculator Now"/>
        </div>
      </div>
    </section>
  );
}
