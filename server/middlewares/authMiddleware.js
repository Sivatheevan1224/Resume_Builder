import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "Unauthorized - No token provided"});
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({message: "Unauthorized - Invalid token"});
    }
}

export default protect;