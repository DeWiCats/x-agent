import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
}

interface PageWithHeaderProps {
  title: string;
  tabTriggers?: Tab[];
  defaultTab?: string;
  children: React.ReactNode;
}

export function PageWithHeader({
  title,
  tabTriggers,
  defaultTab,
  children,
}: PageWithHeaderProps) {
  const content = (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
    </div>
  );

  if (!tabTriggers) {
    return (
      <>
        {content}
        {children}
      </>
    );
  }

  return (
    <>
      <div>
        {content}
        <Tabs
          defaultValue={defaultTab ?? tabTriggers[0].value}
          className="mb-8"
        >
          <TabsList className="w-full justify-start gap-6 h-auto p-0 rounded-none border-b border-sline-base-border-alpha">
            <div className="container flex mx-auto px-4 w-full justify-start gap-6 h-auto p-0">
              {tabTriggers.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="bg-transparent relative pb-4 text-sline-text-dark-secondary data-[state=active]:text-sline-text-dark-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none capitalize data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-sline-state-brand-active"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
          {children}
        </Tabs>
      </div>
    </>
  );
}

export function PageWithHeaderContent({
  children,
  tabValue,
  fluid = false,
}: {
  children: React.ReactNode;
  tabValue: string;
  fluid?: boolean;
}) {
  return (
    <TabsContent value={tabValue}>
      <div className={cn(fluid ? "container mx-auto px-0" : "px-4")}>
        {children}
      </div>
    </TabsContent>
  );
}
