import {
  PageWithHeader,
  PageWithHeaderContent,
} from "@/components/page-with-header";
import Settings, { WalletsSettings } from "@/components/settings";

export default function SettingsPage() {
  const tabTriggers = [
    {
      label: "Account",
      value: "account",
    },
    {
      label: "Security",
      value: "security",
    },
    {
      label: "Wallets",
      value: "wallets",
    },
  ];
  return (
    <PageWithHeader title="Settings" tabTriggers={tabTriggers}>
      <PageWithHeaderContent tabValue="account">
        <Settings />
      </PageWithHeaderContent>
      <PageWithHeaderContent tabValue="wallets">
        <div className="max-w-sm">
          <WalletsSettings />
        </div>
      </PageWithHeaderContent>
    </PageWithHeader>
  );
}
