import tcos_logo from './TCOS_logo.png'
import hiddensaloonlogo from './hiddensaloonlogo.svg'
import layer_top from './layertop.svg'
import layer_mid from './layermid.svg'
import layer_bottom from './layerbottom.svg'
import tiktok from './Tiktok_icon.png'

// --- Product Images Import ---
import shirt_banner from './photo/shirt/shirt_banner.JPG'
import shirt1 from './photo/shirt/shirt1.JPG'
import shirt2 from './photo/shirt/shirt2.JPG'
import shirt3 from './photo/shirt/shirt3.JPG'

import blanket_banner from './photo/blanket/blanket_banner.JPG'
import blanket1 from './photo/blanket/blanket1.JPG'
import blanket2 from './photo/blanket/blanket2.JPG'

import bandanas_banner from './photo/bandanas/bandanas_banner.JPG'
import bandanas1 from './photo/bandanas/bandanas1.JPG'
import bandanas2 from './photo/bandanas/bandanas2.JPG'

import umbrella_banner from './photo/umbrella/umbrella_banner.JPG'
import umbrella1 from './photo/umbrella/umbrella1.JPG'
import umbrella2 from './photo/umbrella/umbrella2.JPG'

import keychains1 from './photo/keychains/keychains1.JPG'
import keychains2 from './photo/keychains/keychains2.JPG'
import keychains3 from './photo/keychains/keychains3.JPG'
import keychains_banner from './photo/keychains/keychains_banner.JPG'

import cardholder1 from './photo/cardholder/cardholder1.JPG'
import cardholder2 from './photo/cardholder/cardholder2.JPG'
import cardholder_banner from './photo/cardholder/cardholder_banner.JPG'

export const assets = {
    tcos_logo,
    hiddensaloonlogo,
    layer_bottom,
    layer_mid,
    layer_top,
    tiktok,
}

export const products = [
    {
        _id: "0001",
        name: "T-SHIRT",
        description: "เสื้อยืดเนื้อผ้านุ่ม ใส่สบาย มาพร้อมลวดลายนักดนตรีสุดน่ารักที่บรรเลงเพลงอย่างสนุกสนานในบาร์ The Hidden Saloon ใส่ได้ทุกวัน เพิ่มสีสันให้กับสไตล์ของคุณ",
        price: 259,
        banner: shirt_banner,
        image: [
            shirt1,
            shirt2,
            shirt3,
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    },
    {
        _id: "0002",
        name: "BLANKET",
        description: "ผ้าห่มเนื้อนุ่มที่ออกแบบเป็นพิเศษด้วยลวดลายแผนที่จากละครเวที The Hidden Saloon เพื่อให้ผู้ชมได้สัมผัสทั้งความอบอุ่นทางกาย และความใกล้ชิดกับเนื้อเรื่องมากยิ่งขึ้น",
        price: 499,
        banner: blanket_banner,
        image: [
            blanket1,
            blanket2,
        ],
        sizes: false,
    },
    {
        _id: "0003",
        name: "BANDANAS",
        description: "สะท้อนกลิ่นอายแฟชั่นยุค 60 ผ่านผ้าอเนกประสงค์สองลวดลาย ที่สามารถโพกหัว ผูกกระเป๋า หรือใช้เป็นเครื่องประดับลุค เพื่อเพิ่มเอกลักษณ์ให้กับการแต่งกายของคุณอย่างมีสไตล์",
        price: 189,
        banner: bandanas_banner,
        image: [
            bandanas1,
            bandanas2,
        ],
        sizes: false,
    },
    {
        _id: "0004",
        name: "UMBRELLA",
        description: "ร่มกันยูวีลวดลายเครื่องดนตรีที่สะท้อนบรรยากาศสนุกสนานของแสง สี เสียง และจังหวะดนตรีใน The Hidden Saloon พร้อมปกป้องคุณจากฝนและรังสี UV ได้อย่างมีประสิทธิภาพในทุกวัน",
        price: 100,
        banner: umbrella_banner,
        image: [
            umbrella1,
            umbrella2,
        ],
        sizes: false,
    },
    {
        _id: "0005",
        name: "KEYCHAINS",
        description: "คอลเลกชันถุงสุ่มพวงกุญแจจาก The Hidden Saloon ที่รวบรวมตัวละครน่ารักไว้ถึง 5 แบบ พร้อมเทปอัดเสียงจิ๋วในทุกเซต สำหรับบันทึกข้อความส่งต่อให้คนที่คุณรัก",
        price: 299,
        banner: keychains_banner,
        image: [
            keychains1,
            keychains2,
            keychains3,
        ],
        sizes: false,
    },
    {
        _id: "0006",
        name: "CARDHOLDER",
        description: "ที่ใส่บัตรดีไซน์สนุก มาพร้อมสายคล้อง สะท้อนจังหวะของเสียงเพลงผ่านลวดลายที่ไม่เหมือนใคร ผสมผสานความสวยงามและความบันเทิงของดนตรีไว้ในชิ้นเดียว",
        price: 179,
        banner: cardholder_banner,
        image: [
            cardholder1,
            cardholder2,
        ],
        sizes: false,
    },
]