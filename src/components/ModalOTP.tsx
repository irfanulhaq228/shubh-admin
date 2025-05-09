import { Modal } from 'antd';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Loader from './Loader';
import { adminOTPApi } from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';

export const ModalOTP = ({ openOTP, setOpenOTP, id }: any) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [loader, setLoader] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);

    const handleSubmit = async () => {
        if (otp.length !== 6) {
            return toast.error("Enter Correct OTP");
        }
        setLoader(true);
        const response: any = await adminOTPApi({ id, otp });
        if (response.status) {
            setLoader(false);
            toast.success(response?.message);
            if (response?.firstTime) {
                setOpenOTP(false);
                setChangePasswordModal(true);
            } else {
                return navigate("/dashboard");
            }
        } else {
            setLoader(false);
            toast.error(response?.message);
        }
    }
    return (
        <>
            <Modal
                title=""
                open={openOTP}
                footer={null}
                centered
                closeIcon={null}
                style={{ fontFamily: "Roboto" }}
                width={450}
            >
                <p className='text-[18px] font-[500] mt-[-5px]'>Email Verification</p>
                <hr className='my-[10px]' />
                <div className='flex justify-center mt-[40px]'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span className='mx-[5px]'></span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{ width: "45px", height: "45px", border: "1px solid gray", fontSize: "16px", fontWeight: "600", borderRadius: "8px" }}
                    />
                </div>
                <div className='flex justify-center'>
                    <button onClick={handleSubmit} type="submit" className="w-full max-w-[325px] h-[40px] bg-gray-100 mt-[25px] mb-[10px] border border-gray-300 rounded-full text-[14px] font-[500] flex items-center justify-center" disabled={loader}>
                        {!loader ? "Verify" : <Loader color="black" size={20} />}
                    </button>
                </div>
                <p className='text-center hover:underline text-[13px] font-[500] mt-[18px] cursor-pointer' onClick={() => setOpenOTP(false)}>Again Enter Email ?</p>
            </Modal>
            <UpdatePassword open={changePasswordModal} setOpen={setChangePasswordModal} id={id} navigate={navigate} />
        </>
    )
}
