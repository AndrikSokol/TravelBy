import axios from "axios"
import { BASEURL } from "../constants/constants";
import { IPlace, IPlaceData } from "../types/place.interface";
import { IUser, IUserData } from "../types/user.interface";


export const instance = axios.create({
    baseURL: BASEURL,
    withCredentials: true
})



export const api = {
    getPlaces: async () : Promise<IPlaceData[]> => {
        const {data} =  await instance.get<IPlaceData[]>("/places")
        return data;
    },
   
    authorize: async(email:string,password:string) :Promise<IUserData>=>{
        const {data} =  await instance.post<IUserData>( "/login" ,  {
          email,
          password,
        },)
        return data;
    },

    registration: async(username :string,email:string,password:string) : Promise<void>=>{
        await axios.post<IUser>("/registration", {
            username,
            email,
            password,
          });
    },
    getPlace: async (id:string) : Promise<IPlaceData> => {
        const {data} =  await instance.get<IPlaceData>(`/place/${id}`);
        return data;
    },

    getPlacesForUser: async ():Promise<IPlaceData[]> => {
        const {data} =  await instance.get<IPlaceData[]>("/places-for-user");
        return data;
    },

    removePlace: async (_id:string) :Promise<string>=> {
        const {data} =  await instance.put<string>("/place", { _id });
        return data;
    },

    logout: async():Promise<void>=>{
        await instance.post("/logout");
    },

    getProfile: async()=>{
        const {data} = await instance.get("/profile")
        return data;
    },

    uploadByLink:async(photoLink:string)=>{
        const {data} = await instance.post("/upload-by-link", {
            link: photoLink,
          });
        return data;
    },

    uploadByDevice: async(data)=>{
        const {data} = await instance.post("/upload-by-device", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    }
}