import Image from 'next/image'
import presentationQr from '../../assets/qr/presentation.svg'
import { Stage } from '../../components/stage/stage'
import './thanks.css'

export const title = 'Teşekkürler'

const presentationUrl = 'https://fatihguzel.dev/talks/bir-hamle-hesaplamak'

export default function ThanksScene() {
  return (
    <Stage frameId="thanks">
      <div className="chess-thanks">
        <h1>teşekkürler</h1>
        <div className="chess-thanks-share">
          <a className="chess-thanks-address" href="https://fatihguzel.dev">
            fatihguzel.dev
          </a>
          <a className="chess-thanks-qr" href={presentationUrl}>
            <Image
              src={presentationQr.src}
              width={440}
              height={440}
              loading="eager"
              unoptimized
              alt="Sunumu açmak için QR kodu"
            />
          </a>
        </div>
      </div>
    </Stage>
  )
}
