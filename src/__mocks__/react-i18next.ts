export const useTranslation = () => ({
  t: (key: string) => {
    // Return specific translations for known keys to make tests more realistic
    const translations: Record<string, string> = {
      applicationTitle: 'Social Support Application',
      step: 'Step',
      step1: 'Personal Information',
      step2: 'Family Financial Information',
      step3: 'Situation Description',
      name: 'Name',
      nationalId: 'National ID',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      address: 'Address',
      city: 'City',
      state: 'State',
      country: 'Country',
      phone: 'Phone',
      email: 'Email',
      next: 'Next',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      language: 'Language',
    };
    return translations[key] || key;
  },
  i18n: {
    language: 'en',
    dir: () => 'ltr',
    changeLanguage: jest.fn(),
  },
});

export const Trans = ({ children }: { children: React.ReactNode }) => children;

export default {
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
  t: (key: string) => key,
};