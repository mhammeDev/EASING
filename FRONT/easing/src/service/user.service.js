import {getRequest, postRequest} from "@/service/axios.service";

const url = "/user"

async function LoginFromAPI(data){
    return postRequest(url+"/login",data ,"Login")
}

async function getInformationFromTokenFromAPI(){
    return getRequest(url+"/token" ,"getInformation")
}


async function Login(data){
    let response = null;
    try{
        response = await LoginFromAPI(data);
        console.log(response)
        return response;
    }catch (e){
        console.error("Error while login : " + e)
        throw e;
    }
}

async function getInformationFromToken(){
    let response = null;
    try{
        response = await getInformationFromTokenFromAPI();
        console.log(response)
        return response;
    }catch (e){
        console.error("Error while extracting token : " + e)
        throw e;
    }
}

export default {
    Login,
    getInformationFromToken
}