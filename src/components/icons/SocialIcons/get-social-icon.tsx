import type { ComponentType } from 'react'
import type { Social } from '@/content/schemas/socials'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WebsiteIcon,
  XIcon,
  YouTubeIcon,
} from './SocialIcons'

type SocialIconProps = {
  size?: number
}

const slugIconMap: Record<string, ComponentType<SocialIconProps>> = {
  twitter: XIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
}

const kindIconMap: Record<string, ComponentType<SocialIconProps>> = {
  github: GitHubIcon,
  community: XIcon,
  web: WebsiteIcon,
}

export function getSocialIcon(social: Social): ComponentType<SocialIconProps> {
  return slugIconMap[social.slug] ?? kindIconMap[social.kind ?? ''] ?? WebsiteIcon
}
