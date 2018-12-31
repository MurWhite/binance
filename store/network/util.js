import CryptoJS from "crypto-js";

export const API_KEY =
  "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A";
export const SECRET_KEY =
  "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j";
export const origin = "https://www.binance.co";
export const wsOrigin = "wss://stream.binance.com:9443";
export const signStr = val => {
  return CryptoJS.HmacSHA256(val, SECRET_KEY);
};
export const apiMaker = path => {
  return `${origin}${path}`;
};
export const wsApiMaker = path => {
  return `${wsOrigin}${path}`;
};
