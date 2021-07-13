import {AxiosResponse} from "axios";
import axiosInstance from "../../../shared/utils/axios.util";


export const getProfile = (userId: string, isMe: boolean): Promise<AxiosResponse> => {
    return isMe ? axiosInstance.get(`/users/my-profile`) :  axiosInstance.get(`/users/profile/${userId}`);
}

export const followUser = (userId: string): Promise<AxiosResponse> => {
    return axiosInstance.post(`/follows/follow/${userId}`);
}

export const unFollowUser = (userId: string): Promise<AxiosResponse> => {
    return axiosInstance.delete(`/follows/unfollow/${userId}`);
}

export const searchUsers = (search: string, page: number = 0, pageSize: number = 10): Promise<AxiosResponse> => {
    return axiosInstance.get(`/users/search?search=${search}&page=${page}&pageSize=${pageSize}`);
}

export const uploadCoverPictureToServer = (formData: FormData): Promise<AxiosResponse> => {
    return axiosInstance.patch(`/users/update-cover-img`, formData);
}

export const uploadProfilePictureToServer = (formData: FormData): Promise<AxiosResponse> => {
    return axiosInstance.patch(`/users/update-profile-img`, formData);
}
