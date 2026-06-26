export type FieldMotion = 'none' | 'subtle' | 'glow' | 'lift'

export function getFieldMotionClass(fieldMotion: FieldMotion = 'subtle') {
  if (fieldMotion === 'none') return ''

  return `auralith-field-motion-${fieldMotion}`
}
