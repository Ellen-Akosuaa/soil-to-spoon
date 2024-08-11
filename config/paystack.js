import Paystack from "paystack-api";
import "dotenv/config";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export default paystack;