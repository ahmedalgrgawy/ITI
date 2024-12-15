import ProgressBar from "@ramonak/react-progress-bar";

const Skills = () => {
    return (
        <div>
            <h1 className="head">Skills</h1>

            <div className="flex flex-col gap-4 text-2xl ">
                <div className="flex gap-4 items-center">
                    <span className="mr-4 font-medium">Phonoscope</span>
                    <div className="w-3/4">
                        <ProgressBar bgColor='#333' completed={60} />
                    </div>
                </div>
                <div className="flex gap-4 items-center" >
                    <span className="mr-4 font-medium">Phonoscope</span>
                    <div className="w-3/4">
                        <ProgressBar bgColor='#333' completed={60} />
                    </div>

                </div>
                <div className="flex gap-4 items-center">
                    <span className="mr-4 font-medium">Phonoscope</span>
                    <div className="w-3/4">
                        <ProgressBar bgColor='#333' completed={60} />
                    </div>
                </div>
                <div className="flex gap-4 items-center" >
                    <span className="mr-4 font-medium">Phonoscope</span>
                    <div className="w-3/4">
                        <ProgressBar bgColor='#333' completed={60} />
                    </div>
                </div>
                <div className="flex gap-4 items-center" >
                    <span className="mr-4 font-medium">Phonoscope</span>
                    <div className="w-3/4">
                        <ProgressBar bgColor='#333' completed={60} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skills

