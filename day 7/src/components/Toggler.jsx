import { useState } from "react"
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

export const Toggler = () => {

    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(!open)

    return (
        <div className="bg-slate-700 p-2 flex flex-col items-start gap-5 w-full">
            <div className="flex items-center justify-between text-white py-2 px-4 w-full cursor-pointer" onClick={() => toggle()}>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, illo.</span>
                <button className="text-3xl font-bold">
                    {open ? <CiCircleChevDown /> : <CiCircleChevUp />}
                </button>
            </div>

            <p className={`${open ? "flex" : "hidden"} items-center gap-5  text-white py-2 px-4`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis assumenda nobis nulla, minus possimus nihil, modi aut molestiae molestias, animi voluptatum vero nam? Suscipit mollitia beatae vel obcaecati reprehenderit illum?
            </p>
        </div >
    )
}
