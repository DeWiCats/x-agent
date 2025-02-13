import {
  PageWithHeader,
  PageWithHeaderContent,
} from "@/components/page-with-header";
import Settings from "@/components/settings";

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
  ];
  return (
    <PageWithHeader title="Settings" tabTriggers={tabTriggers}>
      <PageWithHeaderContent tabValue="account">
        <Settings />
      </PageWithHeaderContent>
    </PageWithHeader>
  );
}
