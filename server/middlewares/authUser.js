import jwt from "jsonwebtoken";


const authUser = (req, res, next) => {
    const [token] = req.cookies.token;
    if (!token) {
        return res.json({ success: false, message: "Unauthorized" });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({ success: false, message: "Unauthorized" });
        }
        
        next();
    } catch (error) {
        return res.status.json({ success: false, message: "Unauthorized" });
    }
}

export default authUser;    