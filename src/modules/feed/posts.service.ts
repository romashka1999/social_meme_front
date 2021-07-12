import {AxiosResponse} from "axios";
import axiosInstance from "../../shared/utils/axios.util";


export const getFolloweesPosts = (page: number = 0, pageSize: 10): Promise<AxiosResponse> => {
    return axiosInstance.get(`/posts/followees-posts?page=${page}&pageSize=${pageSize}`);
}

export const getUserPosts = (page: number = 0, pageSize: 10, userId: string): Promise<AxiosResponse> => {
    return axiosInstance.get(`/posts/user-posts/${userId}?page=${page}&pageSize=${pageSize}`);
}

export const createPost = (formData: FormData): Promise<AxiosResponse> => {
    return axiosInstance.post(`/posts/create-new`, formData);
}
