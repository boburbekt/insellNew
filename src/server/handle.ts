import util from "./util";
import store from "../store";
import router from "@/router";
import i18n from '../i18n';

export default function handleError(error: any) {
  const status = error.response?.status;
  const detail = error.response?.data?.detail;
  const key = error.response?.data?.key;
  if (error.code == "ERR_NETWORK") {
    util.toast2("Internet bilan aloqa yo'q!");
  } else if (status)
    if (status == 400) {
      util.toast2(detail);
    } else if (status == 401) {
      router.push('/sign-in')
      window.location.href = '/sign-in'
      store.dispatch("setUser", null);
    }
}
