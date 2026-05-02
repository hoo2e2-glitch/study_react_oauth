import React, { useState } from 'react';

// 휴대폰, 이메일 인증
const Verify = () => {

    const [memberEmail, setMemberEmail] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [code, setCode] = useState("")
    const [isSent, setIsSent] = useState(false);
    const [emailCode, setEmailCode] = useState("")
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isVerified, setIsVerified] = useState({
        memberPhoneVerification: false,
        memberEmailVerification: false,
    })

    const handleMemberEmailOnChange = (e) => setMemberEmail(e.target.value)
    const handleMemberPhoneOnChange = (e) => setMemberPhone(e.target.value)
    const handleCodeOnChange = (e) => setCode(e.target.value)
    const handleCodeOnChanges = (e) => setEmailCode(e.target.value)
    

    // 휴대폰
    const sendVerificationMemberPhone = async () => {
        const response = await fetch("http://localhost:10000/api/sms/phone/verification-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberPhone: memberPhone
            })
        })
        
        if(!response.ok) throw new Error()
        const {success, message} = await response.json()
        if(success){
            setIsSent(true)
            alert(message)
        }
    }

    // 휴대폰 인증
    const verifyMemberPhone = async () => {
         const response = await fetch("http://localhost:10000/api/sms/phone/verification-code/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberPhone: memberPhone,
                code: code
            })
        })
        
        if(!response.ok) throw new Error()
        const {success, message} = await response.json()
        if(success){
            alert(message)
            setIsVerified({...isVerified, memberPhoneVerification: true})
        }
    }

    // 이메일 전송
    const sendVerificationMemberEmail = async () => {

         const response = await fetch("http://localhost:10000/api/sms/email/verification-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberEmail: memberEmail
            }),
        })
        
        const {success, message} = await response.json()
        if(success){
            setIsEmailSent(true)
            alert(message)
        }
    }

    // 이메일 인증
    const verifyMemberEmail = async () => {
         const response = await fetch("http://localhost:10000/api/sms/email/verification-code/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberEmail: memberEmail,
                code: emailCode
            }),
        })
        
        // if(!response.ok) throw new Error()
        const {success, message} = await response.json()
        if(success){
            alert(message)
            setIsVerified({...isVerified, memberEmailVerification: true})
        }
    }

    return (
        <div>
            인증 페이지😎!
            <div>
                <h1>휴대폰 인증</h1>
                <input onChange={handleMemberPhoneOnChange} value={memberPhone} />
                {!isVerified.memberPhoneVerification && (
                        isSent ? (
                            <>
                                <input onChange={handleCodeOnChange} value={code} />
                                <button onClick={verifyMemberPhone}>인증번호 확인</button>
                            </>
                        ) : (
                            <button onClick={sendVerificationMemberPhone}>인증 번호 발송</button>
                        )
                )}
                
            </div>
            <div>
                <h1>이메일 인증</h1>
                <input onChange={handleMemberEmailOnChange} value={memberEmail} />
                {!isVerified.memberEmailVerification && (
                        isEmailSent ? (
                            <>
                                <input onChange={handleCodeOnChanges} value={emailCode} />
                                <button onClick={verifyMemberEmail}>인증번호 확인</button>
                            </>
                        ) : (
                            <button onClick={sendVerificationMemberEmail}>인증 번호 발송</button>
                        )
                )}
            </div>
        </div>
    );
};

export default Verify;