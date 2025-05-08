import { Modal } from 'antd';
import toast from 'react-hot-toast';
import { checkAdminApi, DepositRequestApi } from '../api/api';
import { updateAdmin, updateWallet } from '../features/features';

export const ModalDepositRequest = ({ colors, dispatch, open, fn_closeModal, value, setValue, fn_getDeposits }: any) => {

    const fn_submitRequest = async (e: any) => {
        e.preventDefault();
        if (value === "") {
            return toast.error("Please enter points");
        };
        const response = await DepositRequestApi({ value: parseFloat(value) });
        if (response?.status) {
            fn_closeModal();
            setValue('');
            const res = await checkAdminApi();
            if (res?.status) {
                dispatch(updateWallet(res?.data?.wallet));
                dispatch(updateAdmin(res?.data));
            }
            fn_getDeposits();
            toast.success(response?.message);
        } else {
            toast.error(response?.message);
        }
    }

    return (
        <>
            <Modal
                title=""
                centered
                open={open}
                width={600}
                footer={null}
                onClose={fn_closeModal}
                onCancel={fn_closeModal}
                style={{ fontFamily: "Roboto" }}
            >
                <p className='text-[18px] font-[600] mt-[-5px]'>Deposit Point Request</p>
                <hr className='my-[10px]' />
                <form className='mt-[20px]' onSubmit={fn_submitRequest}>
                    <div className="flex flex-col">
                        <p className="font-[500]">Enter Points</p>
                        <input
                            min={1}
                            step={0.01}
                            type='number'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder='Enter Points'
                            className="w-full h-[40px] border rounded-[10px] px-[10px] font-[500] text-[14px] focus:outline-none focus:border-gray-400"
                        />
                    </div>
                    <button type='submit' className="w-full rounded-[10px] mt-[18px] flex justify-center items-center h-[40px] font-[500] text-[16px]" style={{ backgroundColor: colors.text, color: colors.bg }}>
                        Submit
                    </button>
                </form>
            </Modal>
        </>
    )
}
