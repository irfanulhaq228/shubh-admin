import "./App.css";
import "aos/dist/aos.css";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import useColorScheme from "./hooks/useColorScheme";

import Login from "./pages/Auth/Login";

import Profile from "./pages/profile/page";
import Wallet from "./pages/wallet/page";
import DepositWithdraw from "./pages/DepositWithdraw/page";
import AccountStatement from "./pages/accountStatement/page";
import BonusStatement from "./pages/bonusStatement/page";
import PaymentInfo from "./pages/paymentInfo/page";
import LoginHistory from "./pages/loginHistory/page";
import GamesConfiguration from "./pages/GamesConfiguration/page";
import Users from "./pages/Users/page";
import UserById from "./pages/UserById/page";
import WebSettings from "./pages/WebSetting/page";
import FancyData from "./pages/FancyData/page";

import Bets from "./pages/Bets/page";
import CurrentBets from "./pages/Bets/CurrentBets/page";
import BetHistory from "./pages/Bets/BetHistory/page";
import ProfitLoss from "./pages/Bets/ProfitLoss/page";
import FDProfitLoss from "./pages/Bets/FDProftLoss/page";

function App() {
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const darkTheme = useSelector((state: any) => state.dashboardDarkTheme);
  const colors = useColorScheme(darkTheme, colorScheme);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Profile darkTheme={darkTheme} />} />
      <Route path="/games" element={<GamesConfiguration darkTheme={darkTheme} />} />
      <Route path="/users" element={<Users darkTheme={darkTheme} />} />
      <Route path="/users/:id" element={<UserById darkTheme={darkTheme} />} />
      <Route path="/wallet" element={<Wallet darkTheme={darkTheme} />} />
      <Route path="/deposit-withdraw" element={<DepositWithdraw darkTheme={darkTheme} />} />
      <Route path="/account-statement" element={<AccountStatement darkTheme={darkTheme} />} />
      <Route path="/bonus-statement" element={<BonusStatement darkTheme={darkTheme} />} />
      <Route path="/payment-info" element={<PaymentInfo darkTheme={darkTheme} />} />
      <Route path="/web-settings" element={<WebSettings darkTheme={darkTheme} />} />
      <Route path="/login-history" element={<LoginHistory darkTheme={darkTheme} />} />
      <Route path="/fancy-data" element={<FancyData darkTheme={darkTheme} />} />

      <Route path="/bets" element={<Bets darkTheme={darkTheme} />}>
        <Route path="current-bets" index element={<CurrentBets colors={colors} />} />
        <Route path="bet-history" element={<BetHistory colors={colors} />} />
        <Route path="profit-loss" element={<ProfitLoss colors={colors} />} />
        <Route path="fd-profitloss" element={<FDProfitLoss colors={colors} />} />
      </Route>
    </Routes>
  );
}

export default App;
