import Api from "./interceptor";

export const getApi=async(url) => {
    try {
        let result=await Api.get(url);
        if(result.status===200){
            if(result.data.status===200){
                return result.data
            } else {
                return result.data.message
            }
        }
    } catch (e) {
        if(e){
            return e;
        }
    }
}
export const postApi=async(url,data) => {
    try {
        const response=await Api.post(url,data);
       
        if(response.status===200){
         if(response.data.status===200){
            return response.data;
         } else {
            return response.data.message
         }
      }
    } catch (error) {
        if(error){
            return error;
        }
    }
}

export const putApi = async(url,data) => {
    try {
        let result = await Api.put(url,data)
        if(result.status === 200) {
            if(result.data.status === 200){
                return result.data
            }
            else{
                return result.data.message
            }
        }
    }
    catch(e) {
        if(e) {
            return e
        }
    }
}

export const deleteApi = async(url,data) => {
    try {
        let result = await Api.delete(url,data)
        if(result.status === 200) {
            if(result.data.status === 200){
                return result.data
            }
            else{
                return result.data.message
            }
        }
    }
    catch(e) {
        if(e) {
            return e
        }
    }
}