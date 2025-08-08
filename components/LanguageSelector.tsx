'use client';

import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation, Language } from '@/hooks/useTranslation';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' },
];

export function LanguageSelector() {
  const { language, changeLanguage } = useTranslation();

  return (
    <Select value={language} onValueChange={changeLanguage}>
      <SelectTrigger className="w-[140px] h-9">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}