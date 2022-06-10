import express from "express";
import CAddress from "../controller/CAddress";
import { schema, ValidateSchema } from "../middleware";

const AddressRouter = express.Router();

AddressRouter.post(
  "/create",
  ValidateSchema(schema.address.create),
  CAddress.createAddress
);
AddressRouter.get("/get/:addressId", CAddress.getAddress);
AddressRouter.patch(
  "/update/:addressId",
  ValidateSchema(schema.address.update),
  CAddress.updateAddress
);
AddressRouter.delete("/delete/:addressId", CAddress.deleteAddress);

export = AddressRouter;
