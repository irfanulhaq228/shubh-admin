import { Switch } from 'antd';

import { MdDeleteForever } from "react-icons/md";
import { FaIndianRupeeSign } from 'react-icons/fa6';
import URL, { deleteGameByIdApi, updateGameStatusByIdApi } from '../../api/api';
import Loader from '../Loader';
import toast from 'react-hot-toast';

const GamesConfigurationTable = ({ colors, data, loading, setData }: any) => {
    return (
        <>
            {/* table */}
            <div className="overflow-auto min-w-full">
                <table className="w-[950px] xl:w-full">
                    <thead>
                        <tr
                            className="leading-[40px] font-[600] text-[15px]"
                            style={{ color: colors.text, backgroundColor: colors.light }}
                        >
                            <td className="ps-[5px]">Game</td>
                            <td>Bets Running</td>
                            <td>Current Bets Amount</td>
                            <td>Admin Commision</td>
                            <td>P/L Ratio</td>
                            <td>Game Status</td>
                            <td>Disable/Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={5} className='text-center py-[10px] font-[500]' style={{ color: colors.subText }}><Loader color={colors.text} size={30} /></td>
                            </tr>
                        )}
                        {!loading && (
                            data?.length > 0 ? data?.map((item: any) => (
                                <TableRows colors={colors} game={item} data={data} setData={setData} />
                            )) : (
                                <tr>
                                    <td colSpan={5} className='text-center py-[10px] font-[500]' style={{ color: colors.subText }}>No Game Found</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GamesConfigurationTable;

const TableRows = ({ colors, game, data, setData }: any) => {
    const gameData = game.admins;
    const fn_delete = async (id: string) => {
        const response: any = await deleteGameByIdApi(id);
        if (response.status) {
            const updatedData = data.filter((item: any) => item?._id !== game?._id);
            setData(updatedData);
            return toast.success(response?.message);
        } else {
            return toast.error(response?.message);
        }
    }
    const fn_updateGame = async (value: boolean) => {
        const response: any = await updateGameStatusByIdApi(value, game?._id);
        if (response.status) {
            return toast.success(response?.message);
        } else {
            return toast.error(response?.message);
        }
    }
    return (
        <tr
            className="text-[13px] font-[500] border-b leading-[60px]"
            style={{ borderColor: colors.line, color: colors.subText }}
        >
            <td className="ps-[5px] flex items-center gap-[13px]">
                <a href={`${URL}/${game?.image}`} target='__blank'><img alt='img' src={`${URL}/${game?.image}`} className='h-[35px] w-[35px] rounded-[3px] object-cover object-center' /></a>
                <span className='capitalize'>{game.name}</span>
            </td>
            <td>4.5K</td>
            <td><FaIndianRupeeSign className='inline-block' />100.3K</td>
            <td>{game?.adminCommision}%</td>
            <td>Loss</td>
            <td>{game?.disabled ? "Stop" : "Active"}</td>
            <td>
                <Switch size="small" defaultChecked={gameData[0]?.status} title='disable' onChange={fn_updateGame} />
                <MdDeleteForever className='text-[21px] text-red-600 cursor-pointer inline-block ms-[15px]' title='delete' onClick={() => fn_delete(game?._id)} />
            </td>
        </tr>
    );
};
