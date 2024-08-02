// 导入 axios 和 AxiosInstance 类型
import axios, {
  AxiosInstance,
  AxiosHeaders,
} from 'axios'

import {APINET} from '@/config'
// 定义响应数据的结构
interface ResponseData {
  code: number
  data: any
  message: string
}

// 定义请求配置的结构
interface RequestConfig {
  showLoading?: boolean; // 是否显示 loading 状态
  headers?: {
    address?: string;
    Authorization?: string;
  }; // 请求头配置
  token?: string; // 添加 token 字段
  address?: string;
}

interface request {
  headers: AxiosHeaders | {}
  method: string
  url: string
  params?: any
  data?: any
}

// 定义 Request 类
class Request {
  instance: AxiosInstance

  constructor() {
    // 创建 axios 实例
    this.instance = axios.create({
      // baseURL: 'http://192.168.1.16/', 
      baseURL: APINET,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })

    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (response): Promise<any> => {
        const res = response.data as ResponseData
        if (res.code !== 1 && res.code !== 2) {
          // 统一处理错误
          console.error(`Error: ${res.message}`)
          return Promise.reject(res.message || 'Error')
        } else {
          return Promise.resolve(res)
        }
      },
      (error) => {
        // 统一处理错误
        console.error('Error', error)
        return Promise.reject(error)
      }
    )
  }

  // 封装请求方法
  request<T>(
    url: string,
    method = 'GET',
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const { showLoading, headers, Authorization, address } = config || {}
    if (showLoading) {
      // 显示 loading 状态
    }

    const requestConfig: request = {
      headers: headers || {},
      method,
      url,
    }

    if (method.toUpperCase() === 'GET') {
      requestConfig.params = data
    } else {
      requestConfig.data = data
    }

    // 使用类型断言来确保 headers 的类型
    const typedHeaders = requestConfig.headers as { address?: string; Authorization?: string }

    if (address) {
      typedHeaders.address = address
    }

    if (Authorization) {
      typedHeaders.Authorization = Authorization
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request<ResponseData>(requestConfig)
        .then((response) => {
          resolve(response as T)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          if (showLoading) {
            // 隐藏 loading 状态
          }
        })
    })
  }
}

// 导出 Request 实例
export default new Request()
