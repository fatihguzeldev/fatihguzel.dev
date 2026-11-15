import Image from 'next/image'
import portraits from '../../assets/chess-players.png'
import { Stage } from '../../components/stage/stage'
import './personal.css'

export const title = 'satranç ve ben'

export default function PersonalScene() {
  return (
    <Stage frameId="chess-and-me" title="satranç ve ben">
      <div className="chess-portraits">
        <Image
          src={portraits}
          alt="Magnus Carlsen, Viswanathan Anand, Anatoly Karpov ve Bobby Fischer’ın karikatür yüzleri"
          priority
        />
      </div>
    </Stage>
  )
}
