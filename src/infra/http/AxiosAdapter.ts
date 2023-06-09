import axios, { AxiosResponse } from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {
 

  async get(url: string): Promise<AxiosResponse> {
 
  
    const response = await axios.get(url);

    return response.data;
  }

  async post(url: string, body: object): Promise<AxiosResponse> {
    const response = await axios.post(url, body);
    return response.data;
  }

}