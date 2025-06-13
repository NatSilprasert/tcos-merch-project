import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import logo from '../assets/hiddensaloonsm.PNG'

const Hero = () => {

    const [showScrollHint, setShowScrollHint] = useState(true);
    const [showHintDom, setShowHintDom] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowHintDom(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollHint(window.scrollY < 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className='relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 select-none'>
            <img className='absolute min-h-screen z-3 h-full w-full object-cover animate-fade-in-delay-3 opacity-0' src={assets.layer_top} alt="" />
            <img className='absolute min-h-screen z-2 h-full w-full object-cover animate-fade-in-delay-2 opacity-0' src={assets.layer_mid} alt="" />
            <img className='absolute min-h-screen z-1 h-full w-full object-cover animate-fade-in-delay-1 opacity-0' src={assets.layer_bottom} alt="" />
            {/* <img className='absolute hidden lg:flex lg:max-w-2/3 z-10 animate-fade-in-delay-4 opacity-0' src={assets.hiddensaloonlogo} alt="" /> */}
            <img className='absolute lg:max-w-1/2 max-w-5/6 z-10 animate-fade-in-delay-4 opacity-0' src={logo} alt="" />
            
            <div className='absolute text-[14px] bottom-40 md:bottom-30 lg:bottom-20 sm:text-[20px] w-8/9 md:w-5/6 lg:w-2/3 z-10 text-center animate-fade-in-delay-5'>
                {showHintDom && (
                    <p className={`transition-all duration-600  ${showScrollHint ? "opacity-100" : "opacity-0"}`}>
                        เมื่อหยาดฝนโปรยปราย ความหลากหลายจึงเริ่มต้นขึ้น ความรักระหว่างคนสองคนถูกถ่ายทอดผ่านท่วงท่า ทำนอง แสงสี และบทเพลงอันไพเราะ สะท้อนมุมมองที่แตกต่างและความหมายลึกซึ้งของตัวตน
                    </p>
                )}
            </div>
            
        </div>
    )
}

export default Hero
