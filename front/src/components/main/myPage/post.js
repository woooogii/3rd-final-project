import React from "react";
import DaumPostcode from "react-daum-postcode";

const Post = ({ setCompany }) => { // props의 구조 분해 할당을 사용합니다.
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

        setCompany(fullAddress); // setCompany 함수를 직접 호출합니다.
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