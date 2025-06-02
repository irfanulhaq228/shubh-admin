import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input, Modal, Radio, Select } from 'antd';

import { MdDelete } from 'react-icons/md';
import { FaPercent, FaPlus } from 'react-icons/fa';
import { FaIndianRupeeSign } from 'react-icons/fa6';

import { createBonusApi } from '../../api/api';

const BonusModal = ({ fn_getBonus, giveBonusModal, closeBonusModal, bonusType, setBonusType, users, bonusAmountType, setBonusAmountType, colors, data }: any) => {

    const [amount, setAmount] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [olderBonusRows, setOlderBonusRows] = useState([{ bets: '', bonus: '' }]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = null;
        if (bonusType === 'refill') {
            if (!selectedUser) return toast.error("Select User");
            if (amount === '') return toast.error("Enter Amount");
            const obj = {
                bonusType,
                bonusAmountType: 'INR',
                selectedUser,
                amount,
                status: 'completed'
            };
            if (selectedUser === 'all') delete obj.selectedUser;
            response = await createBonusApi(obj);
        } else if (bonusType === 'joining') {
            if (amount === '') return toast.error("Enter Amount");
            const obj = {
                bonusType,
                bonusAmountType,
                amount,
                status: 'active'
            };
            const findJoining = data?.find((d: any) => d?.bonusType === 'joining') ? true : false;
            if (findJoining) {
                return toast.error('Joining Bonus Already Added, update it')
            };
            response = await createBonusApi(obj);
        } else if (bonusType === 'older') {
            if (olderBonusRows.some(row => !row.bets || !row.bonus)) {
                toast.error('Please fill all fields');
                return;
            };
            const obj = {
                bonusType,
                olderBonusRows,
                status: 'active'
            };
            const findJoining = data?.find((d: any) => d?.bonusType === 'older') ? true : false;
            if (findJoining) {
                return toast.error('Older User Bonus Already Added, update it')
            };
            response = await createBonusApi(obj);
        };
        if (response?.status) {
            fn_getBonus();
            closeBonusModal();
            toast.success(response?.message);
        } else {
            toast.error(response?.message)
        }
    };

    const handleBonusTypeChange = (value: string) => {
        setAmount('');
        setBonusType(value);
        setSelectedUser(null);
        setOlderBonusRows([{ bets: '', bonus: '' }]);
    };

    const addOlderBonusRow = () => {
        setOlderBonusRows([...olderBonusRows, { bets: '', bonus: '' }]);
    };

    const deleteOlderBonusRow = (index: number) => {
        const updatedRows = olderBonusRows.filter((_, i) => i !== index);
        setOlderBonusRows(updatedRows);
    };

    return (
        <Modal
            title=""
            centered
            width={600}
            footer={null}
            open={giveBonusModal}
            onOk={closeBonusModal}
            onCancel={closeBonusModal}
            style={{ fontFamily: "Roboto" }}
        >
            <p className="text-[22px] font-[700]">Give Bonus</p>
            <form className="pb-[5px] pt-[10px] flex flex-col gap-[10px]" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <p className="font-[500] mb-[3px]">Bonus Type</p>
                    <Radio.Group value={bonusType} onChange={(e) => handleBonusTypeChange(e.target.value)}>
                        <Radio.Button className="w-[33.3%] text-center text-[12px]" value="refill">
                            Refill Bonus
                        </Radio.Button>
                        <Radio.Button className="w-[33.3%] text-center text-[12px]" value="joining">
                            Joining Bonus
                        </Radio.Button>
                        <Radio.Button className="w-[33.3%] text-center text-[12px]" value="older">
                            Older User
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <hr className="mt-[15px] mb-[7px]" />
                {bonusType === "refill" && (
                    <div className="flex flex-col">
                        <p className="font-[500]">Select User to Add Bonus{" "}<span className="text-[12px] text-gray-500">(this bonus added immediately to user wallet)</span></p>
                        <Select
                            showSearch
                            value={selectedUser}
                            optionFilterProp="label"
                            placeholder="Select User"
                            onChange={(e) => setSelectedUser(e)}
                            options={[{ label: "All", value: "all" }, ...users]}
                            filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        />
                    </div>
                )}
                {bonusType !== 'older' && (
                    <div className={`flex flex-col ${bonusType === "refill" && "mt-[10px]"}`}>
                        <p className="font-[500]">Enter Amount</p>
                        <div className="flex justify-center gap-[15px]">
                            <Input placeholder="Enter Amount" suffix={bonusType === 'refill' ? <FaIndianRupeeSign /> : bonusAmountType === 'percentage' ? <FaPercent /> : <FaIndianRupeeSign />} className="flex-1" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Select disabled={bonusType === 'refill'} value={bonusType === 'refill' ? 'INR' : bonusAmountType} options={[{ label: 'Percentage', value: 'percentage' }, { label: 'INR', value: 'INR' }]} onChange={(e) => setBonusAmountType(e)} style={{ width: "150px" }} />
                        </div>
                    </div>
                )}
                {bonusType === "joining" && (
                    <p className="text-[12px] text-red-600 font-[500] mt-[-8px]">
                        Note: This bonus applied on new users when they first deposit
                    </p>
                )}
                {bonusType === 'older' && (
                    <table>
                        <thead>
                            <tr className="h-[30px]" style={{ backgroundColor: colors.bg }}>
                                <th className="text-left ps-[10px] w-[50%]">No. of Bets</th>
                                <th className="text-left ps-[10px] w-[50%]">Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {olderBonusRows.map((row, index) => (
                                <tr key={index} className="h-[30px] border-b">
                                    <td className="text-left ps-[10px]">
                                        <Input
                                            type="number"
                                            size="small"
                                            placeholder="Enter No. of Bets"
                                            className="w-[85%]"
                                            value={row.bets}
                                            onChange={(e) => {
                                                const updatedRows = [...olderBonusRows];
                                                updatedRows[index].bets = e.target.value;
                                                setOlderBonusRows(updatedRows);
                                            }}
                                        />
                                    </td>
                                    <td className="text-left ps-[10px] relative">
                                        <Input
                                            suffix={<FaPercent className="text-[10px]" />}
                                            type="number"
                                            size="small"
                                            placeholder="Enter Bonus"
                                            className="w-[85%]"
                                            value={row.bonus}
                                            onChange={(e) => {
                                                const updatedRows = [...olderBonusRows];
                                                updatedRows[index].bonus = e.target.value;
                                                setOlderBonusRows(updatedRows);
                                            }}
                                        />
                                        {olderBonusRows.length > 1 && (
                                            <MdDelete
                                                className="absolute right-[2px] top-[8px] text-red-600 cursor-pointer"
                                                onClick={() => deleteOlderBonusRow(index)}
                                            />
                                        )}
                                        {index === olderBonusRows.length - 1 && (
                                            <FaPlus
                                                className="absolute right-[2px] top-[33px] cursor-pointer"
                                                onClick={addOlderBonusRow}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button
                    className="w-full rounded-[10px] mt-[18px] text-white flex justify-center items-center h-[40px] font-[500] text-[16px]"
                    style={{ backgroundColor: colors.text }}
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};

export default BonusModal;
