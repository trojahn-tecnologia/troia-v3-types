/**
 * Validation Utilities
 * Funções de validação compartilhadas entre Gateway e Backend
 */
/**
 * Phone Number Validation Result
 */
export interface PhoneValidationResult {
    isValid: boolean;
    formattedPhone?: string;
    countryCode?: string;
    areaCode?: string;
    number?: string;
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
export declare function validatePhone(phone: string | undefined): PhoneValidationResult;
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
export declare function extractPhoneFromJid(jid: string | undefined): string | undefined;
