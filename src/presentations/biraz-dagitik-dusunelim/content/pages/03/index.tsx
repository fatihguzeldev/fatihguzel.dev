import { Stage, ChapterMarker, chapters } from '../../components/stage/stage'

export const title = 'içerik'
export default function Contents() {
  return (
    <Stage number={3} title={title}>
      <div className="lecture-contents">
        <svg
          className="lecture-contents-path"
          viewBox="0 0 84 406"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 42 34 C 20 113 64 170 42 230 C 25 289 54 330 42 372" />
        </svg>
        {chapters.map((chapter, index) => (
          <div className="lecture-contents-row" key={chapter.name}>
            <span className="lecture-contents-number">
              <ChapterMarker number={index + 1} />
            </span>
            <h2>{chapter.name}</h2>
          </div>
        ))}
      </div>
    </Stage>
  )
}
