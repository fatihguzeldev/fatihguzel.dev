import youtube from '../../assets/social/youtube.svg'
import browser from '../../assets/social/browser.svg'
import github from '../../assets/social/github.svg'
import twitter from '../../assets/social/twitter.svg'
import linkedin from '../../assets/social/linkedin.svg'
import mail from '../../assets/social/mail.svg'
import { Stage } from '../../components/stage/stage'
import './profile.css'

export const title = 'Fatih Güzel'

const contacts = [
  {
    platform: 'youtube',
    icon: youtube,
    href: 'https://www.youtube.com/@fatihlovestosimplify',
    text: 'youtube.com/@fatihlovestosimplify',
  },
  {
    platform: 'website',
    icon: browser,
    href: 'https://fatihguzel.dev',
    text: 'fatihguzel.dev',
  },
  {
    platform: 'github',
    icon: github,
    href: 'https://github.com/fatihguzeldev',
    text: 'github.com/fatihguzeldev',
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

export default function ProfileScene() {
  return (
    <Stage frameId="profile">
      <div className="chess-profile">
        <div className="chess-profile-person">
          <h1>Fatih Güzel</h1>
          <ul className="chess-profile-interests">
            <li>distributed systems</li>
            <li>databases</li>
            <li>systems programming</li>
            <li>ai infrastructure &amp; systems</li>
          </ul>
        </div>
        <ul className="chess-profile-links">
          {contacts.map((contact) => (
            <li key={contact.platform}>
              <a href={contact.href}>
                <span
                  className={`chess-profile-icon chess-profile-icon--${contact.platform}`}
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- Keep slide SVG artwork native for browser print. */}
                  <img src={contact.icon.src} alt="" />
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
