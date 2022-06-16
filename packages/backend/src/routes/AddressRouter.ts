import express from "express";
import CAddress from "../controller/CAddress";
import { schema, ValidateSchema } from "../middleware";

const AddressRouter = express.Router();

/**
 * @swagger
 * /address:
 *  post:
 *    tags:
 *    - Address
 *    summary: This is it
 *    parameters:
 *    - name: address
 *      description: A new address object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/CreateAddressDTO'
 *    responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Error
 */
AddressRouter.post(
  "/",
  ValidateSchema(schema.address.create),
  CAddress.createAddress
);

/**
 * @swagger
 * /address/{addressId}:
 *  get:
 *    tags:
 *    - Address
 *    summary: Get address by ID
 *    produces:
 *    - application/json
 *    parameters:
 *    - name: addressId
 *      description: mongoDB object id of the address
 *      in: path
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Returns an address
 *
 *      404:
 *        description: Not found
 *      500:
 *        description: Error
 */
AddressRouter.get("/:addressId", CAddress.getAddress);

/**
 * @swagger
 * /address/{addressId}:
 *  patch:
 *    tags:
 *    - Address
 *    description: Yoyoo
 *    summary: Update address by ID
 *    parameters:
 *    - name: addressId
 *      description: mongoDB object id of the address
 *      in: path
 *      required: true
 *      type: string
 *    - name: body
 *      description: Updated address attributes
 *      in: body
 *      required: true
 *      schema:
 *        $ref: "#/definitions/UpdateAddressDTO"
 *    responses:
 *      200:
 *        description: Returns an address
 *      404:
 *        description: Not found
 *      500:
 *        description: Error
 */
AddressRouter.patch(
  "/:addressId",
  ValidateSchema(schema.address.update),
  CAddress.updateAddress
);

AddressRouter.delete("/:addressId", CAddress.deleteAddress);

export = AddressRouter;
