import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Address from "../models/user/Address";

// CREATE
const createAddress = (req: Request, res: Response, next: NextFunction) => {
  const { street, housenumber, postalcode, city, country } = req.body;

  const address = new Address({
    _id: new mongoose.Types.ObjectId(),
    street,
    housenumber,
    postalcode,
    city,
    country,
  });

  return address
    .save()
    .then((address) => res.status(201).json({ address }))
    .catch((error) => res.status(500).json({ error }));
};

// GET
const getAddress = (req: Request, res: Response, next: NextFunction) => {
  const addressId = req.params.addressId;

  return Address.findById(addressId)
    .then((address) =>
      address
        ? res.status(200).json({ address })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

// UPDATE
const updateAddress = (req: Request, res: Response, next: NextFunction) => {
  const addressId = req.params.addressId;

  return Address.findById(addressId)
    .then((address) => {
      if (address) {
        address.set(req.body);

        return address
          .save()
          .then((address) => res.status(201).json({ address }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// DELETE
const deleteAddress = (req: Request, res: Response, next: NextFunction) => {
  const addressId = req.params.addressId;
  return Address.findByIdAndDelete(addressId)
    .then((address) =>
      address
        ? res.status(201).json({ address, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createAddress, getAddress, updateAddress, deleteAddress };
