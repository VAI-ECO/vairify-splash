import protonMail from '../assets/logos/proton-mail.svg'
import complyCube from '../assets/logos/comply-cube.svg'
import azure from '../assets/logos/azure.svg'
import swissMade from '../assets/logos/swiss-made.svg'
import twilio from '../assets/logos/twilio.svg'
import textnow from '../assets/logos/textnow.svg'
import soc2Blue from '../assets/logos/soc2-blue.svg'
import iso27001 from '../assets/logos/iso27001.svg'
import mongodb from '../assets/logos/mongodb.svg'
import square from '../assets/logos/square.svg'
import idenfy from '../assets/logos/idenfy.svg'
import zeroKnowledge from '../assets/logos/zero-knowledge.svg'
import chainpassFull from '../assets/logos/chainpass-logo-full.svg'

export const heroBadges = [
  { name: 'Proton Mail', logo: protonMail },
  { name: 'ChainPass', logo: complyCube },
  { name: 'Microsoft Azure', logo: azure },
  { name: 'Swiss Made Hosting', logo: swissMade },
  { name: 'Twilio', logo: twilio },
  { name: 'TextNow', logo: textnow },
  { name: 'SOC 2', logo: soc2Blue },
  { name: 'ISO 27001', logo: iso27001 },
]

export const footerBadges = [
  ...heroBadges,
  { name: 'ComplyCube', logo: chainpassFull },
  { name: 'MongoDB', logo: mongodb },
  { name: 'Square', logo: square },
  { name: 'iDenfy', logo: idenfy },
  { name: 'Zero-Knowledge Architecture', logo: zeroKnowledge, featured: true },
]
