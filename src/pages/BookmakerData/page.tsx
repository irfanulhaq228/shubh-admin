import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import { getActiveSportsByAdmin, getBookmakerDataByEventIdApi, getEventsRunBookmakerDataApi, updateBookmakerResultApi } from "../../api/api";

const BookmakerData = ({ darkTheme }: any) => {
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState<any>({});

    const [eventsData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState<any>({});

    const [bookmakerData, setBookmakerData] = useState([]);

    const smallSidebar = useSelector((state: any) => state.smallSidebar);

    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);

    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

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
        if (selectedEvent && Object.keys(selectedEvent)?.length > 0) {
            fn_getBookmakerDataByEventId(selectedEvent?.eventId);
            const bookmakerDataInterval = setInterval(() => {
                fn_getBookmakerDataByEventId(selectedEvent?.eventId);
            }, 5000);

            return () => {
                clearInterval(bookmakerDataInterval);
            };
        }
    }, [selectedEvent]);

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"bookmakerData"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
                    }`}
            >
                <Navbar pageName={"Bookmaker Market"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px] pb-[30px]">
                    <p className="text-[20px] font-[500]">Sports</p>
                    <div className="mt-[5px] flex gap-[15px] overflow-x-auto">
                        {sports?.length > 0 && sports?.map((sport) => (
                            <Sport colors={colors} sport={sport} selectedSport={selectedSport} setSelectedSport={setSelectedSport} />
                        ))}
                    </div>

                    <p className="text-[20px] font-[500] mt-[15px]">Matches in which Bookmaker Market Runs</p>
                    <div className="mt-[5px] flex gap-[15px] overflow-x-auto">
                        {eventsData?.length > 0 && eventsData?.map((item) => (
                            <Button colors={colors} item={item} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
                        ))}
                    </div>

                    <div className="mt-[15px] flex flex-col gap-[10px]">
                        {bookmakerData?.length > 0 ? bookmakerData?.map((item) => (
                            <BookmakerBox colors={colors} item={item} selectedEvent={selectedEvent} />
                        )) : (
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

const BookmakerBox = ({ colors, item, selectedEvent }: any) => {
    const [resultInput, setResultInput] = useState(item?.result || "");
    useEffect(() => {
        setResultInput(item?.result || "");
    }, [item, selectedEvent]);
    const fn_submit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            bookmaker: item,
            result: resultInput,
            eventId: selectedEvent?.eventId
        }
        const response = await updateBookmakerResultApi(data);
        if (response?.status) {
            return toast.success("Bookmaker Data Updated");
        }
    }
    return (
        <div className="min-h-[80px] rounded-[10px] p-[20px] flex justify-between items-center py-[20px]" style={{ backgroundColor: colors.light }}>
            <p style={{ color: colors?.subText }}>{item?.nat}</p>
            <form className="flex gap-[10px]" onSubmit={fn_submit}>
                <input
                    value={resultInput}
                    onChange={(e) => setResultInput(e.target.value)}
                    placeholder="Enter Result..."
                    className="h-[40px] rounded-[8px] min-w-[150px] text-[14px] px-[15px]"
                />
                <button
                    type="submit"
                    style={{ backgroundColor: colors.text, color: colors?.light }}
                    className="min-w-[max-content] text-nowrap text-[15px] font-[500] h-[40px] rounded-[7px] max-w-[max-content] px-[20px] flex justify-center items-center"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
