import jwt from "jsonwebtoken"

export const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

    return { accessToken }
}