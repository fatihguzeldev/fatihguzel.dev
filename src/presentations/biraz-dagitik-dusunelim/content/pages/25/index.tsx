import Image from 'next/image'
import { Stage, Underline } from '../../components/stage/stage'
import presentationQr from '../../assets/qr/presentation.svg'
import './thanks.css'

export const title = 'teşekkürler.'

export default function Thanks() {
  return (
    <Stage number={25} className="thanks-scene">
      <div className="thanks-layout">
        <h1>
          <Underline>teşekkürler.</Underline>
        </h1>
        <a
          className="thanks-share"
          href="https://fatihguzel.dev/talks/biraz-dagitik-dusunelim"
        >
          <Image
            className="thanks-qr"
            src={presentationQr.src}
            width={560}
            height={560}
            loading="eager"
            unoptimized
            alt="sunum bağlantısının qr kodu"
          />
          <span className="thanks-address">
            fatihguzel.dev/talks/biraz-dagitik-dusunelim
          </span>
        </a>
      </div>
    </Stage>
  )
}
