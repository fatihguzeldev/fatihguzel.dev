import { Stage } from '../../components/stage/stage'
import youtube from '../../assets/social/youtube.svg'
import twitter from '../../assets/social/twitter.svg'
import linkedin from '../../assets/social/linkedin.svg'
import mail from '../../assets/social/mail.svg'
import './intro.css'

export const title = 'Fatih Güzel'

const contacts = [
  {
    platform: 'youtube',
    icon: youtube,
    href: 'https://www.youtube.com/@fatihlovestosimplify',
    text: 'youtube.com/@fatihlovestosimplify',
  },
  {
    platform: 'twitter',
    icon: twitter,
    href: 'https://x.com/fatihguzeldev',
    text: 'x.com/fatihguzeldev',
  },
  {
    platform: 'linkedin',
    icon: linkedin,
    href: 'https://www.linkedin.com/in/fatih-guzel',
    text: 'linkedin.com/in/fatih-guzel',
  },
  {
    platform: 'mail',
    icon: mail,
    href: 'mailto:hello@fatihguzel.dev',
    text: 'hello@fatihguzel.dev',
  },
] as const

export default function Intro() {
  return (
    <Stage number={2} className="lecture-profile">
      <div className="profile-layout">
        <div className="profile-person">
          <h1 className="lecture-underline profile-name">Fatih Güzel</h1>
          <ul className="profile-interests">
            <li>distributed systems</li>
            <li>databases</li>
            <li>systems programming</li>
            <li>ai infrastructure &amp; systems</li>
          </ul>
        </div>
        <ul className="profile-links">
          {contacts.map((contact) => (
            <li key={contact.platform}>
              <a href={contact.href}>
                <span className={`profile-icon profile-icon-${contact.platform}`}>
                  <img src={contact.icon.src} alt={contact.platform} />
                </span>
                <span>{contact.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  )
}
