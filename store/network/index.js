import fetch from "isomorphic-fetch";
import QS from "query-string";
import { signStr, API_KEY, SECRET_KEY, origin, apiMaker } from "./util";

const header = {
  "X-MBX-APIKEY": API_KEY
};
const GET = (path, data, withSign = true) => {
  const apiPath = apiMaker(path);
  const qs = QS.stringify(data);
  let api = `${apiPath}?${qs}`;
  if (withSign) {
    const signature = signStr(qs);
    path += `&signature=${signature}`;
  }
  const start = +new Date();
  return fetch(api).then(res => {
    console.log(`${path} consume ${+new Date() - start}ms`);
    return res.json();
  });
};
const POST = (path, data) => {
  const apiPath = apiMaker(path);
  const signature = signStr(QS.stringify(data));
  return fetch(`${apiPath}?${qs}&signature=${signature}`, {
    method: "POST",
    headers: { ...header }
  });
};

export default {
  fetchRecentTickerList: data => GET("/api/v1/ticker/24hr", data, false)
};
