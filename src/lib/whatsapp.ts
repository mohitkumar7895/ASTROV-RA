/**
 * Helper to generate WhatsApp links with clean text encoding
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  // Strip non-digits from phone
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function getAstrologerWhatsApp(questionOrProblem?: string, customText?: string): string {
  const astrologerNumber = '919630620240';
  let message = 'Namaste Pandit Puneet Dwivedi Ji, I would like to seek your astrological guidance.';
  if (questionOrProblem) {
    message = `Namaste Pandit Puneet Dwivedi Ji, I need guidance regarding: "${questionOrProblem}". Please let me know how to proceed with a consultation.`;
  } else if (customText) {
    message = customText;
  }
  return buildWhatsAppLink(astrologerNumber, message);
}

export function getClientWhatsAppLink(phone: string, clientName: string, bookingRef: string, serviceName?: string): string {
  const message = `Namaste ${clientName}, this is from ASTROVÈRA regarding your consultation enquiry #${bookingRef} (${serviceName || 'Astrology Consultation'}). We would like to confirm your preferred time slot.`;
  return buildWhatsAppLink(phone, message);
}

export function getClassesWhatsAppUrl(): string {
  const astrologerNumber = '919630620240';
  const message = 'Namaste Pandit Puneet Dwivedi Ji, I want to learn Vedic Astrology and Hindu Scriptures from you. Please share details about the online classes, syllabus (Kundli, Navagrahas, Bhagavad Gita, Puranas), batch schedule, and fee structure.';
  return buildWhatsAppLink(astrologerNumber, message);
}
