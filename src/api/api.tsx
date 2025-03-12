import axios from "axios";
import Cookies from "js-cookie";

// import { messaging, getToken } from "../firebase";

const URL = "https://backend.shubhexchange.com";
// const URL = "http://62.72.57.126:8001";

export const UserSignUpApi = async (data: any) => {
    try {
        const token = Cookies.get('masterToken') || Cookies.get('adminToken');
        const loginType = localStorage.getItem('loginType');

        const response = await axios.post(`${URL}/user`,
            { ...data, type: loginType },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response?.status === 200) {
            return { status: true, message: "User Created Successfully", data: response?.data?.data };
        };
    } catch (error: any) {
        if (error?.status === 409) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const formatDate = (dateString: any) => {
    const optionsDate: any = { day: '2-digit', month: 'short', year: 'numeric' };
    const optionsTime: any = { hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
};

export const adminLoginApi = async (data: { email: string; password: string, type: string }) => {
    try {
        const response = await axios.post(`${URL}/admin/login`, { ...data });
        if (response.status === 200) {
            if (data.type === "admin") {
                return { status: true, message: "OTP sent to your Email", id: response.data.id }
            } else {
                Cookies.set('adminToken', response?.data?.token);
                Cookies.set('masterToken', response?.data?.merchantToken);
                return { status: true, message: "Master LoggedIn Successfully" }
            }
        }
    } catch (error: any) {
        if (error?.status === 401) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const adminOTPApi = async (data: { id: string; otp: string }) => {
    try {
        // const fcmToken = await getToken(messaging, { vapidKey: "BDejpOAWOM3yEwFQ9LbqQTpbG8SvOnaMGmNq6nwYISbSD7lhh99aKePX9HVRKg-aREsls8nNRpeHMyETF3cryyQ" });
        // Cookies.set('adminFcmToken', fcmToken);
        const response = await axios.post(`${URL}/admin/otp`, { ...data, fcmToken: "" });
        if (response.status === 200) {
            Cookies.set('adminToken', response?.data?.token)
            return { status: true, message: "Email Verified" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getAdminDashboardDataApi = async () => {
    try {
        const token = Cookies.get('masterToken') || Cookies.get('adminToken');
        const response = await axios.get(`${URL}/admin/dashboard-data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getGamesApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/game`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const createGameApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/game`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Game Created Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 409) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getAllUsersApi = async () => {
    try {
        const token = Cookies.get('masterToken') || Cookies.get('adminToken');
        const response = await axios.get(`${URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response?.status === 200) {
            return { status: true, message: "User Created Successfully", data: response?.data?.data };
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getAllLedgerApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/ledger/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getDepositApi = async () => {
    try {
        const token = Cookies.get('masterToken') || Cookies.get('adminToken');
        const response = await axios.get(`${URL}/deposit/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const updateDepositApi = async (id: string, value: string) => {
    try {
        const response = await axios.patch(`${URL}/deposit/status/${id}`, { value });
        if (response.status === 200) {
            return { status: true, message: "Status Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getWithdrawApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/withdraw/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const updateWithdrawApi = async (id: string, value: string) => {
    try {
        const response = await axios.patch(`${URL}/withdraw/status/${id}`, { value });
        if (response.status === 200) {
            return { status: true, message: "Status Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getBetsApi = async (label: string) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/bet/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data?.filter((item: any) => item?.status === label) };
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const createBankApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/bank`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Bank Added " }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getAllBanksApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/bank/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getAllColorsApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/website/color`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const changeWebsiteLogo = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/website/logo`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Website Logo Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const changeWebsiteName = async (name: string) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/website/name`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Website Name Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const createBettingTimeApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/website/betting-time`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Delay Time Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const createColorApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/website/color`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Color Added Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const createWebsiteBanner = async (image: any) => {
    try {
        const data = new FormData();
        data.append('image', image);
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/website/banner`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Website Banner Added" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const createWebsiteColor = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/website/website-color`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Website Color Added" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const deleteAdminWebsiteBanners = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/website/banner/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Website Banner Deleted Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const deleteColorByIdApi = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/website/color/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Color Deleted" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getAllWebsiteColors = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/website/website-color`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getWebsiteLogoApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/website/logo`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getWebsiteNameApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/website/name`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const updateColorStatusById = async (id: string, status: boolean) => {
    try {
        const response = await axios.patch(`${URL}/website/color/status/${id}`, { status });
        if (response.status === 200) {
            return { status: true, message: "Color Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

// ==========================================

export const checkAdminApi = async () => {
    try {
        let token = "" as any;
        if (localStorage.getItem('loginType') === "master") {
            token = Cookies.get('masterToken');
        } else {
            token = Cookies.get('adminToken');
        }
        const response = await axios.get(`${URL}/admin/check`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const deleteUserByIdApi = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/user/${id}`);
        if (response?.status === 200) {
            return { status: true, message: "User Deleted" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const userStatusUpdateApi = async (value: boolean, id: string) => {
    try {
        const response = await axios.post(`${URL}/user/status/${id}`, { value });
        if (response.status === 200) {
            return { status: true, message: "User Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const deleteGameByIdApi = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/game/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Game Deleted Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateGameStatusByIdApi = async (value: boolean, id: string) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/game/status/${id}`, { value }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Game Updated Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateWebsiteColor = async (id: string) => {
    try {
        const response = await axios.patch(`${URL}/website/website-color/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Color Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const deleteWebsiteColor = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/website/website-color/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Color Deleted" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateBankApi = async (id: string, data: any) => {
    try {
        const response = await axios.patch(`${URL}/bank/${id}`, data);
        if (response.status === 200) {
            return { status: true, message: "Bank Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const deleteBankByIdApi = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/bank/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Bank Deleted" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateBankDetailsApi = async (id: string, data: any) => {
    try {
        const response = await axios.patch(`${URL}/bank/${id}`, data);
        if (response.status === 200) {
            return { status: true, message: "Bank Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getAdminWebsiteBanners = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/website/banner/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getBettingTimeApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/website/betting-time`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getOpenBetsByAdminApi = async (savedToken: any) => {
    try {
        const token = savedToken || Cookies.get('adminToken');
        const response = await axios.get(`${URL}/bet/admin/open`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getClosedBetsByAdminApi = async (savedToken: any) => {
    try {
        const token = savedToken || Cookies.get('adminToken');
        const response = await axios.get(`${URL}/bet/admin/close`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getAdminDetailsApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/admin/login-details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getEventsRunFancyDataApi = async () => {
    try {
        const response = await axios.get(`${URL}/redis/get-events-by-fancy`);
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getFancyDataByEventIdApi = async (eventId: string) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/redis/get-fancy-eventId?eventId=${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateFancyResultApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/redis/update-fancy-result`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateFancyRollBackApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/redis/update-fancy-rollback`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getActiveSportsByAdmin = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/game/available`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getEventsRunBookmakerDataApi = async (sportName: string) => {
    try {
        const response = await axios.get(`${URL}/redis/get-events-by-bookmaker/${sportName}`);
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getBookmakerDataByEventIdApi = async (eventId: string) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/redis/get-bookmaker-eventId?eventId=${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateBookmakerResultApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/redis/update-bookmaker-result`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const updateBookmakerRollBackApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/redis/update-bookmaker-rollback`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const createStaffApi = async (data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.post(`${URL}/staff`, { ...data, type: "master" }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const updateStaffApi = async (id: any, data: any) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.put(`${URL}/staff/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data, message: response?.data?.message }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getStaffsApi = async () => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.get(`${URL}/staff`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const deleteStaffApi = async (id: string) => {
    try {
        const token = Cookies.get('adminToken');
        const response = await axios.delete(`${URL}/staff/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const fn_getUserInfoApi = async (id: string) => {
    try {
        const token = Cookies.get('masterToken') || Cookies.get('adminToken');
        const response = await axios.get(`${URL}/user/get-info/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const userUpdateApi = async (data: any, id: string) => {
    try {
        const token = Cookies.get('masterToken') || Cookies.get('adminToken');
        const response = await axios.put(`${URL}/user/update?userId=${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, message: "User Updated" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export default URL;