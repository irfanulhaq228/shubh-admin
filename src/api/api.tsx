import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://62.72.57.126:8000";

export const formatDate = (dateString: any) => {
    const optionsDate: any = { day: '2-digit', month: 'short', year: 'numeric' };
    const optionsTime: any = { hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
};

export const adminLoginApi = async (data: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${URL}/admin/login`, data);
        if (response.status === 200) {
            return { status: true, message: "OTP sent to your Email", id: response.data.id }
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
        const response = await axios.post(`${URL}/admin/otp`, data);
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
        const token = Cookies.get('adminToken');
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
        const token = Cookies.get('adminToken');
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
        const token = Cookies.get('adminToken');
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
        const token = Cookies.get('adminToken');
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
}

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

export default URL;