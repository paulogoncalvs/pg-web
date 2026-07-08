import type { FunctionalComponent } from "preact";

import { ErrorPageLayout } from "@/components/ErrorPageLayout";
import { Markup } from "@/components/Markup";
import { useTranslate } from "@/modules/i18n";

const OfflinePage: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <ErrorPageLayout
      title={t("offline_page_title")}
      subtitle={t("offline_page_subtitle")}
      buttonLabel={t("offline_page_button_label")}
    >
      <Markup html={t("offline_page_description")} as="p" />
    </ErrorPageLayout>
  );
};

export default OfflinePage;
