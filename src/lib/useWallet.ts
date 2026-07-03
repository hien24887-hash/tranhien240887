import { useEffect, useState } from "react";
import { getWallet, subscribeRewards, type WalletInfo } from "./progress";

export function useWallet(): WalletInfo {
  const [wallet, setWallet] = useState<WalletInfo>(() => getWallet());

  useEffect(() => {
    const unsubscribe = subscribeRewards(() => setWallet(getWallet()));
    return unsubscribe;
  }, []);

  return wallet;
}
