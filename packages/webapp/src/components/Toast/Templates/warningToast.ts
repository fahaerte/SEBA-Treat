import { IToast } from "../IToast";
import toast from "../Toast";

const warningToast = (toastConfig: Omit<IToast, "icon" | "type">) => {
  toast({ ...toastConfig, type: "warning" });
};

export default warningToast;
