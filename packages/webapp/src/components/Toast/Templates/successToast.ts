import { IToast } from "../IToast";
import toast from "../Toast";

const successToast = (toastConfig: Omit<IToast, "icon" | "type">) => {
  toast({ ...toastConfig, type: "success" });
};

export default successToast;
