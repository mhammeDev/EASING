import {defineStore} from 'pinia';
import userService from "@/service/user.service";

let tokens = localStorage.getItem('token') || null;

export const useUserStore = defineStore('users', {
    state: () => ({
        token: tokens,
        id:'',
        username:'',
        name:'',
        email:'',
        isLogged:false
    }),
    actions:{
        async LoginFromStore(username, password){
            try{
                let response = await userService.Login({username, password});
                if(!response.data.error){
                    await this.setLog(true, response.data, response.token)
                    return {response : "Connected successfull"}
                }
                return {error : response.data.error}
            }catch(e){
                console.log("An error occured : " + e)
            }
        },

        async LogoutFromStore(){
            await this.setLog(false, null, null);
        },

        async setLog(state, response, token){
            if(state){
                await this.setToken(token)
                this.id = response.id;
                this.username = response.username;
                this.email = response.email;
                this.name = response.name;
                this.isLogged = true
            } else {
                await this.removeToken(token)
                this.id = '';
                this.username = '';
                this.email = '';
                this.name = '';
                this.isLogged= false
            }

        },

        setToken(token) {
            this.token = token;
            console.log(token)
            localStorage.setItem('token', token); // Enregistrez le token dans le stockage local
        },
        removeToken(token) {
            this.token = token;
            localStorage.removeItem('token');
        }, async verifyToken(){
            let response = await userService.getInformationFromToken();
            if(response.error){
                this.setLog(false, null, null)
            } else {
                console.log(response.data)
                this.setLog(true, response.data, this.token)

            }

        }
    }

})