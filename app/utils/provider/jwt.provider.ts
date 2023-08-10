import jwt from 'jsonwebtoken';

const createJwtToken = async (userClaims: any, secretKey: string): Promise<string> => {
    const serializedUserClaims = JSON.parse(JSON.stringify(userClaims));
    console.log("plainUserClaims:",serializedUserClaims)
    const token: string = jwt.sign(serializedUserClaims, secretKey, { expiresIn: '1h' });
    return token;
};

export default createJwtToken;