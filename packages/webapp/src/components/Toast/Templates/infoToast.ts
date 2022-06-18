import { IToast } from "../IToast";
import toast from "../Toast";

const infoToast = (toastConfig: Omit<IToast, "icon" | "type">) => {
  toast({ ...toastConfig, type: "info" });
};

export default infoToast;
