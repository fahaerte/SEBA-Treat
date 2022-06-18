import { IToast } from "../IToast";
import toast from "../Toast";

const dangerToast = (toastConfig: Omit<IToast, "icon" | "type">) => {
  toast({ ...toastConfig, type: "danger" });
};

export default dangerToast;
