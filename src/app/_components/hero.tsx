import { Button, Stack } from '@mantine/core'
import Image from 'next/image'
import Hero1 from "./hero1.png"
import Hero2 from "./hero2.png"
import Hero3 from "./hero3.png"
import Link from 'next/link'

export default function Hero() {
  return (
    <Stack className='h-full w-full flex items-center justify-center gap-8'>
        <Image src={Hero1.src} alt="Hero image" width={200} height={200} className='-mb-16 ml-6'/>
        <Image src={Hero2.src} alt="Hero image" width={200} height={200} className='-mb-24 ml-auto mr-6'/>
        <p className='text-7xl w-[80%] font-bold text-center mx-auto'>Revolutionize Your Business with <span className='text-cyan-500'> Zare Innovations</span></p>
        <Image src={Hero3.src} alt="Hero image" width={200} height={200} className='-mb-28 ml-auto mr-6'/>
        <p className='w-[80%] mx-auto text-center text-xl'>Elevate your business with our diverse BPO services tailored to perfection – where quality meets affordability.</p>
        <Link className='w-fit mx-auto' href="/#aboutUs"><Button  size='lg'>Learn More</Button></Link>
    </Stack>
  )
}
