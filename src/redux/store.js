import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice/AuthSlice";
import InvestmentSlice from "./InvestmentSlice/InvestmentSlice";
import EntrepreneurSlice from "./EntrepreneurSlice/EntrepreneurSlice";
import EducationSlice from "./EducationSlice/EducationSlice";
import ExperienceSlice from "./ExperienceSlice/ExperienceSlice";
import EntrepreneurFormSlice from "./EntrepreneurFormSlice/EntrepreneurFormSlice";

export default configureStore({
    reducer: {
        auth: AuthSlice,
        education: EducationSlice,
        experience: ExperienceSlice,
        investment: InvestmentSlice,
        entrepreneur: EntrepreneurSlice,
        entrepreneurForm: EntrepreneurFormSlice
    }
})