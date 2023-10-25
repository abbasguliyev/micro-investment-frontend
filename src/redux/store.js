import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice/AuthSlice";
import InvestmentSlice from "./InvestmentSlice/InvestmentSlice";
import EntrepreneurSlice from "./EntrepreneurSlice/EntrepreneurSlice";

export default configureStore({
    reducer: {
        auth: AuthSlice,
        investment: InvestmentSlice,
        entrepreneur: EntrepreneurSlice
    }
})