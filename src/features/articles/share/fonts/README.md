# Article share image fonts

These are unmodified static TrueType fonts for server-side image rendering with
`next/og`. They use the site's existing font families: Space Grotesk in medium
(500), and JetBrains Mono in regular (400).

- `SpaceGrotesk-Medium.ttf` (500): [Space Grotesk's official repository](https://github.com/floriankarsten/space-grotesk/blob/03507d024a01282884232081fc6011c09ff4e849/fonts/ttf/static/SpaceGrotesk-Medium.ttf),
  pinned to commit `03507d024a01282884232081fc6011c09ff4e849`.
  Its SIL Open Font License 1.1 is included in `SpaceGrotesk-OFL.txt`.
- `JetBrainsMono-Regular.ttf` (400): [JetBrains Mono's official repository](https://github.com/JetBrains/JetBrainsMono/blob/19371302b95d218af43299bce79ddbddd0bc364d/fonts/ttf/JetBrainsMono-Regular.ttf),
  pinned to commit `19371302b95d218af43299bce79ddbddd0bc364d`.
  Its SIL Open Font License 1.1 is included in `JetBrainsMono-OFL.txt`.

All files were checked for the declared weight, absence of variable-font axes,
and glyph coverage for the Turkish characters `çÇğĞıİöÖşŞüÜ`. These are TTF files,
not WOFF2.
