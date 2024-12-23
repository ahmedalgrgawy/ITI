
export const SingleBlog = ({ title, text, img, tags }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={img}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{text}</p>
                <div className="card-actions justify-end">
                    {tags?.map((index, tag) => {
                        return (
                            <div key={index}>
                                <div className="badge badge-outline">{tag}</div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
