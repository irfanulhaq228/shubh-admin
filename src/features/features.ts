import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  mobileSidebar: false,
  mobileMenu: false,
  navPage: "home",
  authentication: false,
  dashboardDarkTheme: false,
  colorScheme: "color1",
  smallSidebar: false,
  wallet: 0,
  loginType: "",
  betPage: "current-bets",
  admin: {}
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    updateSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    updateMobileSidebar: (state, action) => {
      state.mobileSidebar = action.payload;
    },
    updateMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
    updatePageNav: (state, action) => {
      state.navPage = action.payload;
    },
    authenticate: (state, action) => {
      state.authentication = action.payload;
    },
    updateDarkTheme: (state, action) => {
      state.dashboardDarkTheme = action.payload;
    },
    updateColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
    updateSmallsidebar: (state, action) => {
      state.smallSidebar = action.payload;
    },
    updateWallet: (state, action) => {
      state.wallet = action.payload;
    },
    updateLoginType: (state, action) => {
      state.loginType = action.payload;
    },
    updateBetsPage: (state, action) => {
      state.betPage = action.payload;
    },
    updateAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const {
  updateSidebar,
  updateMobileSidebar,
  updateMobileMenu,
  updatePageNav,
  authenticate,
  updateDarkTheme,
  updateColorScheme,
  updateSmallsidebar,
  updateWallet,
  updateLoginType,
  updateBetsPage,
  updateAdmin
} = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
