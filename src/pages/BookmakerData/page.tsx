import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import { getActiveSportsByAdmin, getBookmakerDataByEventIdApi, getEventsRunBookmakerDataApi, updateBookmakerResultApi, updateBookmakerRollBackApi } from "../../api/api";

const BookmakerData = ({ darkTheme }: any) => {
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState<any>({});

    const [eventsData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState<any>({});

    const [bookmakerData, setBookmakerData] = useState<any>([]);

    const smallSidebar = useSelector((state: any) => state.smallSidebar);

    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);

    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    const [selectedWinner, setSelectedWinner] = useState("");
    const [innitialWinner, setInnitialWinner] = useState("");
    const [rollBack, setRollBack] = useState(null);

    const fn_getActiveSportsByAdmin = async () => {
        const response = await getActiveSportsByAdmin();
        if (response?.status) {
            setSports(response?.data?.data);
            setSelectedSport(response?.data?.data?.[0]);
        }
    }

    const fn_getEventsRunBookmakerData = async (sport: any) => {
        const response = await getEventsRunBookmakerDataApi(sport?.name);
        if (response?.status) {
            setEventData(response?.data);
            setSelectedEvent(response?.data?.[0]);

        }
    }

    const fnInterval_getEventsRunBookmakerData = async (sport: any) => {
        const response = await getEventsRunBookmakerDataApi(sport?.name);
        if (response?.status) {
            setEventData(response?.data);
        }
    }

    const fn_getBookmakerDataByEventId = async (eventId: string) => {
        const response = await getBookmakerDataByEventIdApi(eventId);
        if (response?.status) {
            setBookmakerData(response?.data);
            const winnerBookmaker = response?.data?.find((b: any) => b?.result && b?.result === "yes");
            if (winnerBookmaker) setSelectedWinner(`${winnerBookmaker?.mid}-${winnerBookmaker?.sid}`);
            if (winnerBookmaker) setInnitialWinner(`${winnerBookmaker?.mid}-${winnerBookmaker?.sid}`);
            if (winnerBookmaker) setRollBack(winnerBookmaker?.rollBack);
            const abandonedBookmaker = response?.data?.find((b: any) => b?.result && b?.result === "abandoned");
            if (abandonedBookmaker) setSelectedWinner(`abandoned`);
            if (abandonedBookmaker) setInnitialWinner(`abandoned`);
            if (abandonedBookmaker) setRollBack(abandonedBookmaker?.rollBack);
        }
    }

    const fnInterval_getBookmakerDataByEventId = async (eventId: string) => {
        const response = await getBookmakerDataByEventIdApi(eventId);
        if (response?.status) {
            setBookmakerData(response?.data);
            const winnerBookmaker = response?.data?.find((b: any) => b?.result && b?.result === "yes");
            if (winnerBookmaker) setRollBack(winnerBookmaker?.rollBack);
        }
    }

    useEffect(() => {
        fn_getActiveSportsByAdmin();
    }, []);

    useEffect(() => {
        setBookmakerData([]);
        if (Object.keys(selectedSport)?.length > 0) {
            fn_getEventsRunBookmakerData(selectedSport);
            const eventInterval = setInterval(() => fnInterval_getEventsRunBookmakerData(selectedSport), 30000);
            return () => {
                clearInterval(eventInterval);
            };
        }
    }, [selectedSport]);

    useEffect(() => {
        setSelectedWinner("");
        setRollBack(null)
        if (selectedEvent && Object.keys(selectedEvent)?.length > 0) {
            fn_getBookmakerDataByEventId(selectedEvent?.eventId);
            // const bookmakerDataInterval = setInterval(() => {
            //     fnInterval_getBookmakerDataByEventId(selectedEvent?.eventId);
            // }, 5000);
            // return () => {
            //     clearInterval(bookmakerDataInterval);
            // };
        }
    }, [selectedEvent]);

    const fn_assignWinner = async (e: any) => {
        e.preventDefault();
        if (selectedWinner === innitialWinner) return;

        for (const bookmaker of bookmakerData || []) {
            const sureSelect = `${bookmaker?.mid}-${bookmaker?.sid}` === selectedWinner ? `yes` : selectedWinner === "abandoned" ? "abandoned" : "no";

            const data = {
                bookmaker,
                result: sureSelect,
                eventId: selectedEvent?.eventId
            };

            await updateBookmakerResultApi(data);
        }

        return toast.success("Bookmaker Result Updated");
    };

    const fn_updateRollBack = async (rollback: any) => {
        console.log(rollback)
        for (const bookmaker of bookmakerData || []) {
            const data = {
                bookmaker,
                rollBack: rollback,
                eventId: selectedEvent?.eventId
            };

            await updateBookmakerRollBackApi(data);
        }

        return toast.success("Bookmaker Result Updated");
    };

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"bookmakerData"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
                    }`}
            >
                <Navbar pageName={"Bookmaker Market"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px] pb-[30px]">
                    <p className="text-[20px] font-[500]">Sports</p>
                    {/* sports mapped */}
                    <div className="mt-[5px] flex gap-[15px] overflow-x-auto">
                        {sports?.length > 0 && sports?.map((sport) => (
                            <Sport colors={colors} sport={sport} selectedSport={selectedSport} setSelectedSport={setSelectedSport} />
                        ))}
                    </div>
                    {/* events mapped */}
                    <p className="text-[20px] font-[500] mt-[15px]">Matches in which Bookmaker Market Runs</p>
                    <div className="mt-[5px] flex gap-[15px] overflow-x-auto">
                        {eventsData?.length > 0 && eventsData?.map((item) => (
                            <Button colors={colors} item={item} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
                        ))}
                    </div>
                    {/* select */}
                    <div className="mt-[15px] flex flex-col gap-[10px]">
                        {bookmakerData?.length > 0 ? (
                            <form>
                                <p className="font-[500] mt-[10px]">Choose Winner</p>
                                <select
                                    className="w-full border h-[40px] rounded-[5px] px-[15px] text-[15px] font-[500]"
                                    onChange={(e) => setSelectedWinner(e.target.value)}
                                >
                                    <option selected={selectedWinner === ""} disabled value={""}>--- Choose ---</option>
                                    {bookmakerData?.map((item: any) => (
                                        <option selected={`${item?.mid}-${item?.sid}` === selectedWinner} value={`${item?.mid}-${item?.sid}`}>{item?.nat}</option>
                                    ))}
                                    <option value={"abandoned"} selected={selectedWinner === "abandoned"}>Abandoned</option>
                                </select>
                                <button
                                    onClick={fn_assignWinner}
                                    className="text-[15px] font-[500] h-[40px] w-[150px] rounded-[7px] text-white mt-[10px]"
                                    style={{
                                        backgroundColor: colors?.text,
                                        color: colors?.light
                                    }}
                                >
                                    Submit
                                </button>
                                {rollBack === false && (
                                    <button
                                        type="button"
                                        onClick={() => fn_updateRollBack(!rollBack)}
                                        className="text-[15px] font-[500] h-[40px] w-[150px] rounded-[7px] text-white mt-[10px] ms-[10px]"
                                        style={{
                                            backgroundColor: colors?.text,
                                            color: colors?.light
                                        }}
                                    >
                                        RollBack
                                    </button>
                                )}
                                {rollBack === true && (
                                    <button
                                        type="button"
                                        className="text-[15px] font-[500] h-[40px] w-[150px] rounded-[7px] text-white mt-[10px] ms-[10px]"
                                        style={{
                                            backgroundColor: colors?.text,
                                            color: colors?.light
                                        }}
                                    >
                                        UnRolled
                                    </button>
                                )}
                            </form>
                        ) : (
                            <p className="text-center font-[500]">No Bookmaker Data Found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmakerData;

const Sport = ({ colors, sport, selectedSport, setSelectedSport }: any) => {
    return (
        <button
            key={sport?.name}
            onClick={() => setSelectedSport(sport)}
            className={`min-w-[max-content] text-nowrap text-[15px] font-[500] h-[40px] rounded-[7px] max-w-[max-content] px-[20px] flex justify-center items-center capitalize`}
            style={selectedSport?.name === sport?.name ? { backgroundColor: colors.text, color: colors?.light } : { backgroundColor: colors?.light, color: colors?.text }}
        >
            {sport?.name}
        </button>
    )
}

const Button = ({ colors, item, selectedEvent, setSelectedEvent }: any) => {
    return (
        <button
            key={item?.eventId}
            onClick={() => setSelectedEvent(item)}
            className={`min-w-[max-content] text-nowrap text-[15px] font-[500] min-h-[40px] py-[7px] rounded-[7px] max-w-[max-content] px-[20px] flex flex-col justify-center items-center`}
            style={selectedEvent?.eventId === item?.eventId ? { backgroundColor: colors.text, color: colors?.light } : { backgroundColor: colors?.light, color: colors?.text }}
        >
            <span>{item?.competitionName}</span>
            <span>{item?.eventName}</span>
        </button>
    )
}
