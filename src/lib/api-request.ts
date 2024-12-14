import axios, { AxiosInstance } from "axios";

export type ContentType = "application/json" | "multipart/form-data";

export default class ApiRequest {
  readonly instance: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.instance = axios.create();
  }

  setBearerToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  setBasicAuth(username: string, password: string) {
    this.instance.defaults.headers.common["Authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
  }

  setContentType(contentType: ContentType) {
    this.instance.defaults.headers.common["Content-Type"] = contentType;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(requestPath: string, queryString: string = "") {
    return this.instance.get(this.baseUrl ? this.baseUrl + requestPath : requestPath, {
      params: queryString
    });
  }

  post(requestPath: string, requestBody: unknown) {
    return this.instance.post(this.baseUrl ? this.baseUrl + requestPath : requestPath, requestBody);
  }

  put(requestPath: string, requestBody: unknown) {
    return this.instance.put(this.baseUrl ? this.baseUrl + requestPath : requestPath, requestBody);
  }

  delete({ requestPath, queryString, requestBody }: { requestPath: string; queryString?: string; requestBody?: unknown }) {
    return this.instance.delete(this.baseUrl ? this.baseUrl + requestPath : requestPath, { params: queryString, data: requestBody });
  }
}
