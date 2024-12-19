import { useState } from "react"
import headImg from "../assets/head.jpg"
import tailImg from "../assets/tail.jpg"

export const Coins = () => {

    const [coinImg, setCoinImg] = useState(headImg)
    const [headCount, setHeadCount] = useState(0)
    const [tailCount, setTailCount] = useState(0)

    const options = ["Head", "Tail"]

    const Flip = () => {

        const side = options[Math.floor(Math.random() * options.length)]

        if (side === "Head") {
            setCoinImg(headImg)
            setHeadCount(headCount + 1)
        } else {
            setCoinImg(tailImg)
            setTailCount(tailCount + 1)
        }
    }



    return (
        <div className="flex flex-col items-center justify-center gap-8">

            <img className="w-1/2" src={coinImg} />

            <button className="bg-slate-700 text-white py-2 px-4" onClick={() => Flip()}>
                Flip Me
            </button>

            <p className="text-2xl">
                Your Flips is {headCount + tailCount} You got {headCount} Heads & {tailCount} Tails
            </p>

        </div>
    )
}