import {
  IconBrandLinkedin,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterV2() {
  return (
    <footer className="w-full bg-white text-gray-600 border-t  px-6 md:px-16  border-gray-200">
      
      {/* Top Row */}
      <div className="flex items-center justify-between  py-4">
        
        {/* Left Logo */}

        <div>

               <Link href="/">
          <Image
             src="/zareblacklogo.svg"
               width={150}
                height={30}
            alt="Zare Logo"
            // className="w-28"
          />
        </Link>
        <div className=' px-2 text-sm'>
            Delivering Excellence
        </div>

        </div>
     

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-400">
          <Link  href="https://www.linkedin.com/company/zare-innovations" className="hover:text-primary transition">
            <IconBrandLinkedin size={30} />
          </Link>
          {/* <Link href="#" className="hover:text-primary transition">
            <IconBrandX size={22} />
          </Link>
          <Link href="#" className="hover:text-primary transition">
            <IconBrandInstagram size={22} />
          </Link>
          <Link href="#" className="hover:text-primary transition">
            <IconBrandFacebook size={22} />
          </Link> */}
        </div>
      </div>

      {/* Bottom text */}
      

        
               <div className=" text-sm text-center text-gray-800 py-6 border-t border-gray-300">
        © {new Date().getFullYear()} Zare Innovations | All Rights Reserved
      </div>

       
   
    </footer>
  );
}
