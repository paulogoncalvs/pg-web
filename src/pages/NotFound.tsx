import type { FunctionalComponent } from "preact";

import { ErrorPageLayout } from "@/components/ErrorPageLayout";
import { useTranslate } from "@/modules/i18n";

const NotFoundPage: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <ErrorPageLayout
      title={t("not_found_page_title")}
      subtitle={t("not_found_page_subtitle")}
      buttonLabel={t("not_found_page_button_label")}
    />
  );
};

export default NotFoundPage;
