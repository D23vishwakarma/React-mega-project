import conf from "../conf/conf";
import { Client,ID,Databases,Storage, Query } from "appwrite";

export class Service{
    client=new Client()
    databases;
    buckets;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.databases=new Databases(this.client)
        this.buckets=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userID}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }

            )
        }
        catch(error){
            throw error;
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug){
         try {
                this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
                )
                return true
         } catch (error) {
            return false
         }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                 conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            return false
        }
    }
    async getPosts(query=[Query.equal("status","active")]){//appwrite me jobhi column indexed h sirf vhi query me aa skta
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                query
            )
        } catch (error) {
            return false
        }

    }
    async uploadFile(file){
        try {
            return await this.buckets,createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.buckets.deleteFile(
                conf.appWriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            return false
        }
    }
}

const service=Service()


export default service