import { use } from "react";
import conf from "../conf/conf";
import { Client, Account } from "appwrite";

export class Authservice{
    client=new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account=new Account(this.client)
    
    }
    async createAccount({email,password,name}){
        try{
            const useAccount=await this.account.create(ID.unique(),email,password,name)
            if(useAccount){
                //call another method
                return this.login({email,password})
            }
            else{
                return useAccount;
            }
        }
        catch(error){
            throw error;
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,name)
        }
        catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            return null
        }
        //agr koi account nhi mila toh null return
    }

    async logout(){
        try{
            return await this.account.deleteSessions()
        }
        catch(error){
            throw error
        }
    }
}

const authservice=new Authservice()
export default authservice