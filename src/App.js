import { Suspense, useEffect, lazy } from "react";
import "./App.css";

import Navbar from "./Layouts/NavBar/Navbar";
import AdminPage from "./Components/Pages/AdminPage/AdminPage";
import Footer from "./Layouts/Footer/Footer";
import DarkTheme from "./Themes/DarkTheme";
import Web3ContextProvider from "./Context/Web3Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Skeleton from "@mui/material/Skeleton";

import { ThemeProvider } from "@mui/material/styles";
const MintingPage = lazy(() =>
  import("./Components/Pages/MintingPage/MintingPage")
);
const Homepage = lazy(() => import("./Components/Pages/Homepage/Homepage"));
const ShopPage = lazy(() => import("./Components/Pages/ShopPage/ShopPage"));
const StakingPage = lazy(() =>
  import("./Components/Pages/StakingPage/StakingPage")
);
const MyNfts = lazy(() => import("./Components/Pages/MyNfts/MyNfts"));

// Marketplace Routes
const MarketHome = lazy(() =>
  import("./Components/Pages/marketplace/MarketHome/MarketHome")
);
const Explore = lazy(() =>
  import("./Components/Pages/marketplace/Explore/Explore")
);
const NftDetails = lazy(() =>
  import("./Components/Pages/marketplace/NFT/NftDetails")
);
const PurchasedItems = lazy(() =>
  import("./Components/Pages/marketplace/PurchasedItems/PurchasedItems")
);
const Addons = lazy(() =>
  import("./Components/Pages/marketplace/Addons/Addons")
);

const loadingSkeleton = (
  <Skeleton variant="rectangular" width={1280} height={700} />
);

export default function App() {
  useEffect(() => {
    const ele = document.getElementById("ipl-progress-indicator");
    if (ele) {
      // fade out
      ele.classList.add("available");
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = "";
      }, 1000);
    }
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <BrowserRouter>
        <Web3ContextProvider>
          <CssBaseline />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Navbar />
          <Suspense fallback={loadingSkeleton}>
            <Routes>
              <Route path="" element={<Homepage />} />
              <Route path="homepage" element={<Homepage />} />
              <Route path="homepage/:section" element={<Homepage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="marketplace" element={<MintingPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="mynfts" element={<MyNfts />} />

              {/* Routes for Marketplace */}
              <Route path="market" element={<MarketHome />} />
              <Route path="explore" element={<Explore />} />
              <Route path=":contract/:id" element={<NftDetails />} />
              <Route path="purchased" element={<PurchasedItems />} />
              <Route path="addons" element={<Addons />} />
            </Routes>
          </Suspense>
          <Footer />
        </Web3ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
