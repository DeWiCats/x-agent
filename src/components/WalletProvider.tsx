/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import dynamic from "next/dynamic";

const ConnectButtonProvider = dynamic(
  async () => (await import("@dewicats/connect-button")).ConnectButtonProvider,
  { ssr: false }
);
const rpcHost = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? "";

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConnectButtonProvider solanaRpcHost={rpcHost}>
      {children as any}
    </ConnectButtonProvider>
  );
};

export default WalletProvider;
