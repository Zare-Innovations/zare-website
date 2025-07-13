import { Jobs } from "./_components/jobs";


export default function Careers() {
    return (
        <div className="mt-[2.9rem]  clip-diagonal bg-[#F0FDFA] font-gotham" style={{ clipPath: "polygon(5rem 0, 100% 0, 100% 100%, 0 100%, 0 2.5rem)" }}>
            <h1 className="text-[1.5rem]   md:text-[2.8rem] font-black text-center leading-tight tracking-wide  md:pt-4  pb-4 pt-10">
                OUR CURRENT <span className="text-[#00A9AB]">OPENINGS</span>
            </h1>
            <div className="px-12 pt-4 pb-12 ">
                <Jobs />
            </div>

        </div>

    )
}



