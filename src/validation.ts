/**
 * Validation Utilities
 * Funções de validação compartilhadas entre Gateway e Backend
 */

/**
 * Phone Number Validation Result
 */
export interface PhoneValidationResult {
  isValid: boolean;
  formattedPhone?: string;  // DDI+DDD+NUMERO (somente números)
  countryCode?: string;     // DDI extraído
  areaCode?: string;        // DDD extraído
  number?: string;          // NUMERO extraído
  error?: string;
}

/**
 * Valida e formata telefone no padrão internacional
 *
 * REGRAS:
 * - Somente números (remove +, -, espaços, parênteses)
 * - Formato: DDI+DDD+NUMERO
 * - DDI Brasil: 55
 * - DDD: 2 dígitos
 * - NUMERO: 8 ou 9 dígitos
 *
 * @param phone - Telefone para validar
 * @returns PhoneValidationResult
 *
 * @example
 * validatePhone("+55 (47) 99223-9929") // ✅ Valid: "5547992239929"
 * validatePhone("47992239929")          // ❌ Invalid: Missing DDI
 * validatePhone("5547992239929")        // ✅ Valid: "5547992239929"
 */
export function validatePhone(phone: string | undefined): PhoneValidationResult {
  // Null/undefined check
  if (!phone || phone.trim() === '') {
    return {
      isValid: false,
      error: 'Phone number is required'
    };
  }

  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');

  // Validação de comprimento mínimo
  if (cleanPhone.length < 12) {
    return {
      isValid: false,
      error: 'Phone number too short. Format: DDI+DDD+NUMBER (min 12 digits)'
    };
  }

  // Validação de comprimento máximo
  if (cleanPhone.length > 15) {
    return {
      isValid: false,
      error: 'Phone number too long. Format: DDI+DDD+NUMBER (max 15 digits)'
    };
  }

  // Validação específica para Brasil (DDI 55)
  if (cleanPhone.startsWith('55')) {
    // Brasil: 55 + DDD (2 dígitos) + Número (8 ou 9 dígitos)
    const expectedLength = [12, 13]; // 55 + 2 + 8 ou 55 + 2 + 9

    if (!expectedLength.includes(cleanPhone.length)) {
      return {
        isValid: false,
        error: 'Invalid Brazilian phone number. Format: 55+DDD+NUMBER (12-13 digits total)'
      };
    }

    const countryCode = cleanPhone.substring(0, 2);    // 55
    const areaCode = cleanPhone.substring(2, 4);       // DDD
    const number = cleanPhone.substring(4);            // Número

    return {
      isValid: true,
      formattedPhone: cleanPhone,
      countryCode,
      areaCode,
      number
    };
  }

  // Validação genérica para outros países
  // Assume DDI de 1-3 dígitos + restante do número
  return {
    isValid: true,
    formattedPhone: cleanPhone
  };
}

/**
 * Extrai phone do WhatsApp JID
 *
 * IMPORTANTE: Funciona APENAS com JID, NÃO com LID
 *
 * @param jid - WhatsApp JID (e.g., "5547992239929@s.whatsapp.net")
 * @returns Phone number ou undefined se não puder extrair
 *
 * @example
 * extractPhoneFromJid("5547992239929@s.whatsapp.net") // "5547992239929"
 * extractPhoneFromJid("213782781983172@lid")           // undefined (LID não tem phone)
 */
export function extractPhoneFromJid(jid: string | undefined): string | undefined {
  if (!jid) return undefined;

  // LID não contém phone number
  if (jid.includes('@lid')) {
    return undefined;
  }

  // Extrair phone de JID
  const phoneMatch = jid.match(/^(\d+)@/);
  return phoneMatch ? phoneMatch[1] : undefined;
}
