import React, { useEffect } from "react";
import { Button, notification, Space } from 'antd';
import { resetInvestmentSlice } from "../../redux/InvestmentSlice/InvestmentSlice";
import { useDispatch } from "react-redux";

function ResponseMessage({message="", type="success"}) {
    const dispatch = useDispatch();
    const openNotification = () => {
        if (type == "success") {
            notification.success({
                message: message ? message : "",
                description: "",
                onClick: () => {
                  dispatch(resetInvestmentSlice());
                },
                placement: "bottomRight"
              });
        } else if (type == "error") {
            notification.error({
                message: message ? message : "",
                description: "",
                onClick: () => {
                  dispatch(resetInvestmentSlice());
                },
                placement: "bottomRight"
              });
        }
        dispatch(resetInvestmentSlice());
    };
    useEffect(() => {
        openNotification("")
    }, [])

    return (
        <>
        </>
    );
}

export default ResponseMessage;
