import { TbWorld } from "react-icons/tb";

const Contact = () => {
    return (
        <div>
            <h1 className="head">CONTACT</h1>

            <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex items-center justify-center ml-3">
                    <TbWorld size={40} className="mr-5 font-bold" />
                    <span className="ml-2"></span>
                    <div className="flex flex-col font-medium">
                        <p>777 rest name</p>
                        <p>New York</p>
                    </div>
                </div>

                <div className="flex items-center justify-center ml-3">
                    <TbWorld size={40} className="mr-5 font-bold" />
                    <span className="ml-2"></span>
                    <div className="flex flex-col font-medium">
                        <p>777 rest name</p>
                        <p>New York</p>
                    </div>
                </div>

                <div className="flex items-center justify-center ml-3">
                    <TbWorld size={40} className="mr-5 font-bold" />
                    <span className="ml-2"></span>
                    <div className="flex flex-col font-medium">
                        <p>777 rest name</p>
                        <p>New York</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Contact