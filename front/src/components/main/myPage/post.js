import React from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
    const complete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        props.setcompany({
            ...props.company,
            address: fullAddress,
        });
    };

   
        return (
            <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div style={{ width: "400px", height: "600px", padding: "1rem", boxSizing: "border-box", backgroundColor: "#fff", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <DaumPostcode
                        style={{ width: "100%", height: "100%" }}
                        onComplete={complete} 
                        autoClose
                    />
                </div>
            </div>
        );
    };

export default Post;