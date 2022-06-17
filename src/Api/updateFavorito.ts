import { reqInsConToken } from "../helpers/axios";

// make a promise
const updateFavorito = (contacto: any, id: String) => {
  return new Promise((resolve, reject) => {
    reqInsConToken
      .put("/contacto", contacto, { params: { id } })
      .then((res) => {
        if (res.data.ok) {
          resolve(res.data.contacto);
        } else {
          reject(res.data.msg);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default updateFavorito;
