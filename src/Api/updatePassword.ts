import { reqInsConToken } from "../helpers/axios";
import { LoadingSwall } from "../helpers/swalls";


export const updatePassword = (user: any) => {
    //retornar una promesa
    return new Promise((resolve, reject) => {
        LoadingSwall.fire();
        reqInsConToken
            .put("/admin/password",{
                password: user.password,
            },{
                params :{
                    uid: user.uid,
                }
            })
            .then((res) => {
                
                if (res.data.ok) {
                    resolve(res.data.msg);
                }
                else {
                    reject(res.data.msg);
                }
            })
            .catch((err) => {
                reject(err);
            });
        LoadingSwall.close();
    });
}
