import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {getProducts, newProduct} from "@/backend/controllers/productControllers";
import onError from "@/backend/middlewares/errors"

const router = createRouter({onError}); 

dbConnect();


router.get(getProducts)
router.post(newProduct);

export default router.handler();