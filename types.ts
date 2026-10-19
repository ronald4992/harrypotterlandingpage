export type HouseId = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface HouseInfo {
  id: HouseId;
  name: string;
  spanishName: string;
  colors: string;
  accentHex: string;
  borderHex: string;
  crestEmoji: string;
  animal: string;
  element: string;
  founder: string;
  ghost: string;
  traits: string[];
  motto: string;
  description: string;
}

export interface Benefit {
  id: string;
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  spellTip: string;
}

export interface AdmissionApplication {
  id?: string;
  fullName: string;
  age: number;
  pet: 'lechuza' | 'gato' | 'sapo' | 'rata';
  preferredHouse: HouseId | 'indiferente';
  address: string;
  timestamp?: string;
}

export interface AdmissionResponse {
  success: boolean;
  message: string;
  letter: {
    recipient: string;
    location: string;
    deliveryMethod: string;
    acceptedTerms: string[];
    deputyHeadmistress: string;
    platform: string;
    termStart: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  house: HouseId;
  content: string;
  favoriteSpell: string;
  stars: number;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admisiones' | 'Vida en Hogwarts' | 'Materiales' | 'Seguridad';
}

export interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  options: {
    text: string;
    house: HouseId;
    trait: string;
  }[];
}

export interface QuizResult {
  house: HouseId;
  houseName: string;
  traits: string[];
  congratulation: string;
}

export interface SpellItem {
  name: string;
  pronunciation: string;
  category: 'Encantamiento' | 'Defensa' | 'Transformación' | 'Iluminación';
  effect: string;
  soundType: 'lumos' | 'patronus' | 'leviosa' | 'alohomora';
}

export interface NewsletterPayload {
  email: string;
  owlChoice: 'flecha' | 'lechuza-real' | 'pigmeo';
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  dispatchTime: string;
}
