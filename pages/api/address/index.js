import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  getAddresses,
  newAddress,
} from "@/backend/controllers/addressControllers";

const router = createRouter();

dbConnect();

router.get(getAddresses);
router.post(newAddress);

export default router.handler();
