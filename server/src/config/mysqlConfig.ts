const auth = require('mysql2/lib/auth_41.js');

export const authenticate: Function = (params: any, cb: Function) : void => {
    const doubleSha = auth.doubleSha1(process.env.MYSQL_PASSWORD || "");
    const isValid = auth.verifyToken(
        params.authPluginData1,
        params.authPluginData2,
        params.authToken,
        doubleSha
    );

    if(isValid) cb(null);
    cb(null, { message: 'wrong password', code: 1045 });
}