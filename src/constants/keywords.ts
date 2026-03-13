import type { KeywordCategory } from '../types'

interface CountryKeywords {
  placeholder: string
  categories: KeywordCategory[]
}

export const KEYWORD_BY_COUNTRY: Record<string, CountryKeywords> = {
  KR: {
    placeholder: '립글로스, 쿠션 파운데이션, 선크림',
    categories: [
      { label: '제품', keywords: ['립글로스', '쿠션 파운데이션', '선크림', '마스카라', '컨실러', '세럼'] },
      { label: '이슈', keywords: ['성분 논란', '가품 선크림', '리콜', '올리브영 추천'] },
      { label: '피부 고민', keywords: ['피지', '블랙헤드', '속건조', '모공', '여드름', '다크서클'] },
      { label: '트렌드', keywords: ['글래스 스킨', '물광 메이크업', 'GRWM', '데일리 메이크업'] },
    ],
  },
  US: {
    placeholder: 'lip gloss, sunscreen, foundation',
    categories: [
      { label: 'Products', keywords: ['lip gloss', 'sunscreen', 'foundation', 'mascara', 'concealer', 'serum'] },
      { label: 'Issues', keywords: ['fake suncream', 'cosmetic skin problem', 'dupe', 'clean beauty'] },
      { label: 'Skin', keywords: ['oily skin', 'blackhead', 'dry skin', 'acne', 'dark circles'] },
      { label: 'Trends', keywords: ['glass skin', 'clean girl makeup', 'GRWM', 'skinimalism', 'K-beauty'] },
    ],
  },
  JP: {
    placeholder: 'リップ, 日焼け止め, ファンデーション',
    categories: [
      { label: '製品', keywords: ['リップ', '日焼け止め', 'ファンデーション', 'マスカラ', 'コンシーラー'] },
      { label: '悩み', keywords: ['毛穴', 'ニキビ', '乾燥肌', 'くすみ', 'テカリ'] },
      { label: 'トレンド', keywords: ['GRWM', '韓国コスメ', 'プチプラ', 'デパコス', '垢抜け'] },
    ],
  },
  TH: {
    placeholder: 'ลิปกลอส, กันแดด, รองพื้น',
    categories: [
      { label: 'สินค้า', keywords: ['ลิปกลอส', 'กันแดด', 'รองพื้น', 'มาสคาร่า', 'คอนซีลเลอร์'] },
      { label: 'เทรนด์', keywords: ['K-beauty', 'glass skin', 'GRWM', 'แต่งหน้าเดลี่'] },
    ],
  },
  TW: {
    placeholder: '唇蜜, 防曬, 粉底',
    categories: [
      { label: '產品', keywords: ['唇蜜', '防曬', '粉底', '睫毛膏', '遮瑕'] },
      { label: '趨勢', keywords: ['韓系妝容', '玻璃肌', 'GRWM', '日常妝容', '開架'] },
    ],
  },
  VN: {
    placeholder: 'son bóng, kem chống nắng, kem nền',
    categories: [
      { label: 'Sản phẩm', keywords: ['son bóng', 'kem chống nắng', 'kem nền', 'mascara', 'serum'] },
      { label: 'Xu hướng', keywords: ['K-beauty', 'glass skin', 'GRWM', 'makeup hàng ngày'] },
    ],
  },
  ID: {
    placeholder: 'lip gloss, sunscreen, foundation',
    categories: [
      { label: 'Produk', keywords: ['lip gloss', 'sunscreen', 'foundation', 'maskara', 'serum'] },
      { label: 'Tren', keywords: ['K-beauty', 'glass skin', 'GRWM', 'makeup natural', 'skincare routine'] },
    ],
  },
  FR: {
    placeholder: 'gloss, crème solaire, fond de teint',
    categories: [
      { label: 'Produits', keywords: ['gloss', 'crème solaire', 'fond de teint', 'mascara', 'sérum'] },
      { label: 'Tendances', keywords: ['glass skin', 'clean girl', 'GRWM', 'K-beauty', 'skincare'] },
    ],
  },
}

export const DEFAULT_KEYWORDS = KEYWORD_BY_COUNTRY['KR']
