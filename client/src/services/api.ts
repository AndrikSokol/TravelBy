import axios from "axios";
import { BASEURL } from "../constants/constants";
import { IPlace, IPlaceData } from "../types/place.interface";
import { IGoogleUserData, IUser, IUserData } from "../types/user.interface";

export const instance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true;
        const { data } = await axios.get<IUserData>(`${BASEURL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        console.log("Не Авторизован");
      }
    }
    throw error;
  }
);

export const api = {
  getPlaces: async (): Promise<IPlaceData[]> => {
    const { data } = await instance.get<IPlaceData[]>("/places");
    return data;
  },

  login: async (email: string, password: string): Promise<IUserData> => {
    const { data } = await instance.post<IUserData>("/login", {
      email,
      password,
    });
    return data;
  },

  googleLogin: async (): Promise<IGoogleUserData> => {
    const { data } = await instance.get<IGoogleUserData>("/login/success");
    return data;
  },
  registration: async (username: string, email: string, password: string): Promise<IUserData> => {
    const { data } = await instance.post<IUserData>("/registration", {
      username,
      email,
      password,
    });
    return data;
  },

  logout: async (): Promise<void> => {
    await instance.post("/logout");
  },
  getPlace: async (id: string | undefined): Promise<IPlaceData> => {
    const { data } = await instance.get<IPlaceData>(`/place/${id}`);
    return data;
  },

  getPlacesForUser: async (): Promise<IPlaceData[]> => {
    const { data } = await instance.get<IPlaceData[]>("/places-for-user");
    return data;
  },

  removePlace: async (_id: string): Promise<string> => {
    const { data } = await instance.put<string>("/place", { _id });
    return data;
  },

  // getProfile: async () => {
  //   const { data } = await instance.get("/profile");
  //   return data;
  // },

  uploadByLink: async (photoLink: string): Promise<string> => {
    const { data } = await instance.post<string>("/upload-by-link", {
      link: photoLink,
    });
    return data;
  },

  uploadByDevice: async (photos: FormData): Promise<string[]> => {
    const { data } = await instance.post<string[]>("/upload-by-device", photos, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  },

  addPlace: async (placeData: IPlace) => {
    await instance.post("/place", {
      ...placeData,
    });
  },

  editPlace: async (id: string, placeData: IPlace) => {
    instance.put("/places", {
      id,
      ...placeData,
    });
  },

  checkAuth: async (): Promise<IUserData> => {
    const { data } = await axios.get<IUserData>("/refresh", { withCredentials: true });
    return data;
  },
};
