import img from "../assets/img.png"

const Img = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <img src={img} className="w-1/2 rounded-full" alt="" />
            <h1 className="text-6xl tracking-widest font-semibold">Hello</h1>
        </div>
    )
}

export default Img
