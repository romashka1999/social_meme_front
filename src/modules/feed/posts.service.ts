import {AxiosResponse} from "axios";
import axiosInstance from "../../shared/utils/axios.util";


export const getFolloweesPosts = (page: number = 0, pageSize: 10): Promise<AxiosResponse> => {
    return axiosInstance.get(`/posts/followees-posts?page=${page}&pageSize=${pageSize}`);
}