import React, { useEffect } from "react";
import { notification } from 'antd';
import { useDispatch } from "react-redux";

function ResponseMessage({message="", type="success", slice}) {
    const dispatch = useDispatch();
    const openNotification = () => {
        if (type == "success") {
            notification.success({
                message: message ? message : "",
                description: "",
                onClick: () => {
                  dispatch(slice);
                },
                placement: "bottomRight"
              });
        } else if (type == "error") {
            notification.error({
                message: message ? message : "",
                description: "",
                onClick: () => {
                  dispatch(slice);
                },
                placement: "bottomRight"
              });
        }
        dispatch(slice);
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
